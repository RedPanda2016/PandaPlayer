import ReactPlayer from 'react-player'
import Duration from './duration.jsx'

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userAdmin: true,
      url: '',
      loggedIn: false,
      loaded: false
    }
  }

  setVolume = e => {
    this.setState({ volume: parseFloat(e.target.value) })
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
          url={this.props.currentVideo}
          playing={this.props.playing}
          volume={volume}
          youtubeConfig={youtubeConfig}
          soundcloudConfig={soundcloudConfig}
          vimeoConfig={vimeoConfig}
          fileConfig={fileConfig}
          onReady={() => console.log('video is ready')}
          onError={e => console.log('onError', e)}
          onEnded={() => this.props.playPause()}
        />
        <span className="bold">Video URL  </span>
        <input ref={input => { this.urlInput = input }} type='text' size='50' placeholder='Enter URL' />
        <button onClick={() => this.props.emitLoadUrl(this.urlInput.value)}>Load</button>
        <table><tbody>
        <tr>
          <th>Controls</th>
          <td>
            <button onClick={this.props.emitPlayPause}>{this.props.playing ? 'Pause' : 'Play'}</button>
          </td>
          <th>Played</th>
          <td><progress max={1} value={played} /></td>
        </tr>
        <tr>
          <th>Volume</th>
          <td>
            <input type='range' min={0} max={1} step='any' value={volume} onChange={this.setVolume} />
          </td>
        </tr>
        </tbody></table>
      </div>
    );
  }
}

