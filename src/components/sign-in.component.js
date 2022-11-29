import React, { useState } from "react";

import { signInAuthUserWithEmailAndPassword } from "./firebase";

const defaultFields = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFields);
  const { email, password } = useState(formFields);

  const resetFields = () => {
    setFormFields(defaultFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

      resetFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect password");
          break;
        case "auth/user-not-found":
          alert("User not found, make sure your email is correct");
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div class="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in using your email and password</span>
      <form
        style={{ justifyContent: "center", alignItems: "center" }}
        onSubmit={handleSubmit}
      >
        <div
          style={{
            height: "10%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            placeholder="Email"
            class="form-control"
            type="text"
            place
            label="Email"
            required
            onChange={handleChange}
            name="email"
            value={email}
          />
        </div>

        <div
          style={{
            height: "10%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            placeholder="Password"
            class="form-control"
            type="password"
            label="Password"
            required
            onChange={handleChange}
            name="password"
            value={password}
          />
        </div>
        <button class="button" type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
