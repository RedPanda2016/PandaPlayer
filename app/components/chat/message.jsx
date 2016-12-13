import React from 'react';

export default class Message extends React.Component {
  render() {


    return (
      <div className='message'>
        <div className='username'>
          { this.props.username }
        </div>
        <div className='message-body'>
          { this.props.state.messages }
        </div>
      </div>
    );
  }
}

Message.defaultProps = {
  message: '',
  username: ''
};