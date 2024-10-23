const App = () => {
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [chatOpen, setChatOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

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
    setAnswer("");
    
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
                text: generatePrompt(question)
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
      
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        setAnswer(data.candidates[0].content.parts[0].text.trim());
      } else {
        setAnswer("Sorry baby, something went wrong 🥺 Try again?");
      }
    } catch (error) {
      console.error("Error:", error);
      setAnswer("Connection issues bb, can u try again? 🙏");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container">
      <h1>To Vidhi, from Amrit</h1>
      
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
            
            <div className="message-container">
              {answer && (
                <div className="message">
                  <div className="avatar">👨‍💻</div>
                  <div className="message-bubble">
                    <p>{answer}</p>
                  </div>
                </div>
              )}
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

      <footer>
        <p>Made with ❤️ by Amrit for Vidhi</p>
      </footer>
    </div>
  );
};

export default App;const App = () => {
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [chatOpen, setChatOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

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
    setAnswer("");
    
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
                text: generatePrompt(question)
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
      
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        setAnswer(data.candidates[0].content.parts[0].text.trim());
      } else {
        setAnswer("Sorry baby, something went wrong 🥺 Try again?");
      }
    } catch (error) {
      console.error("Error:", error);
      setAnswer("Connection issues bb, can u try again? 🙏");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container">
      <h1>To Vidhi, from Amrit</h1>
      
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
            
            <div className="message-container">
              {answer && (
                <div className="message">
                  <div className="avatar">👨‍💻</div>
                  <div className="message-bubble">
                    <p>{answer}</p>
                  </div>
                </div>
              )}
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

      <footer>
        <p>Made with ❤️ by Amrit for Vidhi</p>
      </footer>
    </div>
  );
};

export default App;
