import React, { useEffect } from 'react';
import './App.css';

const serverUrl = process.env.SERVER_BASE_URL || 'http://localhost:3003';
function App() {

  const [welcome, setWelcome] = React.useState<string | null >(null);
  useEffect(() => {
    fetch(`${serverUrl}/`, {
      method: 'GET',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
        'allow-origin': '*',
        // Access-Control-Allow-Headers 
    }
    })
      .then(response => response.json())
      .then(res => setWelcome(res.message))

  }, []);

  return (
    <div className="App">
      Hello Curious Programmer!
      <br />
      Server says: {welcome}
    </div>
  );
}

export default App;
