const axios = require("axios");

async function getData() {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
    console.log("GET Response:", response.data);
  } catch (error) {
    console.error("Erro no GET:", error);
  }
}

getData();

async function postData() {
  try {
    const response = await axios.post("https://jsonplaceholder.typicode.com/posts", {
      title: "Gerenciador de Tarefas",
      body: "Speed testando o Post",
      userId: 1,
    });
    console.log("POST Response:", response.data);
  } catch (error) {
    console.error("Erro no POST:", error);
  }
}

postData();
