import React from 'react';
import { useState } from 'react';
import Display from './components/Display';

function App() {
  const [display, setDisplay] = useState(null);
  const [name, setName] = useState('');
  const customButtonStyle = `border-[2px] bg-white px-4 py-2 border-[#00000050] rounded-lg hover:bg-[#00000025]`;
  const setDisplayToServer = () => {
    if (name.trim() === "") {
        alert("Your name needs to have at least one character!")
    } else {
        setDisplay("SERVER")
    }
  }

  const setDisplayToClient = () => {
      if (name.trim() === "") {
          alert("Your name needs to have at least one character!")
      } else {
          setDisplay("CLIENT")
      }
  }

  const handleChange = (e) => {
      setName(e.target.value);
  }

  if (!display) {
    return (
      <div className='w-full min-h-screen flex justify-center items-center flex-col bg-[#ffe8d6] gap-y-4'>
        
        <h1 className="text-xl font-bold">Please input your name before choosing the Server or Client.</h1>
        <div className='flex gap-x-2 items-center'>
          <label className='font-bold'>Name: </label>
          <input className="py-2 px-4 border-[2px] border-[#00000050] rounded-lg" onChange={handleChange} value={name}/>
        </div>
        <div className='flex gap-x-2'>
          <button className={customButtonStyle} onClick={setDisplayToServer}>Server</button>
          <button className={customButtonStyle} onClick={setDisplayToClient}>Client</button>
        </div>
      </div>
      
    )
  } else {
    return (
      <Display mode={display}/>
    )
  }
}

export default App;
