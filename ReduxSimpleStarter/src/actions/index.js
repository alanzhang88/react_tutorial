
//needs to return an action--an object with a type property
export function selectBook(book){
  // console.log('A book has been selected: ', book);
  return {
    type: 'BOOK_SELECTED',
    payload: book
  };
}
