import { FETCH_WEATHER } from '../actions/index';

export default function(state=[],action){
  switch(action.type){
    case FETCH_WEATHER:
      return state.concat([action.payload.data]); //important we always return a fresh instance of state
  }
  return state;
}
