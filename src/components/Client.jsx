import React, { useState } from 'react';

const Client = () => {
    const [name, setName] = useState('');
    const buttonClass = 'border-[1px] rounded-lg border-black py-2 px-4 m-1';

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center gap-y-4">
            <div>
                <label>Name:</label>
                <input
                    value={name}
                    onChange={handleNameChange}
                    className="border-[1px] border-black rounded-sm px-4 m-1"
                />
            </div>
            <div className="flex flex-col justify-center items-center">
                <h1>You are the student.</h1>
                <button className={buttonClass}>Push to talk</button>
            </div>
        </div>
    );
};

export default Client;
