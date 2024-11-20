import axios from "axios";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

function buildHintPromptQuestion(question, expectedAnswer, level) {
  return `set role: retro professor
  give a brief and useful hint to this question without giving the actual answer : ${question}
  the expected answer is ${expectedAnswer}
  considering you are talking to someone at an ${level} level
  the response should be in the same language as the question`;
}

export async function getHint(question, expectedAnswer, level) {
  const url = "https://api.openai.com/v1/chat/completions";

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`,
  };

  const data = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: buildHintPromptQuestion(question, expectedAnswer, level),
      },
    ],
  };

  try {
    const response = await axios.post(url, data, { headers });
    const result = response.data.choices[0].message.content;
    return result;
  } catch (error) {
    console.error("Error calling ChatGPT API:", error.response ? error.response.data : error.message);
    throw error;
  }
}

function buildCheckAnswerPromptQuestion(question, userAnswer, actualAnswer) {
  return `set role: retro professor
    check the correctness of the answer:
    Question: ${question}
    User Answer: ${userAnswer}
    Correct Answer: ${actualAnswer}
    Evaluate the correctness of the user's answer in this JSON format: 
    {
        "correct": number, (percentage of correctness)
        "explanation": string
    }
    The explanation should be in the same language as the question and be short and concise.
    The explanation should help the user understand why their answer is correct or incorrect.
    Make sure you respect the JSON response format and return nothing else besides it, not even file format.`;
}

export async function checkAnswer(question, userAnswer, actualAnswer) {
  const url = "https://api.openai.com/v1/chat/completions";

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`,
  };

  const data = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: buildCheckAnswerPromptQuestion(question, userAnswer, actualAnswer),
      },
    ],
  };

  try {
    const response = await axios.post(url, data, { headers });
    const result = response.data.choices[0].message.content;
    return result;
  } catch (error) {
    console.error("Error calling ChatGPT API:", error.response ? error.response.data : error.message);
    throw error;
  }
}
