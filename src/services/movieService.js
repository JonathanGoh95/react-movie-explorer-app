const cors = require("cors");
app.use(cors());
require("dotenv").config();

const BASE_URL = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}`;

const movie = async (filter) => {
  try {
    const query = `&s=${filter}`;
    const res = await fetch(BASE_URL + query);
    if (!res.ok) {
      console.log(`Status: ${res.status}`);
    }
    const data = await res.json();
    console.log("Data:", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export { movie };
