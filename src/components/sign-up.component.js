import React, { useState } from "../react";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, email, password, confirmPassword } = formFields;

  const resetFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { name });
      resetFields();
    } catch (error) {
      if (error.code == "auth/email-already-in-use") {
        alert("This email is already in use");
      } else {
        console.log("An error occurred while creating the user", error);
      }
    }
  };

  const handleChange = (event) => {
    const { displayName, value } = event.target;

    setFormFields({ ...formFields, [displayName]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Not Signed Up Yet?</h2>
      <span>Sign Up with your Email and Password</span>
      <form onSubmit={handleSubmit}></form>
      <input
        type="text"
        label="Name"
        required
        onChange={handleChange}
        name="displayName"
        value={displayName}
      />
    </div>
  );
};
