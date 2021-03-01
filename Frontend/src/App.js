import React from 'react';
import Routes from './Routes/Routes'
import Header from './Components/Header'
import Footer from './Components/Footer'
import history from './History/history'

function App(){

  if (
    (window.location.pathname === '/timeline') &&
    !localStorage.getItem("email")
  ) {
    history.push("/");
  }

  return(
      <div>
        <Header/>
        <Routes/>
        <Footer/>
      </div>
    );
}

export default App;
