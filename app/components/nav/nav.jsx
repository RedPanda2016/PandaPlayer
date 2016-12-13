import SignIn from '../sign-in/sign_in.jsx'
import SignUp from '../sign-up/sign_up.jsx'

export default class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    };
  }

  loginUser() {
    const newState = {
      name: new SignIn()
    };
    this.setState(newState);
  }

  signUp() {
    const newState = {
      name: new SignUp()
    };
    this.setState(newState);
  }

  render () {
    return(
      <div id="nav">
        <h1>Red Panda Player</h1>
        <div id="auth">
          <button className="login" onClick={this.loginUser.bind(this)}>LogIn</button>
          <button className="logout" onClick={this.signUp.bind(this)}>Sign Up</button>
        </div>
      </div>
    )
  }
}