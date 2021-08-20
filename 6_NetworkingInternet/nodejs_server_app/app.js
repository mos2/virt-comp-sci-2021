const express = require('express')
const app = express()
const port = 3000

app.use(express.urlencoded({extended: true}));
app.use(express.json())

const users = []

app.put('/users', function (req, res) {
  res.send('Got a PUT request at /user')
  users.push(req.body)
})


app.get('/users', function (req, res) {
  res.json(users)
})

app.get('/users/:userId', function (req, res) {
  let userId = parseInt(req.params.userId)
  for (let index = 0; index < users.length; index++) {
    if (users[index].id === userId) {
      res.json(users[index])
    }
  }
  return res.status(404).send('User not found')

})

app.delete('/users/:userId', function (req, res) {
  let userId = parseInt(req.params.userId)
  for (let index = 0; index <= users.length; index++) {
    if (users[index].id === userId) {
      users.splice(index, 1)
      return res.status(200).send('User deleted')
    }
    index++
  }
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})