const express=require('express');

const router=express.Router();

const recipeController=require('../controller/recipe');

const userAuthentication=require('../middleware/userAuthentication');



router.post('/add-recipe',userAuthentication.authentication,recipeController.addRecipe);

router.get('/my-recipes',userAuthentication.authentication,recipeController.getMyRecipes);

router.get('/get-recipe/:id',userAuthentication.authentication,recipeController.getRecipe);

router.delete('/delete-recipe/:id',userAuthentication.authentication,recipeController.deleteRecipe);

router.post('/edit-recipe/:id',userAuthentication.authentication,recipeController.editRecipe);

module.exports=router;