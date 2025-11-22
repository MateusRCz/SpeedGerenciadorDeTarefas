import fetch from "node-fetch";

// 1. Função para chamar o LLaMA local
async function llamaGenerate(prompt) {
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3.2:1b", // modelo local
      prompt,
    }),
  });

  const reader = response.body.getReader();
  let result = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = JSON.parse(new TextDecoder().decode(value));
    if (chunk.response) result += chunk.response;
  }
  return result;
}
