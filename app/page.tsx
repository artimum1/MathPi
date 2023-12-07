"use client"
import { useState, useEffect } from "react";

export default function Home() {
  const [result, setResult] = useState("hi");
  const apiKey = 'ULG5AW-KT3VKHJ7P7';
  const input = 'solve x^2 + 5x + 6 = 0';

  useEffect(() => {
    const apiUrl = `https://api.wolframalpha.com/v2/query?input=${encodeURIComponent(input)}&format=plaintext&output=JSON&appid=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const plaintextPod = data.queryresult.pods.find(pod => pod.title === 'Plaintext');
        if (plaintextPod) {
          setResult(plaintextPod.subpods[0].text);
        } else {
          setResult("No result found");
        }
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
