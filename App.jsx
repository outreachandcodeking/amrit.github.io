import { useState } from 'react'
import './App.css'
import axios from "axios"

function App() {
  const [question, setquestion] = useState("")
  const [answer, setanswer] = useState("")
 async function generateAnswer() {
  setanswer("loading..  ")
    const response = await axios({
      url:"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCdbtuThdxJkBmN5q_-YfoDR2aa1WPf4bU",
      method:"post" ,
      data: {
        "contents": [
          {"parts": [{"text":question}]},
        ],
      },
  });
  setanswer(response['data']['candidates'] [0] ['content']['parts'][0]['text']);
}
  return (
    <>
     <h1 className="">AIAmrit</h1>
     <textarea value={question}
     onChange={(e)=>setquestion(e.target.value)} cols="30" rows="10"></textarea>
     <button onClick={generateAnswer}>Generate answer</button>
     <p>{answer}</p>
    </>
  )
  
}

export default App
