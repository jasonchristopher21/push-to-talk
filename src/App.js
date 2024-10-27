import React from 'react';
import { useState } from 'react';
import Client from './components/Client';
import Server from './components/Server';

function App() {
  const [display, setDisplay] = useState(null);
  const buttonClass = "border-[1px] rounded-lg border-black py-2 px-4 m-1"
  const setDisplayToServer = () => {
    setDisplay("SERVER")
  }

  const setDisplayToClient = () => {
    setDisplay("CLIENT");
  }

  if (display === "SERVER") {
    return (
      <Server/>
    )
  } else if (display === "CLIENT") {
    return (
      <Client/>
    )
  } else {
    return (
      <div className='w-full min-h-screen flex justify-center items-center flex-col'>
        <button className={buttonClass} onClick={setDisplayToServer}>Server</button>
        <button className={buttonClass} onClick={setDisplayToClient}>Client</button>
      </div>
    )
  }
}

export default App;
