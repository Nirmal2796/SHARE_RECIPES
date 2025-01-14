const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const Ingredients=sequelize.define('ingredients ',{
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

module.exports=Ingredients;