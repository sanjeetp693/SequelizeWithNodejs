var db = require('../models');
const multer = require('multer');

const Posts = db.posts;
const Users = db.users;

/*************Create post**************/ 

const storage = multer.diskStorage({
    destination:function(req, file, cb) {
        cb(null,"./uploads");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({storage : storage}).single("post_picture");
var createPost =   (req, res) => {
    upload(req, res, function(err){
        if(err)
        console.log(err.message);
        else
        {
    try{
    let data =  Posts.create({ 
        user_id:req.body.user_id,
        caption:req.body.caption,
        post_picture:req.file.filename

        }).then(() =>{
            res.status(200).send("upload successfully");
        }) 
    } catch(err){
      return res.json({status: 'error', message: err.message});
    }    
  }
});
}

/**********View All Posts**********/ 

var viewAllPost = async (req,res) =>{
    let data = await Posts.findAll({ });
    res.status(200).json(data)
}

/*************View Post By User Id*************/ 

var oneToOne = async (req,res) =>{
    let data = await Users.findAll({
        attributes:['first_name','last_name','profile_picture'],
        include:[{
            as:'PostDetails',
            model:Posts,
            attributes:['user_id','caption','post_picture']
        }],
        where:{id:req.body.id}
    });
    res.status(200).json(data)
}

/**********User Details bY each post**************/ 

var usersDetailsByPost = async (req,res) =>{
    let data = await Posts.findAll({
        attributes:['caption','post_picture'],
        include:[{
            model:Users,
            as:'UserInfo',
            attributes:['id','first_name','last_name']
        }],
        where:{}
    });
    res.status(200).json(data)
}

/*************Delete Post By Id**************/ 


var deletePost = (req, res) =>{
  var id = req.body.id;
  Posts.destroy({
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

/**********Update caption in post***********/ 

var updatePost = (req, res) => {
    var id = req.body.id;
    var caption = req.body.caption;
    
    Posts.update(
      {
        
        caption: caption
      },
      { where: { id: id } }
    ).then(() => {
      res
        .status(200)
        .send("caption updated successfully with a user_id = " + id);
    });
  };

module.exports ={
    createPost,
    oneToOne,
    viewAllPost,
    usersDetailsByPost,
    deletePost,
    updatePost
    
}
