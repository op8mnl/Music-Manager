import { fireDb } from "./firebase.js";
import { useState, useEffect } from "react";
import { collection, getDocs, QuerySnapshot } from "firebase/firestore";
import { Navigate } from "react-router-dom";

export const UsersController = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    await getDocs(collection(fireDb, "users")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(newData);
      console.log(users, newData);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);
};

export default UsersController;
