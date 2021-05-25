const admin = require('firebase-admin')
const { connectFirestore } = require('./firestore')

exports.getUserId = (req, res) => {
  const db = connectFirestore()
  const { usersId } = req.params
  db.collection('users')
    .doc(usersId)
    .get()
    .then((doc) => {
      let user = doc.data()
      user.id = doc.id
    })
  res.send(user)
}

exports.getUsers = (req, res) => {
  const db = connectFirestore()
  db.collection('users')
    .get()
    .then((collection) => {
      let allUsers = []
      collection.forEach((doc) => {
        let user = doc.data()
        user.id = doc.id
        allUsers.push(user)
      })
      res.send(allUsers)
    })
    .catch((error) => res.send('Error', +error.message))
}

exports.newUser = (req, res) => {
  const db = connectFirestore()
  const newData = req.body
  db.collection('users')
    .add(newData)
    .then(() => this.getUsers(req, res))
    .catch((error) => res.send('Error', +error.message))
}

// exports.deleteUser = (req, res) => {
//   const db = connectFirestore()
//   const { userId } = req.params
//   db.collection('users')
//     .doc(userId)
//     .delete()
//     .then(() => this.getUsers(req, res))
//     .catch((error) => res.send('Error', +error.message))
// }

// exports.updateUser = (req, res) => {
//   const db = connectFirestore()
//   const { userId } = req.params
//   const newData = req.body
//   db.collection('users')
//     .doc(userId)
//     .update(newData)
//     .then(() => this.getUsers(req, res))
//     .catch((error) => res.send('Error', +error.message))
// }
