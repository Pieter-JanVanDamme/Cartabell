var mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
	username: { type: String, lowercase: true, 
		unique: true, required : true }, // unique username
	hash: String, // no passwords in cleartext
	salt: String // add salt to protect against rainbow attacks
});

UserSchema.methods.setPassword = function (password) {
	this.salt = crypto.randomBytes(32).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 
	  10000, 64, 'sha512').toString('hex'); // use a lib to generate salts & hashes
        // using pbkdf2 with sha512 and enough iterations (10000) should be enough
}
UserSchema.methods.validPassword = function (password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 
    10000, 64, 'sha512').toString('hex'); // check if password is valid, using same hashing
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function () {
    var today = new Date();
    var expiry = new Date(today);
    expiry.setDate(today.getDate() + 90); // 2a: (optional) add expiration date
  
    return jwt.sign({ // 1: securely sign id and username, roles often stored here too
        _id: this._id,
        username: this.username,
        expiry: parseInt(expiry.getTime() / 1000) // 2b: expiration date ct’d
    }, process.env.SCRIBBLE_BACKEND_SECRET); // 3: environmental variable
  };
  
  
  mongoose.model('User', UserSchema);