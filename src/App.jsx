import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

function App() {
  const [movies, setMovies] = useState([]);
  const api_url = 'https://api.themoviedb.org/3/trending/movie/day?language=fr-FR';
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjJkNjNjZGRjMDY2ZDk5ZWQzZTgwNmQzMjY3MThjYSIsInN1YiI6IjYyNGVhNTRhYjc2Y2JiMDA2ODIzODc4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zuuBq1c63XpADl8SQ_c62hezeus7VibE1w5Da5UdYyo";
  const imageUrl = "https://image.tmdb.org/t/p/original/";
  const options = {
    method: "GET",
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  useEffect(() => {
    fetch(api_url, options).then(async (response) => {
      if (response.ok) {
        const moviesFetch = await response.json()
        setMovies(moviesFetch.results)
      }
    })
  }, [movies])

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Films par TMDB</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Listes des tendances de la journée
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {movies.map((movie) => (
            <article
              key={movie.id}
              className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
            >
              <img src={imageUrl + movie.poster_path} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

              <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                <Link to={"films/" + movie.id}>
                  <span className="absolute inset-0" />
                  {movie.original_title}
                </Link>
              </h3>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
