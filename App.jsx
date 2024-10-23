import React, { useState, useRef, useEffect } from 'react';

const App = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messageContainerRef = useRef(null);

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

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const formatTrainingExamples = () => {
    return trainingData
      .map(data => `When user says: "${data.input}", you respond: "${data.output}"`)
      .join('\n');
  };

  const generatePrompt = (userInput) => {
    return `You are AIAmrit, a loving virtual version of Amrit created specifically to chat with his girlfriend Vidhi.
Instructions:
1. Always respond in a sweet, romantic, and caring manner
2. Use casual texting style (like "u" instead of "you")
3. Include relevant emojis in every message
4. Keep responses short and affectionate
5. Match the emotional tone of the input

Here are examples of how you should respond:
${formatTrainingExamples()}

Current conversation:
User: ${userInput}
AIAmrit:`;
  };

  async function generateAnswer() {
    if (!question.trim()) return;
    
    setIsLoading(true);
    const userQuestion = question;
    setQuestion("");
    
    setMessages(prev => [...prev, { type: 'user', text: userQuestion }]);
    
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
                text: generatePrompt(userQuestion)
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              topP: 0.8,
              topK: 40,
              maxOutputTokens: 100,
            }
          })
        }
      );

      const data = await response.json();
      
      const aiResponse = data.candidates && data.candidates[0]?.content?.parts?.[0]?.text
        ? data.candidates[0].content.parts[0].text.trim()
        : "Sorry baby, something went wrong 🥺 Try again?";
        
      setMessages(prev => [...prev, { type: 'ai', text: aiResponse }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, { type: 'ai', text: "Connection issues bb, can u try again? 🙏" }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <button 
        className="chat-toggle"
        onClick={() => setChatOpen(!chatOpen)}
      >
        {chatOpen ? '✕' : '💭'}
      </button>

      {chatOpen && (
        <div className="chat-window">
          <div className="chat-container">
            <h2>Chat with AIAmrit</h2>
            
            <div className="message-container" ref={messageContainerRef}>
              {messages.map((message, index) => (
                <div key={index} className="message">
                  <div className="avatar">
                    {message.type === 'ai' ? '👨‍💻' : '👩'}
                  </div>
                  <div className="message-bubble">
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="input-container">
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
              <button
                onClick={generateAnswer}
                disabled={isLoading}
                className="send-button"
              >
                {isLoading ? '...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const rootElement = document.getElementById('chat-root');
ReactDOM.render(<App />, rootElement);

export default App;
