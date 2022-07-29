import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import './App.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class App extends Component {
  state = {
    newPasswordList: [],
    website: '',
    username: '',
    password: '',
    isShow: false,
    isTrue: false,
  }

  onChangeWebsiteName = event => {
    this.setState({website: event.target.value})
  }

  onChangeName = event => {
    this.setState({username: event.target.value})
  }

  onClickPassword = event => {
    this.setState({password: event.target.value})
  }

  addContent = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const colorClassValue =
      initialContainerBackgroundClassNames[Math.floor(Math.random() * 7)]
    const newValues = {
      id: uuidv4(),
      initialValue: initial,
      websiteName: website,
      userName: username,
      Password: password,
      classAdd: colorClassValue,
    }
    this.setState(prevState => ({
      newPasswordList: [...prevState.newPasswordList, newValues],
      website: '',
      username: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  onChangeSearchList = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteItem = id => {
    const {newPasswordList} = this.state
    const finalPasswordList = newPasswordList.filter(
      eachValue => eachValue.id !== id,
    )
    const hasItemInList = finalPasswordList.length !== 0
    this.setState({newPasswordList: finalPasswordList, isTrue: hasItemInList})
  }

  render() {
    const {
      newPasswordList,
      website,
      username,
      password,
      isShow,
      searchInput,
    } = this.state
    let {isTrue} = this.state

    const newList = newPasswordList.filter(eachValue =>
      eachValue.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="add-details-image-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-manager-sm"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-manager-lg"
          />

          <form className="add-details-container" onSubmit={this.addContent}>
            <h1 className="add-password-heading">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="website-logo"
              />
              <input
                type="text"
                className="input"
                placeholder="Enter Website"
                onChange={this.onChangeWebsiteName}
                value={website}
              />
            </div>

            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="website-logo"
              />
              <input
                type="text"
                className="input"
                placeholder="Enter Username"
                onChange={this.onChangeName}
                value={username}
              />
            </div>

            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="website-logo"
              />
              <input
                type="password"
                className="input"
                placeholder="Enter Password"
                onChange={this.onClickPassword}
                value={password}
              />
            </div>
            <button className="add-btn" type="submit">
              Add
            </button>
          </form>
        </div>
        <div className="add-passwords-list-container">
          <div className="password-count-search-container">
            <div className="password-count-container">
              <h1 className="your-passwords">Your Passwords</h1>
              <p className="count-password">{newPasswordList.length}</p>
            </div>

            <div className="search-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                className="search-input"
                alt="search"
              />
              <input
                type="search"
                className="input-element"
                placeholder="Search"
                onChange={this.onChangeSearchList}
                value={searchInput}
              />
            </div>
          </div>
          <hr />
          <div className="show-passwords-container">
            <input
              type="checkbox"
              className="check-box"
              id="check"
              onChange={this.showPassword}
            />
            <label htmlFor="check" className="label-password">
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className="empty-list-Container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                className="no-pswd-image"
                alt="no passwords"
              />
              <p className="no-passwords">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="passwords-list-container">
              {newList.map(eachList => (
                <li className="list-item" id={eachList.id} key={eachList.id}>
                  <p className={`initial ${eachList.classAdd}`}>
                    {eachList.initialValue}
                  </p>
                  <div className="list-content">
                    <p className="website-name">{eachList.websiteName}</p>
                    <p className="name">{eachList.userName}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        className="stars-image"
                        alt="stars"
                      />
                    )}
                    {isShow && <p className="name">{eachList.Password}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={() => this.deleteItem(eachList.id)}
                    testid="delete"
                    className="delete-btn"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="delete-image"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
