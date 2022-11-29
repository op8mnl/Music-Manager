import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";

import { UserProvider } from "./components/user";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivacyPolicy from "./components/privacypolicy";
import AUP from "./components/aup";
import DMCAPolicy from "./components/dmcapolicy";
import Authentication from "./components/authentication";
import AdminPage from "./components/admin";
import Start from "./components/start";
import Public from "./components/publicPlaylists";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/home" element={<App />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/aup" element={<AUP />} />
        <Route path="/dmcapolicy" element={<DMCAPolicy />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/public" element={<Public />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/" element={<Start />} />
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Routing>
      <UserProvider />
    </Routing>
  </React.StrictMode>
);
