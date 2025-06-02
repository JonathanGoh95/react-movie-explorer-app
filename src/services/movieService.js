const BASE_URL = `http://www.omdbapi.com/?apikey=${
  import.meta.env.VITE_OMDB_API_KEY
}`;

const movies = async (filter) => {
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

export { movies };
