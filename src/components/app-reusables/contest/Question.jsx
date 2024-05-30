
import React from 'react';

const Question = ({ question, answers, handleAnswer }) => {
    return (
        <div className='w-full grid gap-y-5'>
            <h2>{question}</h2>
            <ul className='mt-3 grid gap-y-3'>
                {answers.map((answer, index) => (
                    <li className='flex gap-x-3 text-left' key={index}>
                      {index+1}.  <button onClick={() => handleAnswer(answer)}>{answer}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Question;
