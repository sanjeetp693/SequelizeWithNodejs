const { Sequelize } = require(".")

module.exports = (sequelize,DataTypes) => {
    const Posts = sequelize.define("postseq",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
           },
        user_id:{
           type: DataTypes.INTEGER,
           allowNull:false
            },
        caption:{
            type:DataTypes.STRING,
        },
        
        post_picture:{
            type:DataTypes.STRING,
            defaultValue:'NULL'
        },
    },{
        // timestamps:false   for removing createdAt and updatedAt
        //  createdAt:false    for removing only one
        // createdAt: 'created_at'  for rename
    })
    return Posts;
}