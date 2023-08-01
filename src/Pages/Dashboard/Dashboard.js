import React, { useState, useEffect, useRef } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import axios from "axios";
import "./Dashboard.css";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

function Dashboard() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);

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
    // const openaiEndpoint =
    //   "https://api.openai.com/v1/engines/text-davinci-003/completions";
    // const openaiApiKey = "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";

    // const requestBody = {
    //   prompt:
    //     "Correct this to standard English:\n\n" + inputText,
    //   temperature: 0.7,
    //   max_tokens: 60,
    //   top_p: 1,
    //   frequency_penalty: 0,
    //   presence_penalty: 0,
    //   stop: ["\n"],
    //   n: 1,
    // };

    // axios
    //   .post(openaiEndpoint, requestBody, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${openaiApiKey}`,
    //     },
    //   })
    //   .then((response) => {
    //     const correctedText = response.data.choices[0].text;
    //     setOutputText(correctedText.split(" <br> ").join("\n"));
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setOutputText(
    //       error + "\n" + error["response"]["data"]["error"]["message"]
    //     );
    //     setLoading(false);
    //   });
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
