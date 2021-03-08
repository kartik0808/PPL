import React from "react";
import Routes from "./Routes/Routes";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import history from "./History/history";
import apiCaller from "./utils/apicaller";
import {storeUserInfo} from "./Action/action"
import {useDispatch} from "react-redux"

function App() {

  const dispatch = useDispatch()

  if (localStorage.getItem("token")) {
    async function getData() {
      const res = await apiCaller({
        url: "userdata",
        method: "GET",
      });
      dispatch(storeUserInfo(res.data.userData))
    }
    getData();
  }

  return (
    <div>
      <Header />
      <Routes />
      <Footer />
    </div>
  );
}

export default App;
