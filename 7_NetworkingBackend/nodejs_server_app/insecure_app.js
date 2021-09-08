const express = require('express')
const { Client } = require('pg')

let client

// makes a database connection and
// calls a function to create tables
// in the database after connecting
const connectToDB = async () => {
  client = new Client({
    user: "postgres",
    database: "postgres",
    password: "pass123",
    host: "localhost",
  })

  await client.connect()
  migrate()
}

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// create user
app.post('/users', async (req, res) => {
  if (!("username" in req.body) || !("password" in req.body)) {
    // http status BadRequest
    return res.status(409)
  } else {
    addUser(req.body.username, req.body.password).then((result) => {
      if (result !== null) {
        console.log("Created new user", req.body.username)
        // http status Created
        res.status(201)
        return res.json(result)
      } else {POST
        // http status InternalServerError ( Error on server-side )
        res.status(500)
        return res.send()
      }
    })
  }
})

// get all users
app.get('/users', async(req, res) => {
  // get all users from table
  const users = await client.query("SELECT * FROM insecure_users")
  res.json(users.rows)

})

// get specific user from url parameter
app.get('/users/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId)

  const result = await client.query({
    text: "SELECT * FROM insecure_users WHERE user_id = $1",
    values: [userId]
  })

  if (result.rows.length === 0) {
    // http status NotFound
    res.status(404)
    return res.send()
  }

  return res.json(result.rows[0])
})

// delete specific user
// requires password as field in json request body
app.delete('/users/:userId', async(req, res) => {
  let userId = parseInt(req.params.userId)

  // if no password presented or empty password
  if (!("password" in req.body) || req.body.password == "") {
    return res.send(401)
  }

  // get user object relating to user_id from 
  // request parameters, so that we can check password
  // before deleting
  const userGet = await client.query({
    text: "SELECT * FROM insecure_users WHERE user_id = $1",
    values: [userId]
  })

  if (userGet.rows.length === 1) {
    let user = userGet.rows[0]
    if (req.body.password === user.password) {
      console.log("Password is correct")
      let result = await client.query({
        text: "DELETE FROM insecure_users WHERE user_id = $1",
        values: [user.user_id]
      })
        if (result.rowCount > 0) {
          console.log("Successfully deleted user")
          res.status(200)
          return res.send()
        }
    }
    // if password is invalid
    console.log("Incorrect password")
    res.status(401)
    return res.send()
  }
  // if changed rows is greater than or less than 1,
  // user should not be able to delete users that are not
  // their own user, and they also cannot delete users that
  // dont exist
  res.status(401)
  res.send()
})
const addUser = async (username, password) => {
  let res
  const userInsert = {
    text: `INSERT INTO insecure_users (username, password)
    VALUES($1, $2) RETURNING *
    `,
    values: [username, password]
  }
  res = await client.query(userInsert)
  if (res.rows && res.rows.length > 0) {
    if (!("user_id" in res.rows[0]) || !("username" in res.rows[0])) {
      return null
    }
    return res.rows[0]
  } else return null
}
const migrate = () => {
  // user contains an id and username and plaintext password
  client.query(
    `CREATE TABLE IF NOT EXISTS insecure_users (
      user_id   SERIAL PRIMARY KEY,
      username  TEXT,
      password  TEXT
    );`
  )
}

connectToDB()

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
