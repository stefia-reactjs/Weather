import './App.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import {
  fetchForecast,
  fetchForecastByCoords,
  setCitiesData,
  setCitiesLoading,
  setCitiesError,
  setLocationAsked,
} from './redux/weatherSlice'

import CurrentWeatherCard from './components/CurrentWeatherCard'
import SearchCity from './components/SearchCity'
import WeeklyForecast from './components/WeeklyForecast'
import HourlyForecast from './components/HourlyForecast'
import Cities from './components/Cities'
import TemperatureToggle from './components/TemperatureToggle'

const CITIES = ['London', 'Paris', 'New York']

function App() {
  const dispatch = useDispatch()
  const { city, forecast, status, error, citiesData, citiesLoading, citiesError, locationAsked } =
    useSelector((state) => state.weather)

  useEffect(() => {
    if (locationAsked) return

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          dispatch(fetchForecastByCoords({ lat: latitude, lon: longitude }))
          dispatch(setLocationAsked(true))
        },
        (error) => {
          console.log('Геолокация отклонена:', error.message)
          dispatch(fetchForecast('Helsinki'))
          dispatch(setLocationAsked(true))
        },
      )
    } else {
      dispatch(fetchForecast('Helsinki'))
      dispatch(setLocationAsked(true))
    }
  }, [locationAsked, dispatch])

  useEffect(() => {
    if (city && locationAsked) {
      dispatch(fetchForecast(city))
    }
  }, [city, dispatch, locationAsked])

  useEffect(() => {
    const apiKey = import.meta.env.VITE_OWM_API_KEY

    if (!apiKey) {
      dispatch(setCitiesError(true))
      dispatch(setCitiesLoading(false))
      return
    }

    async function loadCities() {
      dispatch(setCitiesLoading(true))
      dispatch(setCitiesError(false))

      try {
        const requests = CITIES.map((c) =>
          axios.get('https://api.openweathermap.org/data/2.5/forecast', {
            params: { q: c, units: 'metric', appid: apiKey },
          }),
        )

        const responses = await Promise.all(requests)

        const result = {}
        responses.forEach((res, index) => {
          result[CITIES[index]] = res.data
        })

        dispatch(setCitiesData(result))
      } catch (e) {
        console.error(e)
        dispatch(setCitiesError(true))
        dispatch(setCitiesData({}))
      } finally {
        dispatch(setCitiesLoading(false))
      }
    }

    loadCities()
  }, [dispatch])

  return (
    <>
      <div className="weatherHeader">
        <SearchCity />
        <TemperatureToggle />
      </div>

      {error ? <p style={{ padding: 8 }}>Main error: {error}</p> : null}

      <div className="weatherToday">
        <CurrentWeatherCard forecast={forecast} loading={status === 'loading'} error={error} />
        <HourlyForecast forecast={forecast} loading={status === 'loading'} error={error} />
      </div>

      <div className="weatherDetail">
        <Cities cities={CITIES} data={citiesData} loading={citiesLoading} error={citiesError} />
        <WeeklyForecast forecast={forecast} loading={status === 'loading'} error={error} />
      </div>
    </>
  )
}

export default App
