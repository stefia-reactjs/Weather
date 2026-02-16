import styles from './WeeklyForecastCard.module.css'

const getThermometerStyles = (minTemp, maxTemp, scaleMin, scaleMax) => {
  const scaleRange = scaleMax - scaleMin
  const barStart = ((minTemp - scaleMin) / scaleRange) * 100
  const barWidth = ((maxTemp - minTemp) / scaleRange) * 100

  return {
    width: `${barWidth}%`,
    left: `${barStart}%`,
  }
}

function WeeklyForecastCard({
  day,
  description,
  icon,
  minTemp,
  maxTemp,
  scaleMin,
  scaleMax,
  unit,
}) {
  const iconUrl = `/${icon}.png`
  const thermometerStyles = getThermometerStyles(minTemp, maxTemp, scaleMin, scaleMax)

  const convertTemp = (tempCelsius) => {
    if (unit === 'F') {
      return Math.round((tempCelsius * 9) / 5 + 32)
    }
    return Math.round(tempCelsius)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.conditionWrapper}>
        <p className={styles.day}>{day}</p>
        <div className={styles.condition}>
          <img className={styles.icon} src={iconUrl} alt={description} />
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      <div className={styles.temperatureWrapper}>
        <p className={styles.temperature}>
          {convertTemp(minTemp)}°{unit}
        </p>
        <div className={styles.thermometerWrapper}>
          <div className={styles.thermometerBar} style={thermometerStyles} />
        </div>
        <p className={styles.temperature}>
          {convertTemp(maxTemp)}°{unit}
        </p>
      </div>
    </div>
  )
}

export default WeeklyForecastCard
