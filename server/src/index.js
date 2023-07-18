const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Get all currencies
app.get("/getAllCurrencies", async (req, res) => {
  const nameURL = "https://openexchangerates.org/api/currencies.json?app_id=5dc703bf908046a08b5f06b9cea1906f";

  try {
    const namesResponse = await axios.get(nameURL);
    const nameData = namesResponse.data;

    return res.json(nameData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Convert currency
app.get("/convert", async (req, res) => {
  const { date, sourceCurrency, targetCurrency, amountInSourceCurrency } = req.query;

  try {
    const dataUrl = `https://openexchangerates.org/api/historical/${date}.json?app_id=5dc703bf908046a08b5f06b9cea1906f`;
   
    const dataResponse = await axios.get(dataUrl);
    const rates = dataResponse.data.rates;

    // Rates
    const sourceRate = rates[sourceCurrency];
    const targetRate = rates[targetCurrency];

    // Final target value
    const targetAmount = (targetRate / sourceRate) * amountInSourceCurrency;

    return res.json(targetAmount.toFixed(2));

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Listen to a port
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
