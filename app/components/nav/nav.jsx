export default class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    };
  };

  loginUser = () => {
    swal({
      title: 'Welcome back! Please login!',
      input: 'userName',
      input: 'password',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: function (email) {
        return new Promise(function (resolve, reject) {
          setTimeout(function() {
            if (email === 'taken@example.com') {
              reject('This email is already taken.')
            } else {
              resolve()
            }
          }, 2000)
        })
      },
      allowOutsideClick: false
    }).then(function (email) {
      swal({
        type: 'success',
        title: 'Ajax request finished!',
        html: 'Submitted email: ' + email
      })
    })
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