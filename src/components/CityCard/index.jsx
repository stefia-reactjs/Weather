import styles from './../CityCard/CityCard.module.css'

const CityCard = ({ city, temp, condition, country, icon, unit }) => {
  if (temp === null || condition === null) return <div>Loading {city}...</div>

  const iconUrl = `/${icon}.png`

  const convertTemp = (tempCelsius) => {
    if (unit === 'F') {
      return Math.round((tempCelsius * 9) / 5 + 32)
    }
    return Math.round(tempCelsius)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <p className={styles.country}>{country}</p>
        <p className={styles.city}>{city}</p>
        <p className={styles.condition}>{condition}</p>
      </div>
      <div className={styles.right}>
        <p className={styles.icon}>
          <img src={iconUrl} alt={condition} className={styles.iconImg} />
        </p>
        <p className={styles.temperature}>
          {convertTemp(temp)}°{unit}
        </p>
      </div>
    </div>
  )
}

export default CityCard
