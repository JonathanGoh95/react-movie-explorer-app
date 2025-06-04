// Constant Variables for Easy Reusability
const BASE_URL = `http://www.omdbapi.com/?apikey=c7933753`;
const AIRTABLE_BASE = `appiKbPo7d5P9pnCG`;
const AIRTABLE_TABLE = `tblcMlwFSdnAcvIvt`;
const AIRTABLE_API_KEY = `pathY8nl4S5cr40VQ.585f4ba1783e408435d65b4367715394bcd6ae2243f4cc80a5ece02739996070`;
const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/${AIRTABLE_TABLE}`;

// Authorization Data for Airtable
const headersData = {
  Authorization: `Bearer ${AIRTABLE_API_KEY}`,
  "Content-Type": "application/json",
};

// Fetches the API data from OMDb
const movies = async (term, year, selectedPage) => {
  try {
    const query = `&s=${term}&y=${year}&page=${selectedPage}`;
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

// Fetches Specific Movie Details Data from OMDb
const details = async (imdbID) => {
  try {
    const movieID = `&i=${imdbID}&plot=full`;
    const res = await fetch(BASE_URL + movieID);
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

// Fetches Favourite Movies Data from Airtable
async function favourites() {
  try {
    const response = await fetch(AIRTABLE_URL, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

// Creates Favourite Movies Data to Airtable
async function create(movie) {
  try {
    const response = await fetch(AIRTABLE_URL, {
      method: "POST",
      headersData,
      body: JSON.stringify({
        fields: {
          Title: movie.Title,
          Released: movie.Released,
          Runtime: movie.Runtime,
          Director: movie.Director,
          Writer: movie.Writer,
          Actors: movie.Actors,
          Genre: movie.Genre,
          imdbRating: movie.imdbRating,
          Poster: movie.Poster,
          Plot: movie.Plot,
          imdbID: movie.imdbID,
        },
      }),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

// Delete Favourite Movies Data from Airtable
async function destroy(imdbID) {
  try {
    const response = await fetch(AIRTABLE_URL + `/${imdbID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

export { movies, details, favourites, create, destroy };
