
const { Router } = require('express');
const { Recipe, Diet } = require('../db');

const router = Router();

router.post('/', async (req, res, next) => {
    try { 
        const { name, summary, healthScore, steps, dietTypes} = req.body  
        const newRecipe = await Recipe.create({ 
            name, 
            summary,
            healthScore,
            steps, 
            createdInDb: true,
        })

        let dietTypesRecipeDb = await Diet.findAll({  
            where: {name: dietTypes} 
        })
        newRecipe.addDiet(dietTypesRecipeDb) 
        res.status(200).send(newRecipe)   
    } catch (error) {
        next(error) 
    };
});



module.exports = router;
