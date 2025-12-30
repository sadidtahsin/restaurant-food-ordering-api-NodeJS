const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, length: [50, "Name cannot exceed 50 characters"] },
    email: { type: String, required: true, unique: true, match: [/.+\@.+\..+/, "Please fill a valid email address"] },
    password: { type: String, required: true, minlength: [6, "Password must be at least 6 characters long"] },
}, { 
    timestamps: true 
});


userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateAuthToken = function() {
    const token = jsonwebtoken.sign({ _id: this._id, email: this.email }, 'app-secraet-key', { expiresIn: '1h' });
    return token;
};

module.exports = mongoose.model('User', userSchema);