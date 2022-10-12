// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {changeActiveId, filterDetails, activeId} = props
  const {id, language} = filterDetails
  const isActive = id === activeId
  const activeClassName = isActive ? 'active-text' : 'text'
  const onClickFilter = () => {
    changeActiveId(id)
  }
  return (
    <li className="filter-container">
      <button type="button" onClick={onClickFilter} className={activeClassName}>
        <p className="filter-header">{language}</p>
      </button>
    </li>
  )
}
export default LanguageFilterItem
