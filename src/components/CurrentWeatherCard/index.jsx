import { useSelector } from 'react-redux'
import styles from '../../components/CurrentWeatherCard/CurrentWeatherCard.module.css'
import windIcon from '/wind.png'

function CurrentWeatherCard() {
  const { forecast, status, error, temperatureUnit } = useSelector((state) => state.weather)

  const convertTemp = (tempCelsius) => {
    if (temperatureUnit === 'F') {
      return Math.round((tempCelsius * 9) / 5 + 32)
    }
    return Math.round(tempCelsius)
  }

  if (status === 'loading' || !forecast) return <div>Загрузка...</div>
  if (status === 'error') return <div>{error}</div>

  const current = forecast?.list?.find((h) => h?.main && h?.weather && h.weather[0]) || null
  if (!current) return <div>Нет данных</div>

  const iconUrl = `${import.meta.env.BASE_URL}${current.weather[0].icon}.png`

  const dateObj = new Date(current.dt_txt)
  const formattedTime = dateObj.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <p className={styles.temperature}>
          {convertTemp(current.main.temp)}°{temperatureUnit}
        </p>
        <div className={styles.condition}>
          <img className={styles.icon} src={iconUrl} alt={current.weather[0].main} />
          <p className={styles.main}>{current.weather[0].main}</p>
        </div>
        <p className={styles.feelsLike}>
          Feel like: {convertTemp(current.main.feels_like)}°{temperatureUnit}
        </p>
      </div>
      <div className={styles.right}>
        <div className={styles.info}>
          <p className={styles.city}>{forecast.city?.name}</p>{' '}
          <p className={styles.time}>{formattedTime}</p>
        </div>
        <div className={styles.wind}>
          <img className={styles.windImg} src={windIcon} alt="Wind" />
          <p>{current.wind.speed} m/s</p>
        </div>
        <p className={styles.range}>
          {convertTemp(current.main.temp_min)}°{temperatureUnit} to{' '}
          {convertTemp(current.main.temp_max)}°{temperatureUnit}
        </p>
      </div>
    </div>
  )
}

export default CurrentWeatherCard
