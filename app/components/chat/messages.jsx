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
                              <strong>{message[1]} :</strong>
                              <span> {message[0]}</span>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}