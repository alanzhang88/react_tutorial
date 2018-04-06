import React, { Component } from 'react';

//functional component some info goes in and some html comes out
// const SearchBar = () => {
//   return (<input />);
// }

//class component that can perform more operations
//class has state to memorize information
class SearchBar extends Component{
  constructor(props){
    super(props);
    this.state = { term: '' }; //only place to directly manipulate state, other functions use this.setState to change
  }

  render(){
    return (
      <div className="search-bar">
        <input onChange={this.onInputChange} value={this.state.term}/>
      </div>
    );
  }//ok to reference it by direct access, but change need to go through setState

  onInputChange = (event) => {
    // console.log(event.target.value);
    //need to use arrow in order to use this, or we can use bind in onChange={this.onInputChange.bind(this)}
    this.setState({ term: event.target.value });//this method will inform react state changes
    this.props.onSearchTermChange(this.state.term);
  }
}

//<input value={this.state.term} /> controlled element, the value will change only on change of state(i.e. setState is called)
//each class has some states, state changes will cause the component and its descendant to rerender
export default SearchBar;
