import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PrivacyPolicy from './privacypolicy';
import AUP from './aup';
import DMCAPolicy from './dmcapolicy';

const Routing = () => {
  return(
    <Router>
      <Routes>
        <Route exact path="/" element={<App/>}/>
        <Route path="/privacypolicy" element={<PrivacyPolicy/>} />
        <Route path="/aup" element={<AUP/>} />
        <Route path="/dmcapolicy" element={<DMCAPolicy/>} />
      </Routes>
    </Router>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,

);