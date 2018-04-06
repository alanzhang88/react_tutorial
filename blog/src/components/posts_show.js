import React, { Component } from 'react';
import {fetchPost, deletePost} from '../actions/index';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

class PostsShow extends Component {
  componentDidMount(){
    const id = this.props.match.params.id; //provided by route to access params in url
    this.props.fetchPost(id);
  }

  onDeleteClick(){
    const id = this.props.match.params.id;
    this.props.deletePost(id, ()=>{this.props.history.push("/")});
  }

  render(){
    const {post} = this.props;

    if(!post){
      return (<div>Loading...</div>);
    }
    return (
      <div>
        <Link to="/" className="btn btn-primary">Back</Link>
        <button className="btn btn-danger pull-xs-right" onClick={this.onDeleteClick.bind(this)}>Delete</button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

//ownProps is the props that will passed to the component as argument
function mapStateToProps({posts}, ownProps){
  return {post: posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps,{fetchPost,deletePost})(PostsShow)
