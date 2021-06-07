const dotenv = require('dotenv').config();
const mongose = require('mongoose');

const User = require('../Models/User.Model')

const connectDb = async() => {
    const con = await mongose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

};


var new_user = new User({
    username: 'admin',
    phone: 11111111111111111111,
    email: "k.viveik@gmail.com",
    password: 'admin',
})

try {
    User.findOne({ username: new RegExp('^' + new_user.username + '$', "i") }, function(err, doc) {
        if (!doc) {
            new_user.save(function(err, result) {})
        }
    });
} catch (err) {
    console.log(err)
}

module.exports = connectDb;