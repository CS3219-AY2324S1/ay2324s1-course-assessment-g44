// const questionModel = require('../models/question_model');

// const getQuestions = async (req, res) => {
//     try {
//         const allQuestions = await questionModel.find();
//         res.status(200).json(allQuestions);
//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// }

// const addQuestion = async (req, res) => {
//     const question = new questionModel({
//         questionId: req.body.questionId,
//         title: req.body.title,
//         description: req.body.description,
//         category: req.body.category,
//         difficulty: req.body.difficulty
//     })
//     try {
//         await question.validate();
//         const questionToSave = await question.save();
//         res.status(201).json(questionToSave);
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({message: error.message});
//     }
// }

// const deleteQuestion = async(req, res) => {
//     try {
//         const { questionId } = req.body;
//         const data = await questionModel.findOneAndDelete({questionId: questionId})
//         if (!data) {
//             return res.status(404).json({error: 'Question not found'});
//         }
//         res.status(200).json(data);
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// }

// const updateQuestion = async (req, res) => {
//     try {
//         const {questionId, title, description, category, difficulty} = req.body;
//         const updatedQuestion = new questionModel(
//             {questionId: questionId, 
//             title: title,
//             description: description,
//             category: category,
//             difficulty: difficulty});
//         await updatedQuestion.validate();
//         const options = { new: true };

//         const result = await questionModel.findOneAndUpdate(
//             {questionId: questionId}, {title: title, description: description, category: category, difficulty: difficulty}, options 
//         )

//         res.status(200).json(updatedQuestion)
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// }

// module.exports = {
//     getQuestions,
//     deleteQuestion,
//     addQuestion,
//     updateQuestion,
// };

const Question = require('../models/question_model'); // Adjust the path as needed

// Controller functions for handling question-related operations
const questionController = {
  // Add a new question
  addQuestion: async (req, res) => {
    try {
      const { questionId, title, description, category, difficulty } = req.body;
      const newQuestion = new Question({ questionId, title, description, category, difficulty });
      await newQuestion.save();
      res.status(201).json(newQuestion);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add question' });
    }
  },

  // Update a question
  updateQuestion: async (req, res) => {
    try {
      const { questionId, title, description, category, difficulty } = req.body;
      const updatedQuestion = await Question.findOneAndUpdate(
        { questionId },
        { title, description, category, difficulty },
        { new: true }
      );
      if (!updatedQuestion) {
        return res.status(404).json({ error: 'Question not found' });
      }
      res.json(updatedQuestion);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update question' });
    }
  },

  // Delete a question
  deleteQuestion: async (req, res) => {
    try {
      const { questionId } = req.body;
      const deletedQuestion = await Question.findOneAndDelete({ questionId });
      if (!deletedQuestion) {
        return res.status(404).json({ error: 'Question not found' });
      }
      res.json({ message: 'Question deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete question' });
    }
  },

  // Get all questions
  getQuestions: async (req, res) => {
    try {
      const questions = await Question.find({});
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get questions' });
    }
  },
};

module.exports = questionController;
