const moongoose = require('mongoose')

const UserSessionSchema = moongoose.Schema({
    userid: { type: String, index: true, required: true },
    jwtToken: { type: String, required: true, unique: true },
    resetjwtToken: { type: String },
    expiresIn: { type: Date },
    status: { type: String },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});



module.exports = moongoose.model('UserSession', UserSessionSchema);