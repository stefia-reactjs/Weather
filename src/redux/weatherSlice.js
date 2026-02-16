import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchForecast = createAsyncThunk('weather/fetchForecast', async (city) => {
  const apiKey = import.meta.env.VITE_OWM_API_KEY
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`,
  )
  return response.data
})

export const fetchForecastByCoords = createAsyncThunk(
  'weather/fetchForecastByCoords',
  async ({ lat, lon }) => {
    const apiKey = import.meta.env.VITE_OWM_API_KEY
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`,
    )
    return response.data
  },
)

const initialState = {
  city: 'Helsinki',
  forecast: null,
  status: 'idle',
  error: null,
  citiesData: {},
  citiesLoading: false,
  citiesError: false,
  temperatureUnit: 'C',
  locationAsked: false,
}

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCity(state, action) {
      state.city = action.payload
    },
    clearForecast(state) {
      state.forecast = null
      state.status = 'idle'
      state.error = null
    },
    setCitiesData(state, action) {
      state.citiesData = action.payload
    },
    setCitiesLoading(state, action) {
      state.citiesLoading = action.payload
    },
    setCitiesError(state, action) {
      state.citiesError = action.payload
    },
    setTemperatureUnit(state, action) {
      state.temperatureUnit = action.payload
    },
    setLocationAsked(state, action) {
      state.locationAsked = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchForecast.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.forecast = action.payload
        state.status = 'success'
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message || 'Failed to fetch forecast'
      })
      .addCase(fetchForecastByCoords.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchForecastByCoords.fulfilled, (state, action) => {
        state.forecast = action.payload
        state.city = action.payload.city.name
        state.status = 'success'
      })
      .addCase(fetchForecastByCoords.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message || 'Failed to fetch forecast'
      })
  },
})

export const {
  setCity,
  clearForecast,
  setCitiesData,
  setCitiesLoading,
  setCitiesError,
  setTemperatureUnit,
  setLocationAsked,
} = weatherSlice.actions
export default weatherSlice.reducer
