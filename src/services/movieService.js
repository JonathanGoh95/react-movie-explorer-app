const BASE_URL = `http://www.omdbapi.com/?apikey=c7933753`;

/* const movies = async (term, selectedPage) => {
  try {
    const query = `&s=${term}&page=${selectedPage}`;
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
}; */

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

export { movies, details };
