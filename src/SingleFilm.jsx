import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function SingleFilm() {
  const [movie, setMovie] = useState("");
  let { movieId } = useParams();
  const api_url = `https://api.themoviedb.org/3/movie/${movieId}?language=fr-FR`;
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
        const movieFetch = await response.json()
        setMovie(movieFetch)
      }
    })
  },
    [movie])
  return (
    <div className="bg-white">

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">
          <Link to="/" className="text-xs underline font-semibold text-blue-500">
            Retour à la liste
          </Link>

          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{movie.title}</h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>


            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">{movie.overview}</p>
            </div>

          </section>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
            <img src={imageUrl + movie.poster_path} alt={movie.title} className="h-full w-full object-cover object-center" />
          </div>
        </div>

      </div>
    </div>
  )
}
