import { useDispatch, useSelector } from 'react-redux'
import { setTemperatureUnit } from '../../redux/weatherSlice'
import styles from './TemperatureToggle.module.css'

function TemperatureToggle() {
  const dispatch = useDispatch()
  const unit = useSelector((state) => state.weather.temperatureUnit)

  const handleToggle = (newUnit) => {
    dispatch(setTemperatureUnit(newUnit))
  }

  return (
    <div className={styles.toggle}>
      <button
        className={`${styles.button} ${unit === 'C' ? styles.active : ''}`}
        onClick={() => handleToggle('C')}
      >
        °C
      </button>
      <button
        className={`${styles.button} ${unit === 'F' ? styles.active : ''}`}
        onClick={() => handleToggle('F')}
      >
        °F
      </button>
    </div>
  )
}

export default TemperatureToggle
