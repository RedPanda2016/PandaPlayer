import React from 'react';


export default class usersList extends React.Component {
  render() {
    return (
      <div className='users'>
        <h3> Users </h3>
        <ul>
          {
            this.props.users.map((user, i) => {
              return (
                <li key={i}>
                  {user}
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
};

