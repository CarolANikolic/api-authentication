import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com"; 

const yourUsername = "caroldev";
const yourPassword = "WebDev2024";
const yourAPIKey = "1de6a80b-4cfa-496a-b413-639602abdc33";
const yourBearerToken = "f68919a4-4acf-498c-8991-48f23130e954";

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

const config = {
  headers: {
    Authorization: `Bearer ${yourBearerToken}`
  }
};

app.get("/bearerToken", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/secrets/2", config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    console.log("Unnable to show a token auth secret:", error)
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  res.render("index.ejs", { content: "Sorry! An authentication problem occurred and we couldn't reveal a secret." });
});
