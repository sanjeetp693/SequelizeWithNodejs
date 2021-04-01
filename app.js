const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
require('./models');
var userctrl = require('./controllers/userController');
var postctrl = require('./controllers/postController');
var verifySignUp = require('./midleware/verifySinup');
app.get('/',(res,resp) => {
     resp.send('Home page');
});

/***********Routes for Users****************/ 
app.post('/signup',[verifySignUp.checkDuplicateUserNameOrEmail], userctrl.addUser);
app.post('/signin', userctrl.signin);
app.get('/view',userctrl.viewUser);
app.put('/update',userctrl.addData);
app.delete('/delete',userctrl.deleteUser);

/*********Routes for Posts*********/ 

app.post('/createpost',postctrl.createPost);
app.get('/viewAllPost',postctrl.viewAllPost);
app.get('/viewPostsByUserId',postctrl.oneToOne);
app.get('/usersDetailsByPost',postctrl.usersDetailsByPost);
app.delete('/deletePost',postctrl.deletePost);
app.put('/updatePost',postctrl.updatePost);



app.listen(port,()=>{
    console.log(`App is listing at port number : ${port}`);
})
app.use(express.static('uploads'));   
app.use('/images', express.static('uploads'));