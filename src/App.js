// import logo from "./logo.svg";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Main from "./pages/Main";
import Office from "./pages/Office";
import Login from "./pages/Login";

import Layout from "./components/Layout";
import Basket from "./pages/Basket";
import Produckt from "./pages/Produckt";
import "./App.scss";

function App() {
  const { user } = useSelector((state) => state.authReducer);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route
          path="/basket"
          element={!user ? <Navigate to="/" /> : <Basket />}
        />
        <Route
          path="/office"
          element={!user ? <Navigate to="/login" /> : <Office />}
        />
        <Route path="/:product" element={<Produckt />} />
        <Route path="*" element={<Main />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/create" element={<Login type="create" />} />
    </Routes>
  );
}

export default App;
