import VideoPlayer from './videoPlayer/videoPlayer.jsx'
import chatRoom from './chat/chatRoom.jsx'
import Nav from './nav/nav.jsx'
import MessageList from './chat/messages.jsx'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      chatRoom: 'lobby',
      currentChatRoom: null,
      currentVideo: null,
      url: '',
      playing: false,
      messages: []
    }

  }

  messageSubmitHandler(message) {
    console.log('message fired off', message);
    socket.emit('messageSent',{message})
    }

  usernameSubmitHandler(name) {
    console.log('this is my name!', name)
    console.log(name);
    this.setState({ submitted: true, username: name}) ;
  }

  messageReceiveHandler(message) {
      console.log('messagereceiveHandler FIRED!', message);
      var {messages}= this.state;
      messages.push(message);
      this.setState({messages});
      console.log(this.state.messages);
  }

//for <form> this is login section

  componentDidMount() {

    var self = this;
    socket.emit('join');

    socket.on('loadUrl', function(data){
          console.log('url loaded on clientside');
          self.setState({ url : data });
      });

    socket.on('startVideo', function(){
      console.log('video started on clientside');
      self.setState({ playing: !self.state.playing });
    });

    socket.on('postMessage', function(data){
        console.log('this is the message received from server', data.message);
        self.messageReceiveHandler(data.message);
    })

  }

  emitPlayPause = () => {
      socket.emit('playPause');
      console.log('playPause emitted from client-side!')
  }

  emitLoadUrl = (url) => {
    console.log('clientemit triggered');
    socket.emit('URL', {url});
        console.log(url);
  }

  emitRoomName = (room) => {
    console.log('room name emit triggered');
    socket.emit('createRoom', {room});
    console.log('this is the room', room)
  }



  render () {

    return (

        <div>
          <h1>Well this part works</h1>
          <Nav />
          <div id="mainWindow">
            <VideoPlayer video={this.state.currentVideo}  emitPlayPause={this.emitPlayPause} loadUrl={this.loadUrl} emitLoadUrl={this.emitLoadUrl} playing={this.state.playing} currentVideo={this.state.url} />
          </div>
            <div>
            <h1>Chat Room</h1>


                <input ref={input => { this.username = input }} type='text' size='50' placeholder='who are you?' />
                <button onClick={() => this.usernameSubmitHandler(this.username.value)}>Here I Am!</button>


                <input ref={input => { this.message = input }} type='text' size='50' placeholder='what do you want to say?' />
                <button onClick={() => this.messageSubmitHandler(this.message.value)}>This is what I want to say!</button>

                <input ref={input => { this.roomName = input }} type='text' size='50' placeholder='create a chatroom' />
                <button onClick={() => this.emitRoomName(this.roomName.value)}>Submit Room Name</button>

                <MessageList messages={this.state.messages} username={this.state.username}/>

            </div>

        </div>

    )
  }
}