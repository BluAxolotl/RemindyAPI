const mongoose = require('mongoose')
const uri = "mongodb+srv://BluAxolotl:Pacster3@cluster0.jp25a.mongodb.net/Remindy?retryWrites=true&w=majority"
const express = require('express')
const bcrypt = require('bcrypt');
const app = express()
const print = console.log
const AM = 0
const PM = 1
const pass = function(a){
    let dummy = false
    if (a != null)
        a.send()
}
const port = 300

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Schema & Models

const ReminderSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    label: String,
    displayTime: Object, // {hour: Number (hour), minute: Number (minute)}
    utcTime: Object, // {hour: Number (hour), minute: Number (minute)}
    owner: Number, // userid
    notifier: Array // [Object (notifier)]
})
const Reminder = mongoose.model('Reminder', ReminderSchema)

const UserSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
		name: String,
		pass: String,
		reminders: Array, // [Object (reminder)]
})
const User = mongoose.model('User', UserSchema)

// Post Request Handling

// Default Gateway
app.get('/', function (req, res) {
	res.send("What are you doing here, this is the API for Remindy >:(")
})

// Signup
app.post('/signup', function (req, res) {
	let data = req.body
	let pass = data.password
	User.findOne({ name: data.username }, function (err, doc) {
			if (doc == null) {
				bcrypt.hash(pass, 10, function(err, hash) {
						let new_account = new User({
							_id: new mongoose.Types.ObjectId(),
							name: data.username,
							pass: hash,
							reminder: []
						})
						new_account.save().then(saved_account => {
							res.send('Account made successfully!')
						})
				})
			} else {
				res.send("Bad Username")
			}
	})
})

// Login
app.post('/login', function (req, res) {
	let data = req.body
	let pass = data.password 
	User.findOne({ name: data.username }, function (err, doc) {
		if (doc != null) {
			var hash = doc.pass
			bcrypt.compare(pass, hash, function(err, result) {
				if (result == true) {
					res.send("Authentication Successful!")
				} else {
					res.send("Authentication Failed")
				}
			})
		} else {
			res.send("Bad Username")
		}
	});
});

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
app.listen(3000)
print(`API Operational on port ${port}`)