import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { data } from '../src/assets/data'


function App() {

  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index])
  const [lock, setLock] = useState(false)
  const [score, setScore] = useState(0)
  const [result, setResult] = useState(false)


  let option1 = useRef(null)
  let option2 = useRef(null)
  let option3 = useRef(null)
  let option4 = useRef(null)

  const array_list = [option1, option2, option3, option4]

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct")
        setLock(true)
        setScore(prev => prev + 1)
      } else {
        e.target.classList.add("wrong")
        setLock(true)
        array_list[question.ans - 1].current.classList.add("correct")
      }
    }
  }

  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(prevIndex => {
        const newIndex = prevIndex + 1;
        setQuestion(data[newIndex]);
        return newIndex;
      });
      setLock(false);
      array_list.forEach((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0)
    setLock(false);
    setResult(false)

  }
  return (
    <>
      <div className='container'>
        <h1>Quize Questions</h1>
        {result ? <></> : <div>
          <h2>{index + 1}. {question.question}</h2>
          <ul>
            <li ref={option1} onClick={(e) => { checkAns(e, 1) }}>{question.option1}</li>
            <li ref={option2} onClick={(e) => { checkAns(e, 2) }}>{question.option2}</li>
            <li ref={option3} onClick={(e) => { checkAns(e, 3) }}>{question.option3}</li>
            <li ref={option4} onClick={(e) => { checkAns(e, 4) }}>{question.option4}</li>
          </ul>
          <button className="next" onClick={next}>Next</button>

         
        </div>}
        {result ? <><h2>You scored {score} out of {data.length}</h2>
          <button className='reset' onClick={reset}>Reset</button></> : <></>}
      </div>
    </>
  );
}

export default App;
