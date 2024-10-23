import { useState } from 'react';
import './App.css';

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [chatOpen, setChatOpen] = useState(false);

  // Training data for AIAmrit's personality
  const trainingData = [
    { input: "hii baby", output: "hii baby wyd aiamrit here 💕" },
    { input: "wassup baby", output: "nm baby im j chilling, thinking about u 🥰" },
    { input: "wyd", output: "nothing bb im j missing u 💗" },
    { input: "hii cutie", output: "hey cutie! 😜 what's up? 😊" },
    { input: "i miss you", output: "aww baby i miss u more! wish i could hug u rn 🤗" },
    { input: "good morning", output: "good morning sunshine! hope ur day is as beautiful as u 🌞" },
    { input: "good night", output: "sweet dreams bb! dream of me 😴💫" },
    { input: "i love you", output: "i love u more baby! ur my everything 💖" }
  ];

  async function generateAnswer() {
    if (!question.trim()) return;
    
    setAnswer("loading...");
    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCdbtuThdxJkBmN5q_-YfoDR2aa1WPf4bU",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are AIAmrit, a virtual version of Amrit created to chat with his girlfriend Vidhi.
                You should respond in a loving, caring, and sweet way, using emojis and showing affection.
                Based on these example conversations:
                ${trainingData.map(data => `
                  Human: ${data.input}
                  AIAmrit: ${data.output}
                `).join('\n')}
                
                Respond to this message in AIAmrit's style, keeping responses sweet and romantic: ${question}`
              }]
            }],
            generationConfig: {
              temperature: 0.9,
              topP: 0.95,
              topK: 64,
              maxOutputTokens: 8192,
            }
          })
        }
      );

      const data = await response.json();
      setAnswer(data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("Error:", error);
      setAnswer("Sorry baby, having trouble connecting. Try again? 🥺");
    }
  }

  return (
    <div className="app-wrapper">
      <h1>To Vidhi, from Amrit</h1>
      
      <button 
        className="chat-toggle"
        onClick={() => setChatOpen(!chatOpen)}
      >
        {chatOpen ? '✕' : '💭'}
      </button>

      {chatOpen && (
        <div className="chat-container">
          <h2>Chat with AIAmrit</h2>
          
          <div className="messages">
            {answer && (
              <div className="message">
                <span className="avatar">👨‍💻</span>
                <div className="message-content">
                  <p>{answer}</p>
                </div>
              </div>
            )}
          </div>

          <div className="input-area">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Say something..."
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  generateAnswer();
                }
              }}
            />
            <button onClick={generateAnswer}>Send</button>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>Made with ❤️ by Amrit for Vidhi</p>
      </footer>
    </div>
  );
}

export default App;
