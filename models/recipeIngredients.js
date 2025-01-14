const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const RecipeIngredients =sequelize.define('recipeIngredients  ',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    quantity:{
        type:Sequelize.STRING,
        allowNull:false
    },
    
});

module.exports=RecipeIngredients ;