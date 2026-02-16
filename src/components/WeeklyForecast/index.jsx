import { useSelector } from 'react-redux'
import WeeklyForecastCard from '../../components/WeeklyForecastCard'
import styles from './WeeklyForecast.module.css'

function WeeklyForecast() {
  const { forecast, status, error } = useSelector((state) => state.weather)
  const temperatureUnit = useSelector((state) => state.weather.temperatureUnit)

  if (status === 'loading' || !forecast) return <p>Загрузка недельного прогноза...</p>
  if (error) return <p>{error}</p>

  const list = forecast.list || []
  if (list.length === 0) return <p>Нет данных для недельного прогноза.</p>

  const daysMap = {}
  list.forEach((item) => {
    if (!item?.dt_txt || !item?.main || !item?.weather?.[0]) return
    const date = item.dt_txt.split(' ')[0]
    if (!daysMap[date]) daysMap[date] = []
    daysMap[date].push(item)
  })

  const dates = Object.keys(daysMap)
  if (dates.length === 0) return <p>Нет данных для недельного прогноза.</p>

  const daily = dates.map((date) => {
    const dayItems = daysMap[date]

    let minTemp = dayItems[0].main.temp_min
    let maxTemp = dayItems[0].main.temp_max

    const icon = dayItems[0].weather[0].icon
    const description = dayItems[0].weather[0].main

    dayItems.forEach((h) => {
      if (h.main.temp_min < minTemp) minTemp = h.main.temp_min
      if (h.main.temp_max > maxTemp) maxTemp = h.main.temp_max
    })

    return {
      date,
      minTemp: Math.round(minTemp),
      maxTemp: Math.round(maxTemp),
      icon,
      description,
    }
  })

  const fiveDays = daily.slice(0, 5)

  const scaleMin = Math.min(...fiveDays.map((d) => d.minTemp))
  const scaleMax = Math.max(...fiveDays.map((d) => d.maxTemp))

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>5-day forecast</p>
      <div className={styles.cards}>
        {fiveDays.map((day) => (
          <WeeklyForecastCard
            key={day.date}
            day={new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
            description={day.description}
            icon={day.icon}
            minTemp={day.minTemp}
            maxTemp={day.maxTemp}
            scaleMin={scaleMin}
            scaleMax={scaleMax}
            unit={temperatureUnit}
          />
        ))}
      </div>
    </div>
  )
}

export default WeeklyForecast
