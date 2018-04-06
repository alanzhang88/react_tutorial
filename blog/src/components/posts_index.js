import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; //Just like anchor but navigate in SPA
import { fetchPosts } from '../actions/index';
import _ from 'lodash';

class PostsIndex extends Component {

  //react life cyle this function will be called after component has shown on the screen
  componentDidMount(){
    this.props.fetchPosts();
  }

  renderPosts(){
    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>
      );
    });
  }

  render(){

    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {posts: state.posts};
}

//equal to create a mapDispatchToProps with bindActionCreators({fetchPosts},dispatch)
export default connect(mapStateToProps,{ fetchPosts })(PostsIndex);
