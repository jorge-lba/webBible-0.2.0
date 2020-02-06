import React, { useEffect, useState } from 'react';


import Routes from './src/routes'
import Main from './src/pages/Main/index'
import HeaderBible from './src/pages/Main/HeaderBible'




export default function App() {
  const [ le, setLe ] = useState( {conf:0} )
  
  function getValue( value ){
    
    setLe((conf) => {
      return{
        conf: value

      } 
    })
    
  }

  return (
    <>
      <Routes/>
      {/* <HeaderBible reload={ getValue } />
      <Main fontSizeAll = { le.conf } /> */}
    </>
  );
}
