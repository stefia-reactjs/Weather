import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import debounce from 'lodash.debounce'
import { setCity } from '../../redux/weatherSlice'
import searchIcon from '../../assets/Search.svg'
import styles from './SearchCity.module.css'

export default function SearchCity() {
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()

  const debouncedSetCity = useMemo(
    () =>
      debounce((term) => {
        const t = term.trim()
        if (!t) return
        dispatch(setCity(t))
      }, 2000),
    [dispatch],
  )

  useEffect(() => {
    debouncedSetCity(searchTerm)
    return () => debouncedSetCity.cancel()
  }, [searchTerm, debouncedSetCity])

  return (
    <div className={styles.wrapper}>
      <img className={styles.icon} src={searchIcon} alt="Search" />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search city..."
      />
    </div>
  )
}
