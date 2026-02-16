import { useSelector } from 'react-redux'
import HourlyForecastCard from '../../components/HourlyForecastCard'
import styles from './HourlyForecast.module.css'

function HourlyForecast() {
  const { forecast, status, error } = useSelector((state) => state.weather)
  const temperatureUnit = useSelector((state) => state.weather.temperatureUnit)

  if (status === 'loading' || !forecast) return <p>Загрузка почасового прогноза...</p>
  if (error) return <p>{error}</p>

  const hours = forecast?.list?.filter((h) => h?.main && h?.weather?.[0]).slice(0, 8) || []
  if (hours.length === 0) {
    return <p>Нет данных для почасового прогноза.</p>
  }

  return (
    <div className={styles.wrapper}>
      {hours.map((hour, index) => {
        const condition = hour.weather?.[0]?.main || 'Неизвестно'
        const temp = hour.main?.temp != null ? Math.round(hour.main.temp) : '--'
        const dt_txt = hour.dt_txt || ''
        const icon = hour.weather?.[0]?.icon

        return (
          <HourlyForecastCard
            key={`${hour.dt}-${index}`}
            condition={condition}
            temp={temp}
            dt_txt={dt_txt}
            icon={icon}
            unit={temperatureUnit}
          />
        )
      })}
    </div>
  )
}

export default HourlyForecast
