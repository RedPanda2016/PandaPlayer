import React from 'react';
import io from 'socket.io-client';
//import server from '../../../server/server.js';
//var socket = io.connect();


export default class chatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      messages:[],
      text: ''
    };


    initialize = (data) => {
      var {users, name} = data;
      this.setState({users, user: name});
    };

    userJoined = (data) => {
      var {users, messages} = this.state;
      var {name} = data;
      users.push(name);
      messages.push({
        user: 'anonymous',
        text : name +' Joined'
      });
      this.setState({users, messages});
    };

    addMessage = (message) => {
      // Append the message to the component state
      const messages = this.state.messages;
      messages.push(message);
      this.setState({ messages });
    };
    // Connect to the server
    // this.socket = io(server.api, { query: `username=${props.username}` }).connect();

    // // Listen for messages from the server
    // this.socket.on('server:message', message => {
    //   this.addMessage(message);
    // });
    handleMessageSubmit = (message) => {
      var {messages} = this.state;
        messages.push(message);
        this.setState({messages});
        socket.emit('send:message', message);
    };

    sendHandler = (message) => {
      const messageObject = {
        username: this.props.username,
        message
      }

      // Emit the message to the server
      this.socket.emit('client:message', messageObject);

      //messageObject.fromMe = true;
      this.addMessage(messageObject);
    }
  }

  render() {
    return (
      <div>
        <UsersList
          users={this.state.users}
        />
        <MessageList
          messages={this.state.messages}
        />
      </div>
    );
  }



}

