export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    }
  }

  render () {
    return(
      <div id="nav">
        <h1>Red Panda Player</h1>
        <div className="login"></div>
        <div className="logout"></div>
      </div>
    )
  }
}