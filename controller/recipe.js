const sequelize = require('../util/database');
const Recipe = require('../models/recipe');
const MainIngredients = require('../models/main_ingredients');
const ReceipeIngredients = require('../models/recipeIngredients');
const Ingredients = require('../models/ingredients');
const { Op, Transaction } = require('sequelize');
const Ingredient_Type = require('../models/ingredient_type');



exports.addRecipe = async (req, res, next) => {

    const t = await sequelize.transaction();

    try {
        const { recipeName, recipeDescription, recipePrepTime, dietary, recipeDifficulty, mainIngredients, secondaryIngredients, recipeSteps } = req.body;



        const recipe = await req.user.createRecipe({
            name: recipeName,
            description: recipeDescription,
            preptime: recipePrepTime,
            // dietary,
            recipeDifficulty: recipeDifficulty,
            steps: recipeSteps,
        }, { transaction: t });



        const mId= await Ingredient_Type.findOne({
            where:{
                name:'main'
            }
        });

        const sId= await Ingredient_Type.findOne({
            where:{
                name:'secondary'
            }
        });

        // console.log(mId.id);

        for (const mainIngredient of mainIngredients) {

            const [mIngredient,created] = await Ingredients.findOrCreate({
                where:{
                    name:mainIngredient.name.trim(),
                    ingredientTypeId:mId.id
                },
                defaults:{
                    name:mainIngredient.name.trim(),
                    ingredientTypeId:mId.id
                },
                transaction:t
            });

            // console.log(mIngredient,created);

            await ReceipeIngredients.create({
                recipeId:recipe.id,
                ingredientsId:mIngredient.id,
                quantity:mainIngredient.quantity
            },{transaction:t});
        
        };

        for (const secondaryIngredient of secondaryIngredients) {

            const [sIngredient,created]=await Ingredients.findOrCreate({
                where:{
                    name:secondaryIngredient.name.trim(),
                    ingredientTypeId:sId.id
                },
                defaults:{
                    name:secondaryIngredient.name.trim(),
                    ingredientTypeId:sId.id
                },
                transaction:t
            });

            await ReceipeIngredients.create({
                recipeId:recipe.id,
                ingredientsId:sIngredient.id,
                quantity:secondaryIngredient.quantity
            },{transaction:t});
        };
        


        await t.commit();

        res.status(201).json({
            message: 'Recipe added successfully',
            status: 'success',
            recipe: recipe
        });

    } catch (err) {
        await t.rollback();
        console.log(err)
        res.status(500).json({
            message: err.message
        });
    }
}

exports.getMyRecipes = async (req, res) => {
    try {

        const recipes = await req.user.getRecipes();

        // console.log(recipes);

        res.status(200).json({ recipes: recipes });

    }
    catch (err) {
        console.log(err);
    }
}

exports.deleteRecipe = async (req, res) => {
    try {

        const id = req.params.id;

        // console.log(id);

        const recipe = await Recipe.findByPk(id);
        recipe.destroy();

        res.status(200).json({ message: 'successfully deleted' });

    }
    catch (err) {
        console.log(err);
    }
}

exports.getRecipe = async (req, res) => {
    try {

        const id = req.params.id;

        const recipe = await Recipe.findByPk(id);

        const recipeIngredients = await ReceipeIngredients.findAll({
            where:
            {
                recipeId: id
            }
        }); //return array of ingredients with their id and quantity.


        let ingredients=[];

        for (const recipeIngredient of recipeIngredients){

            const ingredient=await Ingredients.findByPk(recipeIngredient.ingredientsId);
    
            
            ingredients.push({ingredient,quantity:recipeIngredient.quantity});
        }
        


        // console.log(ingredients);

        const recipeDetails = {
            recipe: recipe,
            ingredients: ingredients
        }
        // 
        res.status(200).json({ recipeDetails });

    }
    catch (err) {
        console.log(err);
    }
}

exports.editRecipe = async (req, res, next) => {

    const t = await sequelize.transaction();

    try {

        const id = req.params.id;

        // console.log(id);

        const oldRecipe = await Recipe.findByPk(id);
        oldRecipe.destroy();


        const { recipeName, recipeDescription, recipePrepTime, dietary, recipeDifficulty, mainIngredients, secondaryIngredients, recipeSteps } = req.body;

        const recipe = await req.user.createRecipe({
            name: recipeName,
            description: recipeDescription,
            preptime: recipePrepTime,
            // dietary,
            recipeDifficulty: recipeDifficulty,
            steps: recipeSteps,
        }, { transaction: t });



        const mId= await Ingredient_Type.findOne({
            where:{
                name:'main'
            }
        });

        const sId= await Ingredient_Type.findOne({
            where:{
                name:'secondary'
            }
        });

        // console.log(mId.id);

        for (const mainIngredient of mainIngredients) {

            const [mIngredient,created] = await Ingredients.findOrCreate({
                where:{
                    name:mainIngredient.name.trim(),
                    ingredientTypeId:mId.id
                },
                defaults:{
                    name:mainIngredient.name.trim(),
                    ingredientTypeId:mId.id
                },
                transaction:t
            });

            // console.log(mIngredient,created);

            await ReceipeIngredients.create({
                recipeId:recipe.id,
                ingredientsId:mIngredient.id,
                quantity:mainIngredient.quantity
            },{transaction:t});
        
        };

        for (const secondaryIngredient of secondaryIngredients) {

            const [sIngredient,created]=await Ingredients.findOrCreate({
                where:{
                    name:secondaryIngredient.name.trim(),
                    ingredientTypeId:sId.id
                },
                defaults:{
                    name:secondaryIngredient.name.trim(),
                    ingredientTypeId:sId.id
                },
                transaction:t
            });

            await ReceipeIngredients.create({
                recipeId:recipe.id,
                ingredientsId:sIngredient.id,
                quantity:secondaryIngredient.quantity
            },{transaction:t});
        };
        


        await t.commit();

        res.status(201).json({
            message: 'Recipe edited successfully',
            status: 'success',
            recipe: recipe
        });

    } catch (err) {
        await t.rollback();
        console.log(err)
        res.status(500).json({
            message: err.message
        });
    }
}
