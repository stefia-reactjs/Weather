import styles from './HourlyForecastCard.module.css'

export default function HourlyForecastCard({ temp, condition, dt_txt, icon, unit }) {
  const iconUrl = `${import.meta.env.BASE_URL}${icon}.png`

  const dateObj = dt_txt ? new Date(dt_txt) : null
  const formattedTime = dateObj
    ? dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
    : '--:--'

  const convertTemp = (tempCelsius) => {
    if (unit === 'F') {
      return Math.round((tempCelsius * 9) / 5 + 32)
    }
    return Math.round(tempCelsius)
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.time}>{formattedTime}</p>
      <div className={styles.line} />
      <div className={styles.condition}>
        {iconUrl ? <img className={styles.icon} src={iconUrl} alt={condition} /> : null}
        <div className={styles.text}>{condition}</div>
      </div>
      <p className={styles.temperature}>
        {convertTemp(temp)}°{unit}
      </p>
    </div>
  )
}
