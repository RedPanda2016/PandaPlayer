import React from 'react';

export default class MessageList extends React.Component {


    render() {

        //Loop through all the messages in the state and create a Message component
        return (
            <div className='messages'>
                <h2> Conversation: </h2>
                {
                    this.props.messages.map((message, i) => {
                        return (
                            <div className="message" key={i}>
                              <strong>{this.props.username} :</strong>
                              <span> {message}</span>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}