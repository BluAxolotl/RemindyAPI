const mongoose = require('mongoose')
const express = require('express')
const app = express()
const print = console.log
const AM = 0
const PM = 1
const pass = function(a){
    let dummy = false
    if (a != null)
        a.send()
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const ReminderSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    label: String,
    displayTime: Object, // {hour: Number (hour), minute: Number (minute)}
    utcTime: Object, // {hour: Number (hour), minute: Number (minute)}
    owner: Number, // userid
    notifier: Array // [Object (notifier)]
})
const Reminder = mongoose.model('Reminder', ReminderSchema)

app.post('/new', function (req, res) {
    res.json(req.body)
    print(req.body)
})

app.get('/account-info', function (req, res) {
    let info = {
        name: "Shujo",
        reminders:[
            {
                label:"Go to work",
                time:{
                    hour:5,
                    minute:30,
                    period:AM
                }
            },

            {
                label:"AP Philosophical Social Sciences Noting",
                time:{
                    hour:3,
                    minute:30,
                    period:PM
                }
            },

            {
                label:"Play Valorant",
                time:{
                    hour:5,
                    minute:30,
                    period:PM
                }
            },

            {
                label:"Oh yeah, I make music I guess",
                time:{
                    hour:8,
                    minute:30,
                    period:PM
                }
            },

        ]
    }
    let myJSON = JSON.stringify(info)
    print(myJSON)
    res.json(info)
})

app.listen(3000)