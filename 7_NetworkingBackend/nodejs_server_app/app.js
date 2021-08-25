const express = require('express')
const { Client } = require('pg')
const bcrypt = require('bcrypt')

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
    // after adding a user, and user_auth to the database...
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
  const users = await client.query("SELECT * FROM users")
  res.json(users.rows)

})

// get specific user from url parameter
app.get('/users/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId)

  const result = await client.query({
    text: "SELECT * FROM users WHERE user_id = $1",
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
    return res.send(403)
  }

  // get user_auth object relating to user_id from 
  // request parameters, so that we can check password
  // before deleting
  const userAuthGet = await client.query({
    text: "SELECT * FROM user_auths WHERE user_id = $1",
    values: [userId]
  })

  if (userAuthGet.rows.length === 1) {
    let userAuth = userAuthGet.rows[0]
    if (await comparePassword(req.body.password, userAuth.password)) {
      console.log("Password is correct")
      let result = await client.query({
        text: "DELETE FROM users WHERE user_id = $1",
        values: [userAuth.user_id]
      })
      if (result.rowCount > 0) {
        result = await client.query({
          text: "DELETE FROM user_auths WHERE user_id = $1",
          values: [userAuth.user_id]
        })
        if (result.rowCount > 0) {
          console.log("Successfully deleted user")
          res.status(200)
          return res.send()
        }   
      }
    }
    // if password is invalid
    console.log("Incorrect password")
    res.status(403)
    return res.send()
  }
  // if changed rows is greater than or less than 1,
  // user should not be able to delete users that are not
  // their own user, and they also cannot delete users that
  // dont exist
  res.status(403)
  res.send()
})

const hashPassword = async (password) => {
  // a salt is a set  or random characters to add to the password
  // when hashing. this protects against having duplicate or common
  // passwords being compromised, as it completely changes what the
  // hash looks like.
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

// this function gets the salt and cypher from the stored
// hash in the database. Good explanation here: 
// https://stackoverflow.com/a/6833165
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
}

// creates user and user_auth --> user_auth stores
// password and user_id only
const addUser = async (username, password) => {
  let res
  const userInsert = {
    text: `INSERT INTO users (username)
    VALUES($1) RETURNING *
    `,
    values: [username]
  }
  res = await client.query(userInsert)
  if (res.rows && res.rows.length > 0) {
    if (!("user_id" in res.rows[0]) || !("username" in res.rows[0])) {
      return null
    }
  } else return null

  // create user_auth now, as user has been saved to database
  const hash = await hashPassword(password)
  const userAuthInsert = {
    text: `INSERT INTO user_auths (user_id, password)
      VALUES($1, $2) RETURNING *
    `,
    values: [res.rows[0].user_id, hash]
  }
  const userAuth = await client.query(userAuthInsert)

  if ("rows" in userAuth) {
    if (userAuth.rows.length > 0) {
      const userAuthObj = userAuth.rows[0]
      if ("user_id" in userAuthObj && "password" in userAuthObj) {
        if (userAuthObj.user_id > 0 && userAuthObj.password != "") {
          return res.rows[0]
        }
      }
    }
    return null
  }
}
const migrate = () => {
  // user contains an id and username
  // user_auth contains the same id and a hashed password
  client.query(
    `CREATE TABLE IF NOT EXISTS users (
      user_id   SERIAL PRIMARY KEY,
      username  TEXT
    );`
  )
  client.query(
    `CREATE TABLE IF NOT EXISTS user_auths (
      user_id INT,
      password TEXT
    );`
  )
}

connectToDB()

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
