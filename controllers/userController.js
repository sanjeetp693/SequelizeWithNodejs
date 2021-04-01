var db = require('../models');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const multer = require('multer');

const Users = db.users;

/***********Signup***********/ 

var addUser =  async (req, res) => {
   
    try{
    let data = await Users.create({ 
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        phone_number:req.body.phone_number,
        password: bcrypt.hashSync(req.body.password, 8) }) 
    } catch(err){
      return res.json({status: 'error', message: err.message});
    }    
    let response ={
        data:'succesfully login'
    }
    res.status(200).json(response)

  }

/**************Sign in***********/ 

 var signin = (req, res) => {
  console.log('Sign-in');
    Users.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
        if (!user) {
          return res.status(404).send({ message: "Email Not found." });
        }
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        ); 
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
        res.status(200).send({
          message:'Successfully login'
        });
    });
}

/*********View All Users*********/ 

var viewUser = (req, res) =>{
  Users.findAll({  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
}


/************Image Update************/ 

const storage = multer.diskStorage({
  destination:function(req, file, cb) {
      cb(null,"./uploads");
  },
  filename: function(req, file, cb) {
      cb(null, file.originalname);
  }
});
var upload = multer({storage : storage}).single("profile_picture");

var addData = (req, res) => {

  upload(req, res, function(err){
    if(err)
    console.log(err.message);
    else
    {
  const filePath = req.file.filename;
  var id = req.body.id;
  Users.update(
    { profile_picture: filePath },
    { where: { id: id } }
  ).then(() => {
    res.status(200).send("upload successfully a customer with id = " + id);
    });

    }
  });
}


/***********Delete by Id**************/ 

var deleteUser = (req, res) =>{
  var id = req.body.id;
  Users.destroy({
    where: {
       id: id //this will be your id that you want to delete
    }
 }).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
   if(rowDeleted === 1){
      res.status(200).json({
        message:'successfully deleted'
      });
    }
 }, function(err){
     console.log(err); 
 });

}


module.exports ={
    addUser,
    signin,
    viewUser,
    addData,
    deleteUser
}