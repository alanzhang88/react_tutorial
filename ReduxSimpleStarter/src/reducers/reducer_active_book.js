//state argument is not application state, only the state this reducer is responsible for
//default the state to null if it is undefined
export default function(state = null ,action){
  switch(action.type){
    case 'BOOK_SELECTED':
      return action.payload; //always return a fresh object
  }
  return state;
}
