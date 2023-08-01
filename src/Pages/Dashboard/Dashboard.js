import React, { useState, useEffect, useRef } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import "./Dashboard.css";
import { Configuration, OpenAIApi } from "openai";
//"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"

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

function Dashboard() {
  console.log(configuration.apiKey);
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState("");

  const improve = async () => {
    setLoading(true);
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Correct this to standard written language:${inputText}.`,
      temperature: 0,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    setLoading(false);
    setOutputText(completion.data.choices[0].text.substring(2));
  };

  return (
    <div>
      <div className="input-title">
        <span>Paste your note:</span>
      </div>
      <div className="input-box">
        <InputTextarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={5}
          cols={30}
        />
      </div>
      <div className="tool-button">
        <div>
          <Button
            label="Submit"
            icon="pi pi-check"
            loading={loading}
            onClick={improve}
          />
        </div>
        <div className="input-title">
          <span>Your improved note:</span>
        </div>
      </div>
      <div className="output-box">
        <InputTextarea
          value={outputText}
          onChange={(e) => setOutputText(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Dashboard;
