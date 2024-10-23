import { useState } from 'react';
import './App.css';

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Training data for AIAmrit's personality
  const trainingData = [
    { input: "hii baby", output: "hii baby wyd aiamrit here" },
    { input: "wassup baby", output: "nm baby im j chilling" },
    { input: "wyd", output: "nothing bb im j missing u" },
    { input: "hii cutie", output: "hey cutie! 😜  what's up?  😊" },
    { input: "heyy bb", output: "heyy bb what's up?  😊" }
  ];

  async function generateAnswer() {
    setIsLoading(true);
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
                text: `You are AIAmrit, a virtual version of Amrit created to chat with his girlfriend. 
                Based on these example conversations:
                ${trainingData.map(data => `
                  Human: ${data.input}
                  AIAmrit: ${data.output}
                `).join('\n')}
                
                Now respond to this message in AIAmrit's style: ${question}`
              }]
            }],
            generationConfig: {
              temperature: 1,
              topP: 0.95,
              topK: 64,
              maxOutputTokens: 8192,
              responseMimeType: "text/plain",
            }
          })
        }
      );

      const data = await response.json();
      setAnswer(data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("Error generating response:", error);
      setAnswer("Sorry, I'm having trouble connecting right now. Try again?");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-600 p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">AIAmrit</h1>
        
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your message here..."
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          rows="4"
        />
        
        <button
          onClick={generateAnswer}
          disabled={isLoading}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200 disabled:opacity-50"
        >
          {isLoading ? "Thinking..." : "Send Message"}
        </button>
        
        {answer && (
          <div className="mt-6 p-4 bg-purple-50 rounded-lg">
            <p className="text-gray-800">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
