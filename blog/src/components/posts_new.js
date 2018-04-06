import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions/index';

class PostsNew extends Component {
  //field.input has a lot of event handler injected into input tag
  //field.meta.error is the error from errorrs obj that is consistent of the name of the fields
  //field.meta.touched is the touched attr from the input
  renderField(field){
    const className = `form-group ${field.meta.touched && field.meta.error? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}:</label>
        <input {...field.input} type="text" className="form-control" />
        <div className="text-help">{field.meta.touched ? field.meta.error: ''}</div>
      </div>
    );
  }

  onSubmit(values){
    // console.log(values);
    // this.props.history.push("/") can navigate to other page history is injected by Route tag
    this.props.createPost(values, ()=>{
      this.props.history.push("/")
    });

  }

  render(){
    const { handleSubmit } = this.props;
    //handleSubmit is injected by redux form that will first handle validation and states, if they are validate
    //it will call the callback passed into it
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field label="Title" name="title" component={this.renderField}/>
          <Field label="Categories" name="categories" component={this.renderField} />
          <Field label="Post Content" name="content" component={this.renderField} />
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/" className="btn btn-danger">Cancel</Link>
        </form>
      </div>
    );
  }
}

function validate(values){
  //values is obj {title: ...,categories:...,content:....}
  const errors = {};

  //validate inputs
  if (!values.title){
    errors.title = "Enter a title!";
  }
  if (!values.categories){
    errors.categories = "Enter some categories!";
  }
  if (!values.content){
    errors.content = "Enter some content!";
  }
  return errors; //empty obj means no errors
}

//name of the form make sure it is unique
export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null,{createPost})(PostsNew)
);
