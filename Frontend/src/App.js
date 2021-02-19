import React from 'react';
import Routes from './Routes/Routes'
import Header from './Components/Header'
import Footer from './Components/Footer'

function App(){
    return(
      <div>
        <Header/>
        <Routes/>
        <Footer/>
      </div>
    );
}

export default App;
