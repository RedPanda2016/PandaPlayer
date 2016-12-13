export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    console.log('signIn')
  }

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


