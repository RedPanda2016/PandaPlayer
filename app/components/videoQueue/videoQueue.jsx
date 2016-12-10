export default class VideoQueue extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    }
  }


  render() {
    return (
      <div className="video-Queue media">
        {videos.map((video) =>
          <VideoQueuEntry
            key={video.etag}
            video={video}
            handleVideoQueueEntryTitleClick={handleVideoQueueEntryTitleClick}
          />
        )}
      </div>
    );
  }
}