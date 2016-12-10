import ReactPlayer from 'react-player'
import Duration from './duration.jsx'

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      loggedIn: false,
      playing: false,
      loaded: false
    }
  }

  playPause() {
    this.setState({ playing: !this.state.playing })
  }

  stop() {
    this.setState({ url: null, playing: false })
  }
  setVolume(e) {
    this.setState({ volume: parseFloat(e.target.value) })
  }
  onSeekMouseDown() {
    this.setState({ seeking: true })
  }
  onSeekChange(e) {
    this.setState({ played: parseFloat(e.target.value) })
  }
  onSeekMouseUp(e) {
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(e.target.value))
  }
  onClickFullscreen() {
    screenfull.request(findDOMNode(this.player))
  }


  render() {
    const {
      volume, playing, url,
      played,duration,
      soundcloudConfig,
      vimeoConfig,
      youtubeConfig,
      fileConfig
    } = this.state;

    return (
      <div>
        <ReactPlayer
          ref={player => { this.player = player }}
          className='react-player'
          width={480}
          height={270}
          url={this.state.url}
          playing={this.state.playing}
          volume={volume}
          youtubeConfig={youtubeConfig}
          soundcloudConfig={soundcloudConfig}
          vimeoConfig={vimeoConfig}
          fileConfig={fileConfig}
          onReady={() => console.log('video is ready')}
          onError={e => console.log('onError', e)}
          onEnded={() => this.setState({playing: false})}
        />
        <table><tbody>
        <tr>
          <th>Controls</th>
          <td>
            <button onClick={this.stop}>Stop</button>
            <button onClick={this.playPause}>{playing ? 'Pause' : 'Play'}</button>
            <button onClick={this.onClickFullscreen}>Fullscreen</button>
          </td>
        </tr>
        <tr>
          <th>Seek</th>
          <td>
            <input
              type='range' min={0} max={1} step='any'
              value={played}
              onMouseDown={this.onSeekMouseDown}
              onChange={this.onSeekChange}
              onMouseUp={this.onSeekMouseUp}
            />
          </td>
        </tr>
        <tr>
          <th>Volume</th>
          <td>
            <input type='range' min={0} max={1} step='any' value={volume} onChange={this.setVolume} />
          </td>
        </tr>
        <tr>
          <th>Played</th>
          <td><progress max={1} value={played} /></td>
        </tr>
        </tbody></table>
        <h5>Custom URL</h5>
        <div>
          <input ref={input => { this.urlInput = input }} type='text' placeholder='Enter URL' />
          <button onClick={() => this.setState({ url: this.urlInput.value })}>Load</button>
        </div>
        <table><tbody>
        <tr>
          <th>url</th>
          <td className={!url ? 'faded' : ''}>{url || 'null'}</td>
        </tr>
        <tr>
          <th>playing</th>
          <td>{playing ? 'true' : 'false'}</td>
        </tr>
        <tr>
          <th>duration</th>
          <td><Duration seconds={duration} /></td>
        </tr>
        <tr>
          <th>elapsed</th>
          <td><Duration seconds={duration * played} /></td>
        </tr>
        <tr>
          <th>remaining</th>
          <td><Duration seconds={duration * (1 - played)} /></td>
        </tr>
        </tbody></table>
      </div>
    );
  }
}

