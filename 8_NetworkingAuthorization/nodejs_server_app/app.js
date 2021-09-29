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

app.post('/token', async (req, res) => {
  if (!("username" in req.body) && req.body != "" || !("password" in req.body) && req.body.password != "") {
    // http status BadRequest
    return res.status(401)
  } else {
    // username and password are present and not empty
    const userNameGet = await client.query({
      text: "SELECT * FROM users WHERE username = $1",
      values: [req.body.username]
    })  
    if (userNameGet.rows.length === 0) {
      // http status unauthorized
      console.log("did not get any result with username", req.body.username)
      res.status(401)
      return res.send()
    }

    let userObject = userNameGet.rows[0]

    if (userObject.user_id === undefined || userObject.user_id === null) {
      // id is not valid
      
      console.log(userObject)
      console.log("id not valid")
      res.status(401)
      return res.send()
    }

    // compare username && password
    const userAuthGet = await client.query({
      text: "SELECT * FROM user_auths WHERE user_id = $1",
      values: [userObject.user_id]
    })

    if (userAuthGet.rows.length === 1) {
      if (await comparePassword(req.body.password, userAuthGet.rows[0].password)) {
        // passwords match
        // create random 16-char token
        const randomString = makeid(16)

        const tokenInsert = await client.query({
          text: `INSERT INTO tokens (user_id, token)
          VALUES($1, $2) RETURNING *
          `,
          values: [userObject.user_id, randomString]
        })

        console.log(userObject)

        if (tokenInsert.rows.length == 1) {
          console.log("saved token to databse")

          res.json(tokenInsert.rows[0])
          return res.status(201)
        }
      }
    }
  }
})

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

  const bearerToken = req.headers.authorization
  if (bearerToken === undefined || bearerToken === null || bearerToken == "") {
    // no authorization token
    console.log("no bearer token")
    res.status(401)
    return res.send()
  }

  const tokenParts = bearerToken.split(" ")

  if (tokenParts.length > 1 && tokenParts[0] !== "Bearer") {
    console.log("invalid token")
    res.status(401)
    return res.send()
  }

  // bearer token is valid
  tokenString = tokenParts[1]

  const checkToken = await client.query({
    text: "SELECT * FROM tokens WHERE token = $1",
    values: [tokenString]
  })

  console.log(checkToken.rows[0])

  // check if token is in db, then check if userId is equal to id in db with token
  // otherwise, unauthenticated code
  if (checkToken.rows.length === 0) {
    console.log("token not in use")
    res.status(401)
    return res.send()
  }
  
  if (checkToken.rows[0].user_id !== userId) {
    // if key is in database, but was not granted to this user
    console.log("token not for user")
    console.log({"userID": userId, "dbID": checkToken.rows[0].user_id})
    res.status(401)
    return res.send()
  }

  // token is in database, and userId matches the token

  // if (await comparePassword(req.body.password, userAuth.password)) {
    // console.log("Password is correct")
    let result = await client.query({
      text: "DELETE FROM users WHERE user_id = $1",
      values: [userId]
    })
    if (result.rowCount > 0) {
      result = await client.query({
        text: "DELETE FROM user_auths WHERE user_id = $1",
        values: [userId]
      })
      if (result.rowCount > 0) {
        console.log("Successfully deleted user")
        res.status(200)
        return res.send()
      }   
    }
  // }

  // // get user_auth object relating to user_id from 
  // // request parameters, so that we can check password
  // // before deleting
  // const userAuthGet = await client.query({
  //   text: "SELECT * FROM user_auths WHERE user_id = $1",
  //   values: [userId]
  // })

  // if (userAuthGet.rows.length === 1) {
  //   let userAuth = userAuthGet.rows[0]
  //   if (await comparePassword(req.body.password, userAuth.password)) {
  //     console.log("Password is correct")
  //     let result = await client.query({
  //       text: "DELETE FROM users WHERE user_id = $1",
  //       values: [userAuth.user_id]
  //     })
  //     if (result.rowCount > 0) {
  //       result = await client.query({
  //         text: "DELETE FROM user_auths WHERE user_id = $1",
  //         values: [userAuth.user_id]
  //       })
  //       if (result.rowCount > 0) {
  //         console.log("Successfully deleted user")
  //         res.status(200)
  //         return res.send()
  //       }   
  //     }
  //   }
  
  // if changed rows is greater than or less than 1,
  // user should not be able to delete users that are not
  // their own user, and they also cannot delete users that
  // dont exist
  
  res.status(401)
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

const makeid = (length) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
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
  client.query(
    `CREATE TABLE IF NOT EXISTS tokens (
      user_id INT,
      token   TEXT
    );`
  )
}

connectToDB()

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
