"use client";
import React, { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [fullres, setFullRes]:any = useState([]);

  const handleInputChange = (e:any) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    let apiUrl = `https://mathpi-api.artimum.repl.co/api/wolfram?input=solve ${encodeURIComponent(inputValue)}`;

    let res = await fetch(apiUrl, { cache: "no-cache" });
    let data = await res.json();
    console.log(data);

    if (data.queryresult && data.queryresult.pods && data.queryresult.pods.length > 0) {
      let result = data.queryresult.pods[1].subpods.map((solution:any, index:any) => {
        return <span key={index}>{` ${solution.plaintext},`}</span>;
      });
      setFullRes(result);
    } else {
      // If no pods found, display a message
      setFullRes(<span>No result found</span>);
    }
  };

  return (
    <div>
      {fullres}
      <br />
      <input type="text" value={inputValue} onChange={handleInputChange}></input>
      <button onClick={handleSubmit} type="submit">
        submit
      </button>
    </div>
  );
}
