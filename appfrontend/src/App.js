import './App.css';
import { useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message))
  });

  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? "No data to show" : data }</p>
      </header>
    </div>
  );
}

export default App;
