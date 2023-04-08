import React, { useEffect, useState } from 'react';

export default 
function QuizItem({ quiz, setMark ,setAns}) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (optionId) => {
    const newSelectedOptions = [...selectedOptions];
    const optionIndex = newSelectedOptions.indexOf(optionId);

    if (optionIndex === -1) {
      newSelectedOptions.push(optionId);
    } else {
      newSelectedOptions.splice(optionIndex, 1);
    }

    setSelectedOptions(newSelectedOptions);
    setMark(quiz.id, newSelectedOptions);
  };
  useEffect(()=>{
      console.log("useeffect");
      console.log(quiz);
    if(quiz.options[0].isCorrect==true){
        setAns(quiz.id,1);
        console.log(quiz.options[0].isCorrect);
    } if(quiz.options[1].isCorrect==true){
        setAns(quiz.id,2);
          console.log(quiz.options[1].isCorrect);

    } if(quiz.options[2].isCorrect==true){
        setAns(quiz.id,3);
          console.log(quiz.options[2].isCorrect);
    } if(quiz.options[3].isCorrect==true){
        setAns(quiz.id,4);
          console.log(quiz.options[4].isCorrect);
    }
  },[quiz])
  return (
    <div className="space-y-8 ">
      <h4 className="question">{quiz.question}</h4>
      <form className="quizOptions">
        {quiz.options.map((option) => (
        
          <label key={option.id} htmlFor={`option${option.id}_q${quiz.id}`}>
            <input
              type="checkbox"
              id={`option${option.id}_q${quiz.id}`}
              checked={selectedOptions.includes(option.id)}
              onChange={() => handleOptionChange(option.id)}
            />
            {option.option}
          </label>
        ))}
      </form>
    </div>
  );
}
//function QuizeItem(props) {
    
//     const {id,question,video_id,video_title,options} = props?.quize;
//     const [opt1,setOpt1] = useState(false);
//     const [opt2,setOpt2] = useState(false);
//     const [opt3,setOpt3] = useState(false);
//     const [opt4,setOpt4] = useState(false);
//     console.log(opt1,opt2,opt3,opt4);
//   return (
//     <div className="quiz">
//     <h4 className="question">{question}</h4>
//     <form className="quizOptions">
//       {/* <!-- Option 1 --> */}
//       <label for="option1_q1">
//         <input type="checkbox" id="option1_q1" checked={opt1} value={opt1}  onChange={(e)=>setOpt1(e.target.checked)} />
//         {options[0].option}
//         {/* A function that is called after a certain time interval */}
//       </label>

//       {/* <!-- Option 2 --> */}
//       <label for="option2_q1">
//         <input type="checkbox" id="option2_q1" checked={opt2} value={opt2} onChange={(e)=>setOpt2(e.target.checked)} />
//         {options[1].option}
//         {/* A function that is called after a certain time interval */}
//       </label>

//       {/* <!-- Option 3 --> */}
//       <label for="option3_q1">
//         <input type="checkbox" id="option3_q1" checked={opt3} value={opt3} onChange={(e)=>setOpt3(e.target.checked)} />
//         {options[2].option}
//         {/* A function that is called after a certain time interval */}
//       </label>

//       {/* <!-- Option 4 --> */}
//       <label for="option4_q1">
//         <input type="checkbox" id="option4_q1" checked={opt4} value={opt4} onChange={(e) => setOpt4(e.target.checked)}/>
//         {options[3].option}
//         {/* A function that is called after a certain time interval */}
//       </label>
//     </form>
//   </div>
//   )
// }
