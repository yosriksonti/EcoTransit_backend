const mongoose = require('mongoose');

const resetPasswordSchema = new mongoose.Schema({
    email : String,
});

const ResetPassword = mongoose.model('ResetPassword', resetPasswordSchema);

module.exports = ResetPassword;