export default class VideoQueueEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    }
  }

  render() {
    return (
      <div className="video-queue-entry">
        <div className="media-left media-middle">
          <img className="media-object" src={video.snippet.thumbnails.default.url} alt="" />
        </div>
        <div className="media-body">
          <div
            className="video-queue-entry-title"
            onClick={() => handleVideoQueueEntryTitleClick(video)}
          >
            {video.snippet.title}
          </div>
          <div className="video-list-entry-detail">{video.snippet.description}</div>
        </div>
      </div>
    );
  }
};

