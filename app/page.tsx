"use client"
import React, { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [fullRes, setFullRes]:any = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e:any) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    fetchData();
  };

  const fetchData = async () => {
    setLoading(true);
    setFullRes([]); // Clear old results when starting a new query

    let apiUrl = `https://mathpi-api.artimum.repl.co/api/wolfram?input=solve ${encodeURIComponent(inputValue)}`;

    try {
      let res = await fetch(apiUrl, { cache: "no-cache" });
      let data = await res.json();
      console.log(data)
      if (data.queryresult && data.queryresult.pods && data.queryresult.pods.length > 0) {
        let result = data.queryresult.pods[1].subpods.map((solution:any, index:any) => {
          return <div className="result" key={index}><div>{` ${solution.plaintext},`}<br></br></div></div>;
        });
        setFullRes(result);
      } else {
        setFullRes(<div className="result" key="no-result"><span>No result found</span></div>);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e:any) => {
    // Check if the pressed key is "Enter"
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents the default behavior of the Enter key (form submission)
      fetchData();
    }
  };

  return (
    <div className="page">
      <form className="form" onSubmit={handleSubmit}>
        <input placeholder="Type something" id="inputField" className="inputField" type="text" value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown}></input>
      </form>
      <div>
        
      </div>
      <div className="box">
        <div className="head"><div className="plainText">Result</div></div>
    <div className="displayment">

    <div className="mathdis">
    {loading && <div className="result">Loading...</div>}
    {fullRes}
    </div>

    <div id="calculator" style={{width:"100%",height: "300px" }}></div>

    </div>
    </div>

    </div>
  );
}
