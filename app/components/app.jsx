import VideoPlayer from './videoPlayer/videoPlayer.jsx'
import Nav from './nav/nav.jsx'
import ReactPlayer from 'react-player'

var socket = io.connect();

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      playing: false
    }
  }

  componentDidMount() {
    socket.on('startVideo', this.playPause);
    socket.on('loadUrl', this.loadUrl(url));
  }

  emitPlayPause = () => {
    socket.emit('playPause');
    console.log('playPause emitted from client-side!')
  }
  playPause = () => {
    this.setState({ playing: !this.state.playing })
  }

  emitLoadUrl = (url) => {
    socket.emit('URL', url);
    console.log('url emitted from client-side!')
  }
  loadUrl = (url) => {
    this.setState({ url : url });
  }

  render () {

    return (
      <div>
        <div>
          <Nav />
          <div id="mainWindow">
            <VideoPlayer video={this.state.currentVideo}  emitPlayPause={this.emitPlayPause} emitLoadUrl={this.emitLoadUrl} playing={this.state.playing} currentVideo={this.state.url} />
          </div>
        </div>
      </div>
    )
  }
}