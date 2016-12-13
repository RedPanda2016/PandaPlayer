export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    console.log('signUp')
  }

  render () {

    return(
      <form onSubmit={this.props.signUp}>
        User Name: <input type="text" name="username" placeholder="BobJones123!" onChange={this.props.handleChange} />
        First Name: <input type="text" name="firstname" placeholder="Bob" onChange={this.props.handleChange} />
        Last Name: <input type="text" name="lastname" placeholder="Jones" onChange={this.props.handleChange} />
        email: <input type="text" name="email" placeholder="bob@whatever.com" onChange={this.props.handleChange} />
        Password: <input type="password" name="password" placeholder="regist123" onChange={this.props.handleChange} />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
