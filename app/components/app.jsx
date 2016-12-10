import VideoPlayer from './videoPlayer/videoPlayer.jsx'
import Nav from './nav/nav.jsx'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: 'admin',
      currentVideo: null
    }
  }

  render () {
    return (
      <div>
        <div>
          <h1>Well this part works</h1>
          <Nav />
          <div id="mainWindow">
            <VideoPlayer video={this.state.currentVideo} />
          </div>
        </div>
      </div>
    )
  }
}