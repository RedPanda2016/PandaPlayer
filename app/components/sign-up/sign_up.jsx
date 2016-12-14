export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    console.log('signUp');
    this.state = {
      show: false
    };
  }

  toggleSignUp = () => {
    if(!this.state.show) {
      this.setState({show: true});
    } else {
      this.setState({show: false});
    }
  }
  // sign up form...notice handleChange, this is updating the state of that inputs name as they are being filled in. When the user clicks 'submit' all that data is sent to the server for authentication.
  render () {
    return(
      <div className="sign-up-form">
        <input type="button" value="Sign Up" className="sign-up-button" onClick={this.toggleSignUp}/>
        {this.state.show ? <form id="sign-up-dropdown" onSubmit={this.props.signUp}>
          User Name: <input type="text" className="sign-up" name="username" placeholder="BobJones123!" onChange={this.props.handleChange} />
          First Name: <input type="text" className="sign-up" name="firstname" placeholder="Bob" onChange={this.props.handleChange} />
          Last Name: <input type="text" className="sign-up" name="lastname" placeholder="Jones" onChange={this.props.handleChange} />
          email: <input type="text" className="sign-up" name="email" placeholder="bob@whatever.com" onChange={this.props.handleChange} />
          Password: <input type="password" className="sign-up" name="password" placeholder="regist123" onChange={this.props.handleChange} />
          <input type="submit" value="Submit" />
        </form> : null}
      </div>
    )
  }
}
