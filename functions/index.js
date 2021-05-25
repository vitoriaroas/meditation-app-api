const functions = require("firebase-functions");
const express = require("express")
const app = express()
const cors = require("cors")
const { getUsers, getUserId, newUser, deleteUser, updateUser } = require('./src/meditation')

app.use(cors())

app.post('/users', newUser)
app.get('/users', getUsers)
app.get('/users/:usersId', getUserId)
// app.delete('/users/:userId', deleteUser)
// app.patch('/users/:userId', updateUser)

exports.app = functions.https.onRequest(app)
