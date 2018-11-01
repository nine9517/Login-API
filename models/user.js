const mongoose =  require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

const userSchema = new Schema({
	email : {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},
	password : String,
	picture : {
		type: String,
	},
	history_login:[Date]
}, { 
	timestamps: { 
		createdAt: 'create_at' ,
		updatedAt: 'update_at'
	}
});

userSchema.methods.isValidPassword = async function(newPassword) {
	try{
		return await bcrypt.compare(newPassword,this.password);
	} catch(error) {
		throw new Error(error);
	}
}

const User = mongoose.model('user',userSchema);

module.exports = User;