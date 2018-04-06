import React from 'react';
import VideoListItem from './video_list_item';

//className instead of class to add css class in JSX

const VideoList = (props) => {
  const videoItems = props.videos.map((video)=>{
    return <VideoListItem key={video.etag} video={video} onVideoSelect={props.onVideoSelect} />
  });
  //give each element a uniq key so that we can access the specific element given the key
  return (
    <ul className="col-md-4 list-group">
      { videoItems }
    </ul>
  );
}

export default VideoList;
