const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const Ingredient_Type=sequelize.define('ingredient_type ',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },   
});




module.exports=Ingredient_Type;