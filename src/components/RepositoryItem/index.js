// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {gitDetails} = props
  const {name, issueCount, forksCount, starsCount, avatarUrl} = gitDetails

  return (
    <li className="repo-container">
      <img src={avatarUrl} alt={name} className="avatar" />
      <h1 className="list-head">{name}</h1>
      <div className="total">
        <div className="stars-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="star"
          />
          <p className="star-count">{starsCount} stars</p>
        </div>
        <div className="stars-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="star"
          />
          <p className="star-count">{forksCount} forks</p>
        </div>
        <div className="stars-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="star"
          />
          <p className="star-count">{issueCount} open issues</p>
        </div>
      </div>
    </li>
  )
}
export default RepositoryItem
