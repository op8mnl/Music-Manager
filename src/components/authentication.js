import SignIn from "./sign-in.component";
import SignUp from "./sign-up.component";

const Authentication = () => {
  return (
    <>
      <body>
        <div class="accent">
          <a href="/">
            <div class="title">SE3316 Lab 4</div>
          </a>
        </div>
        <div class="box">
          <div
            class="start-box"
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <div class="authentication-container">
              <SignIn />
              <SignUp />
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default Authentication;
