const BASE_URL = `http://www.omdbapi.com/?apikey=${
  import.meta.env.VITE_OMDB_API_KEY
}`;

const movies = async (term) => {
  try {
    const query = `&s=${term}`;
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
