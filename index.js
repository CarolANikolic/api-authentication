import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com"; 

const yourUsername = "caroldev";
const yourPassword = "WebDev2024";
const yourAPIKey = "1de6a80b-4cfa-496a-b413-639602abdc33";
const yourBearerToken = "5284b9ed-60b3-48b0-b06c-a288d9ce2358";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "/random");
    const result = JSON.stringify(response.data);
    res.render("index.ejs", { content: result });
  } catch (error) {
    console.log("Unable to show a no auth secret:", error);
    res.render("index.ejs", { content: "Sorry! We could not retrieve any secret." });
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const response = await axios.get(
      API_URL + "/all?page=2", {
      auth: {
        username: yourUsername,
        password: yourPassword
      }
      });

      const result = JSON.stringify(response.data);
      res.render("index.ejs", { content: result });
    } catch (error) {
      console.log("Unable to show a basic auth secret:", error);
      res.render("index.ejs", { content: "Sorry! An authentication problem occurred and we couldn't reveal a secret." });
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "/filter", {
      params: {
        score: 5,
        apiKey: yourAPIKey
      },
    });
    const result = JSON.stringify(response.data);
    res.render("index.ejs", { content: result})
  } catch (error) {
    console.log("Unable to show a key auth secret:", error);
    res.render("index.ejs", { content: "Sorry! An authentication problem occurred and we couldn't reveal a secret." });
  }
});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
