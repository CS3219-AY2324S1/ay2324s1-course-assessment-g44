const Model = require('../models/question_model');

const getQuestions = async (req, res) => {
    try {
        const allQuestions = await Model.find();
        res.status(200).json(allQuestions);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const addQuestion = async (req, res) => {
    const question = new Model({
        questionId: req.body.questionId,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        difficulty: req.body.difficulty
    })
    try {
        await question.validate();
        const questionToSave = await question.save();
        res.status(200).json(questionToSave);
    } catch (error) {
        console.log(error);
        res.status(400).json({message: error.message});
    }
}

const deleteQuestion = async(req, res) => {
    try {
        const { questionId } = req.body;
        const data = await Model.findOneAndDelete({questionId: questionId})
        if (!data) {
            return res.status(404).json({error: 'Question not found'});
        }
        res.status(200).json(data);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const updateQuestion = async (req, res) => {
    try {
        const {questionId, title, description, category, difficulty} = req.body;
        const updatedQuestion = new Model(
            {questionId: questionId, 
            title: title,
            description: description,
            category: category,
            difficulty: difficulty});
        await updatedQuestion.validate();
        const options = { new: true };

        const result = await Model.findOneAndUpdate(
            {questionId: questionId}, {title: title, description: description, category: category, difficulty: difficulty}, options 
        )

        res.status(200).json(updatedQuestion)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = {
    getQuestions,
    deleteQuestion,
    addQuestion,
    updateQuestion,
};