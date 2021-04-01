const {Sequelize,DataTypes} = require('sequelize');
const sequelize = new Sequelize('myvitrines','root','',{
    host:'localhost',
    dialect:'mysql',
    pool:{max:5,min:0,idle:10000}
});


sequelize.authenticate()
.then(()=>{
    console.log("Database connected");
})
.catch(err =>{
    console.log("Error"+err);
})


const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.sequelize.sync({force:false})    // ({force:true}) for create again and again after run
.then(() =>{
    console.log("Yes re-sync");
})
db.users = require('./users')(sequelize,DataTypes);
db.posts = require('./posts')(sequelize,DataTypes);

db.users.hasMany(db.posts,{foreignKey:'user_id',as:'PostDetails'});
db.posts.belongsTo(db.users,{foreignKey:'user_id',as:'UserInfo'});

module.exports = db;