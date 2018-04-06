import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import _ from 'lodash';

const API_KEY = 'AIzaSyDAmYWi6Nd14N5_A9xYv8pC33gxIvI0VNw';



//React the most parent component should be responsible to fetch data which might be shared between descendant

//a new component that creates some HTML
//JSX, using javascript to generate html code
// const App = () => {
//   return (
//     <div>
//       <div>Hi!</div>
//       <SearchBar />
//     </div>
//   );
// }

class App extends Component{
  constructor(props){
    super(props);

    this.state = { videos: [], selectedVideo: null };
    this.videoSearch('pubg');

  }

  videoSearch(term){
    YTSearch({key: API_KEY, term: term}, (videos)=>{
      // console.log(data);
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render(){
    const videoSearch = _.debounce((term)=>{this.videoSearch(term)}, 300);
    return (
        <div>
          <SearchBar onSearchTermChange={videoSearch}/>
          <VideoDetail video={this.state.selectedVideo}/>
          <VideoList onVideoSelect={selectedVideo => this.setState({selectedVideo})} videos={this.state.videos} />  {/* passing information as props, arrives as props in the function component, for class component, can be access anywhere as this.props */}
        </div>
      );
  }
}

//Need to create a class instantionation <App /> just equal to App() in JSX
ReactDOM.render(<App />, document.querySelector('.container'));
//the second arg is to tell which parent element we want to attach
