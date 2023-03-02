import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import "./login.scss";
import { auth, db } from "../../firebase";

import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction } from "../../store/authReducer";

function Login({ type }) {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispath = useDispatch();
  //   const data = useSelector(state => state.authReducer.user )
  const loginSend = async (email) => {
    await updateDoc(doc(db, "user", `${email}`), {
      logIn: arrayUnion(Timestamp.fromDate(new Date())),
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = {
          ...userCredential.user.providerData[0],
          ...userCredential.user.metadata,
        };

        dispath(loginAction(user));

        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
        loginSend(email);
      })
      .catch((error) => {
        setError(true);
      });
  };

  const createAccount = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        //  console.log("lol");
        //  console.log(userCredential);
        const user = userCredential.user.providerData[0];
        dispath(loginAction(user));
        console.log(user.providerData[0]);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <div className="login">
      <form onSubmit={type === "create" ? createAccount : handleLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <span>Wrong email or password</span>}
      </form>
    </div>
  );
}

export default Login;
