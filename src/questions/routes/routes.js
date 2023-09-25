const express = require('express');

const router = express.Router()

module.exports = router;
const Model = require('../models/question_model');
const { model } = require('mongoose');

//Post Method
router.post('/post', async (req, res) => {
    const data = new Model({
        questionId: req.body.questionId,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        complexity: req.body.complexity
    })
    try {
        await data.validate();
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        console.log(error);
        res.status(400).json({message: error.message});
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try{
        const allQuestions = await Model.find();
        res.status(200).json(allQuestions);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const questionId = req.params.id;
        const {title, description, category, complexity} = req.body;
        const updatedQuestion = new Model(
            {questionId: questionId, 
            title: title,
            description: description,
            category: category,
            complexity: complexity});
        await updatedQuestion.validate();
        const options = { new: true };

        const result = await Model.findOneAndUpdate(
            {questionId: questionId}, updatedQuestion, options
        )

        res.status(200).json(updatedQuestion)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const questionId = req.params.id;
        const data = await Model.findOneAndDelete({questionId: questionId})
        res.send(`Document with ${data.title} has been deleted...`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get by Question ID Method
router.get('/getOne/:id', async (req, res) => {
    try{
        const questionId = req.params.id;
        const data = await Model.findOne({questionId: questionId}).exec();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})