import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import AUP from './src/AUP'
import PrivacyPolicy from './src/privacypolicy'
import DMCAPolicy from './src/DMCAPolicy'

const Routing = () => {
  return(
    <Router>
      <Header/>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/privacypolicy" component={PrivacyPolicy} />
        <Route path="/aup" component={AUP} />
        <Route path="/dmcapolicy" component={DMCAPolicy} />
      </Switch>
      <Footer/>
    </Router>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
  document.getElementById('root')
);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );