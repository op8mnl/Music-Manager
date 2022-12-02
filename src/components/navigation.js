import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import { UserContext } from "./user";

import { signOutUser } from "./firebase";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  return <Fragment></Fragment>;
};
