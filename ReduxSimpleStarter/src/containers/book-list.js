import React, {Component} from 'react';

//a container can access states from redux
import { connect } from 'react-redux';
import { selectBook } from '../actions/index';
import { bindActionCreators } from 'redux';

class BookList extends Component {
  renderList(){
    return this.props.books.map((book)=>{
      return (
        <li className="list-group-item" key={book.title} onClick={()=>{this.props.selectBook(book)}}>
          {book.title}
        </li>
      );
    });
  }

  render(){
    return (
      <ul className="list-group col-sm-4">
        {this.renderList()}
      </ul>
    );
  }
}

function mapStateToProps(state){
  // whatever returned from here will show up as props inside of BookList
  return {
    books: state.books //props.books will be state.books
  };
}

//Anything return from this function will end up as props on the booklist, props.selectBook is selectBook function imported
function mapDispatchToProps(dispatch){
  return bindActionCreators({selectBook: selectBook}, dispatch); //take what return from selectBook and let it flow through reducers
}

//promote booklist from a container - it needs to know about this new dispatch method
//selectBook. Make it available as props
export default connect(mapStateToProps, mapDispatchToProps)(BookList);
