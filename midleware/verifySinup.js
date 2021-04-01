var db = require('../models');
const Users = db.users;


function isValidName(first_name){
    var re =  /^[a-zA-Z ]{3,30}$/;
    return re.test(String(first_name));
}
function isValidName(last_name){
    var re =  /^[a-zA-Z ]{3,30}$/;
    return re.test(String(last_name));
}
function isValidPhone(phone_number){
    var re =  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return re.test(String(phone_number));
}
function isValidEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
function isValidPassword(password) {
    var reg = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return reg.test(String(password));
  }

  


checkDuplicateUserNameOrEmail = (req, res, next) => {
		
    if (!req.body.first_name) {
        res.status(400).send({
             message: "First Name can not be empty!"
         });
            return;
        }
    if (!isValidName(req.body.first_name)) {
            return res.json({status: 'error', message: 'First name must be minimum 3 char'});
          }
    if (!req.body.last_name) {
         res.status(400).send({
            message: "Last Name can not be empty!"
             });
                return;
            }
    if (!isValidName(req.body.last_name)) {
                return res.json({status: 'error', message: 'last name must be minimum 3 char'});
              }
   if (!req.body.email) {
                res.status(400).send({
                   message: "Email can not be empty!"
                    });
                       return;
                   }
    if (!isValidEmail(req.body.email)) {
                return res.json({status: 'error', message: 'Email address not formed correctly.'});
        }
    if (!isValidPhone(req.body.phone_number)) {
              return res.json({status: 'error', message: 'Enter valid phone number.'});
    }
    if (!isValidPassword(req.body.password)) {
        return res.json({status: 'error', message: 'Password must one lower one upper and one special char.'});
      }
      
      if (req.body.confirm_password != req.body.password) {
        res.status(400).json({
          success: false,
          message: "Password & Confirm Password is not Matched",
        });
      } 
    // -> Check Email is already in use

		Users.findOne({ 
			where: {
				email: req.body.email
			} 
		}).then(user => {
			if(user){
				res.status(400).json({
                    success:false,
                    message:'Email already used'
                })
				return;
			}
				
			next();
		});
}
const signUpVerify = {};
signUpVerify.checkDuplicateUserNameOrEmail = checkDuplicateUserNameOrEmail;

module.exports = signUpVerify;