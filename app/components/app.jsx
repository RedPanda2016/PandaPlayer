import VideoPlayer from './videoPlayer/videoPlayer.jsx'
import Nav from './nav/nav.jsx'


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      playing: false
    }
  }

  componentDidMount() {

    var self = this;
    socket.emit('test');

    socket.on('loadUrl', function(data){
          console.log('url loaded on clientside');
          self.setState({ url : data });
      });

    socket.on('startVideo', function(){
      console.log('video started on clientside');
      self.setState({ playing: !self.state.playing });
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
    
  render () {

    return (
      <div>
        <div>
          <Nav />
          <div id="mainWindow">
            <VideoPlayer video={this.state.currentVideo}  emitPlayPause={this.emitPlayPause} loadUrl={this.loadUrl} emitLoadUrl={this.emitLoadUrl} playing={this.state.playing} currentVideo={this.state.url} />
          </div>
        </div>
      </div>
    )
  }
}