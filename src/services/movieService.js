// Constant Variables for Easy Reusability
const BASE_URL = `http://www.omdbapi.com/?apikey=c7933753`;
const AIRTABLE_BASE = `appiKbPo7d5P9pnCG`;
const AIRTABLE_TABLE = `tblcMlwFSdnAcvIvt`;
const AIRTABLE_API_KEY = `pathY8nl4S5cr40VQ.a7a82c062d2589a19174ef0ca73199fea3e5d2cfc3d08ba24b06d09792d57d23`;
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
      headers: headersData,
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

// Delete Favourite Movies Data from Airtable by using imdbID to fetch the record ID
// Airtable can only delete records via the record ID
async function destroy(imdbID) {
  try {
    const response = await fetch(
      `${AIRTABLE_URL}?filterByFormula={imdbID}="${imdbID}"`,
      {
        headers: headersData,
      }
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    const recordId = fetchData.records[0]?.id; // Gets the record ID
    if (!recordId) {
      throw new Error("Record not found");
    }
    const deleteRecord = await fetch(`${AIRTABLE_URL}/${recordId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    if (!deleteRecord.ok) {
      throw new Error(`Delete Response status: ${deleteRecord.status}`);
    }

    const deleteData = await deleteRecord.json();
    return deleteData;
  } catch (error) {
    console.error(error.message);
  }
}

export { movies, details, favourites, create, destroy };
