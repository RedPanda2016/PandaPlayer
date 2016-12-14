export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    console.log('signIn');
    this.state = {
      show: false
    };
  }
  toggleSignIn = () => {
    if(!this.state.show) {
      this.setState({show: true});
    } else {
      this.setState({show: false});
    }
  }
  // sign in form...notice handleChange, this is updating the state of that inputs name as they are being filled in. When the user clicks 'submit' all that data is sent to the server for authentication.
  render () {
    return(
      <div className="sign-in-form">
        <input type="button" className="sign-in-button" onClick={this.toggleSignIn} value="Login"/>
        {this.state.show ? <form id="sign-in-dropdown" onSubmit={this.props.signIn}>
          User Name: <input type="text" className="sign-in" name="username" placeholder="BobJones123!" onChange={this.props.handleChange} />
          Password: <input type="password" className="sign-in" name="password" placeholder="regist123" onChange={this.props.handleChange} />
          <input type="submit" value="Submit" />
        </form> : null }
      </div>
    )
  }
}


