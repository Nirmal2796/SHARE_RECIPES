const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const Recipe=sequelize.define('recipe',{
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
    description:{
        type:Sequelize.STRING,
        allowNull:false
    },
    preptime:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    recipeDifficulty:{
        type:Sequelize.STRING,
        allowNull:false
    },
    // image:{
    //     type:Sequelize.STRING,
    //     allowNull:false
    // },
    steps:{
        type:Sequelize.STRING,
        allowNull:false
    },
    rating:{
        type:Sequelize.INTEGER,
    },
});

module.exports=Recipe;