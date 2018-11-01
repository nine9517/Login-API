const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = {
	register: async (req, res) => {
		const { password, email } = req.body;
		const foundUser = await User.findOne({ email });
		if(foundUser){
			return res.status(403).json({status:1, message:'E-Mail is already in use.' });
		}
		const salt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(password,salt);
		const newUser = new User({
			password:passwordHash, 
			email:email
		});
		await newUser.save(function (err) {
			if (err){
				res.status(403).json({status:1, message:err });
			}
			res.status(200).json({status:0, message:"Register successfully." });
		});
	},
	login: async (req, res) => {
		console.log(req.body);
		const { password, email } = req.body;
		const foundUser = await User.findOne({ email });
		console.log("await findOne");
		if(foundUser){
			console.log("if foundUser");
			if(foundUser.isValidPassword(password)){
				console.log("if isValidPassword");
				foundUser.history_login.push(new Date());
				foundUser.save(function (err){
					if (err){
						res.status(403).json({status:1, message:err });
					}
					res.status(200).json({status:0, message:"Login successfully.",id:foundUser._id });
				});
				
			}else{
				console.log("else isValidPassword");
				return res.status(403).json({status:1, message:"Password is incorrect!" });
			}
			
		}else{
			console.log("else foundUser");
			return res.status(403).json({status:1, message:"E-Mail isn't found!" });
		}
	},
	loginWithFacebook: async (req, res) => {
		const { picture, email } = req.body;
		const foundUser = await User.findOne({ email });
		if(!foundUser){
			const newUser = new User({
				email:email,
				picture:picture
			});
			await newUser.save(function (err, UserSave) {
				if (err){
					res.status(403).json({status:1, message:err });
				}
				UserSave.history_login.push(new Date());
				UserSave.save(function (err,user){
					if (err){
						res.status(403).json({status:1, message:err });
					}
					res.status(200).json({status:0, message:"Login successfully.",id:user._id });
				});
				
			});
		}else{
			foundUser.history_login.push(new Date());
			foundUser.picture = picture;
			foundUser.save(function (err){
				if (err){
					res.status(403).json({status:1, message:err });
				}
				res.status(200).json({status:0, message:"Login successfully.",id:foundUser._id });
			});
		}
	},
	getData: async (req, res) => {
		const id = req.params.id;
		const foundUser = await User.findById(id,{ email:1,picture:1,history_login:1,createdAt:1 });
		if(!foundUser){
			return res.status(403).json({status:1, message:"User isn't found!" });
		}else{
			return res.status(200).json({status:0, message:"Successfully.",data:foundUser });
		}
		
	}

}