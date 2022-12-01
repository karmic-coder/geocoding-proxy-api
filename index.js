const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const port = process.env.API_PORT;
const apikey = process.env.ZIPCODEBASE_API;
// console.log(apikey);

app.use(cors());

const getZip = async (zip) => {
  const geocodeUrl = `https://app.zipcodebase.com/api/v1/search?apikey=${apikey}&codes=${parseInt(
    zip
  )}&country=US`;

  try {
    const response = await fetch(geocodeUrl);
    // console.log(response);
    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: error };
  }
};

app.get("/getzip/:zip", async (req, res) => {
  const zip = req.params.zip;
  const result = await getZip(zip);
  console.log(result);
  res.send(result);
});

app.listen(port, () => {
  console.log("geocoding proxy app listening on port 3003");
});
