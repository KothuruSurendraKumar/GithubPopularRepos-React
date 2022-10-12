import {Component} from 'react'
import Loader from 'react-loader-spinner'
import RepositoryItem from '../RepositoryItem'
import LanguageFilterItem from '../LanguageFilterItem'
import './index.css'

const apiResponse = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  isLoading: 'IS_LOADING',
  intial: 'INTIAL',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiResponse.intial,
    gitData: [],
    activeId: 'ALL',
  }

  componentDidMount() {
    this.getData()
  }

  changeActiveId = id => {
    this.setState({activeId: id}, this.getData)
  }

  getData = async () => {
    this.setState({apiStatus: apiResponse.isLoading})
    const {activeId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeId}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchData = await response.json()
      const updatedData = fetchData.popular_repos.map(eachItem => ({
        name: eachItem.name,
        id: eachItem.id,
        issueCount: eachItem.issues_count,
        forksCount: eachItem.forks_count,
        starsCount: eachItem.stars_count,
        avatarUrl: eachItem.avatar_url,
      }))
      this.setState({gitData: updatedData, apiStatus: apiResponse.success})
    } else if (response.status === 401) {
      this.setState({apiStatus: apiResponse.failure})
    }
  }

  renderPrimeDeals = () => {
    const {gitData} = this.state

    return (
      <ul className="list-container">
        {gitData.map(eachItem => (
          <RepositoryItem gitDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      alt="failure view"
      className="register-prime-image"
    />
  )

  renderLoadingView = () => (
    <div>
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderViewContainer = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiResponse.success:
        return this.renderPrimeDeals()
      case apiResponse.isLoading:
        return this.renderLoadingView()
      case apiResponse.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {activeId} = this.state
    return (
      <div className="app-container">
        <h1 className="header">Popular</h1>
        <ul className="language-list-container">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              key={eachItem.id}
              changeActiveId={this.changeActiveId}
              activeId={activeId}
              filterDetails={eachItem}
            />
          ))}
        </ul>
        {this.renderViewContainer()}
      </div>
    )
  }
}
export default GithubPopularRepos
