"use client"
import { useState, useEffect } from "react";

export default function Home() {
  const [result, setResult] = useState("hi");
 const input = 'solve x^2 + 5x + 6 = 0';

  useEffect(() => {
    const apiUrl = `https://mathpi-api.artimum.repl.co/api/wolfram?input=${encodeURIComponent(input)}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setResult(JSON.stringify(data, null, 2));      
      })
      .catch(error => {
        console.error('Error fetching Wolfram Alpha API:', error);
        setResult(`Error fetching data: ${error.message}`);
      });
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div id="result">
      {result}
    </div>
  );
}