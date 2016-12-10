import VideoPlayer from './videoPlayer/videoPlayer.jsx'

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
          <VideoPlayer video={this.state.currentVideo} />
        </div>
      </div>
    )
  }
}