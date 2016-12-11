export default class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    };
  };

  loginUser = () => {
    swal("Here's a message!", "It's pretty, isn't it?");
  };

  signUp = () => {
    swal("Here's another message!");
  };

  render () {
    return(
      <div id="nav">
        <h1>Red Panda Player</h1>
        <button className="login" onClick={this.loginUser.bind(this)}>Login</button>
        <button className="logout" onClick={this.signUp.bind(this)}>Sign Up</button>
      </div>
    )
  }
}