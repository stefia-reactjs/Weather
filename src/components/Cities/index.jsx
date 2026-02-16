import { useSelector } from 'react-redux'
import CityCard from '../CityCard'
import styles from './Cities.module.css'

export default function Cities({ cities, data, loading, error }) {
  const temperatureUnit = useSelector((state) => state.weather.temperatureUnit)

  const safeCities = Array.isArray(cities) ? cities : []
  const safeData = data && typeof data === 'object' ? data : {}

  if (loading) return <p>Загрузка городов...</p>
  if (error) return <p>Ошибка загрузки городов</p>
  if (safeCities.length === 0) return <p>Города не найдены</p>

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Other cities</p>

      <div className={styles.cities}>
        {safeCities.map((city) => {
          const forecast = safeData[city]
          const item = forecast?.list?.[0]

          if (!item) return null

          return (
            <CityCard
              key={city}
              city={city}
              country={forecast?.city?.country}
              icon={item?.weather?.[0]?.icon}
              temp={item?.main?.temp}
              condition={item?.weather?.[0]?.description}
              unit={temperatureUnit}
            />
          )
        })}
      </div>
    </div>
  )
}
