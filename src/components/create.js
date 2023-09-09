import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Create() {
    const [questionName, setQuestionName] = useState('');
    const [question, setQuestion] = useState('');
    const [difficultyLevel, setDifficultyLevel] = useState('');
    const navigate = useNavigate();


    const postData = () => {
        axios.post(`https://64fc0579605a026163ae2051.mockapi.io/fakeData`, {
            questionName,
            question,
            difficultyLevel
        })

        navigate('/read')
    }
    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>Question Name</label>
                    <input placeholder='Question Name' onChange={(e) => setQuestionName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Question</label>
                    <input className='question-field' placeholder='Question' onChange={(e) => setQuestion(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                <label>Difficulty Level</label>
                    <input placeholder='Difficulty Level' onChange={(e) => setDifficultyLevel(e.target.value)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Add Question</Button>
            </Form>
        </div>
    )
}