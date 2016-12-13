export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    console.log('signIn')
  }
  // sign in form...notice handleChange, this is updating the state of that inputs name as they are being filled in. When the user clicks 'submit' all that data is sent to the server for authentication.
  render () {
    return(
     <form onSubmit={this.props.signIn}>
        User Name: <input type="text" name="username" placeholder="BobJones123!" onChange={this.props.handleChange} />
        Password: <input type="password" name="password" placeholder="regist123" onChange={this.props.handleChange} />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}


