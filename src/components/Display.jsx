import { useState } from 'react';
import Icon from './Icon';
import Header from './Header';

const Display = ({ mode }) => {
    const [users, setUsers] = useState([
        'Jason',
        'Floren',
        'Banand',
        'Lorem',
        'Ipsum',
        'Daniella',
        'Karen',
        'Jason2',
        'Floren2',
        'Banand2',
        'Lorem2',
        'Ipsum2',
        'Daniella2',
        'Karen2',
        'Jason3',
        'Floren3',
        'Banand3',
        'Lorem3',
        'Ipsum3',
        'Daniella3',
        'Karen3',
    ]);

    const [isTalking, setIsTalking] = useState('Jason');

    const customButtonStyle = `border-[2px] px-4 py-2 border-[#00000050] rounded-lg ${
        !isTalking ? 'hover:bg-[#00000025]' : ''
    }`;

    return (
        <div className="flex flex-col items-center justify-end w-full min-h-screen max-h-screen bg-[#ffe8d6]">
            <div className="bg-white flex flex-col gap-y-6 p-4 lg:p-8 rounded-t-xl flex-1">
                <div className="flex-1 gap-y-6 flex flex-col">
                    <Header />
                    <hr className="border-2"></hr>
                </div>
                <div className="flex justify-center max-h-[65vh] overflow-y-scroll flex-8">
                    <div className="grid grid-cols-4 lg:gap-x-20 gap-y-8 w-full max-w-lg">
                        {users.map((u) => {
                            return (
                                <Icon
                                    name={u}
                                    isUserTalking={u === isTalking}></Icon>
                            );
                        })}
                    </div>
                </div>
                <div className="flex flex-col gap-y-2 py-8 justify-center flex-1">
                    <div>
                        {isTalking ? (
                            <p className="font-bold">
                                Now talking: {isTalking}
                            </p>
                        ) : (
                            <p className="font-bold">
                                There is no one talking at the moment.
                            </p>
                        )}
                    </div>

                    {mode === 'SERVER' ? (
                        <div className="flex justify-between">
                            <button className={customButtonStyle}>
                                Start Audio
                            </button>
                            <button className={customButtonStyle}>
                                End Call
                            </button>
                        </div>
                    ) : mode === 'CLIENT' ? (
                        <div className="flex justify-between">
                            <button
                                className={customButtonStyle}
                                disabled={isTalking}>
                                Push to Talk
                            </button>
                            <button className={customButtonStyle}>
                                Leave Call
                            </button>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Display;
