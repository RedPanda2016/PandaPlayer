import React from 'react';

export default class Messages extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username:'',
            text:''
        }
    }

  handleSubmit(e) {
    e.preventDefault();
    var message = {
      username : this.state.username,
      text : this.state.text
    }
    this.props.onMessageSubmit(message);
    this.setState({ text: '' });
  }

  changeHandler(e) {
    this.setState({ text : e.target.value });
  }

  render() {
    // Loop through all the messages in the state and create a Message component
    const messages = this.props.messages.map((message, i) => {
        return (
          <Message
            key={i}
            username={message.username}
            message={message.message}
          />
        );
      });

    return (
        <div>
          <div className='messages' id='messageList'>
            { messages }
          </div>
          <h3>Write New Message</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.changeHandler}
            value={this.state.text}
          />
        </form>
        </div>
    );
  }
}

Messages.defaultProps = {
  messages: []
};