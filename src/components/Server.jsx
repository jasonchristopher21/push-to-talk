const Server = () => {
    const buttonClass = 'border-[1px] rounded-lg border-black py-2 px-4 m-1';
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center">
            <h1>You are the Lecturer!</h1>
            <button className={buttonClass}>Start audio</button>
        </div>
    );
};

export default Server;
