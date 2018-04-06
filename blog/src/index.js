import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

// class Hello extends React.Component {
//   render(){ return (<div>Hello</div>);}
// }
//
// class Goodbye extends React.Component {
//   render(){ return (<div>Goodbye</div>);}
// }

// ReactDOM.render(
//   <Provider store={createStoreWithMiddleware(reducers)}>
//     <BrowserRouter>
//       <div>
//         we can hard code things here to always shown, Route will show or hide component based on the url
//         <Route path="/hello" component={Hello}/>
//         <Route path="/goodbye" component={Goodbye}/>
//       </div>
//   </BrowserRouter>
//   </Provider>
//   , document.querySelector('.container'));

//By default, routes does lazy prefix matching, thus it will render all components as long as prefix matches
//Switch will render the first that matches
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/posts/new" component={PostsNew} />
          <Route path="/posts/:id" component={PostsShow} />
          <Route path="/" component={PostsIndex} />
        </Switch>
    </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
