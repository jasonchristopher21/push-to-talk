const Icon = ({ name, isUserTalking }) => {
    const colorPalette = [
        '#ecc8af',
        '#e7ad99',
        '#ce796b',
        '#c18cc5d',
        '#495867',
    ];

    const randomHexColorCode = () => {
        let index = Math.floor(colorPalette.length * Math.random());
        return colorPalette[index];
    };

    const highlightUser = isUserTalking ? '#00000075' : '#00000010';

    return (
        <div className="w-full flex flex-col gap-y-2 items-center">
            <div
                style={{ borderColor: highlightUser }}
                className="border-[3.5px] rounded-full">
                <div className="border-[3px] rounded-full border-white">
                    <div
                        style={{
                            backgroundColor: randomHexColorCode(),
                        }}
                        className={`p-4 w-24 h-24 lg:w-32 lg:h-32 rounded-full flex justify-center items-center`}>
                        <p className="text-3xl font-bold">
                            {name[0].toUpperCase()}
                        </p>
                    </div>
                </div>
            </div>
            <p>{name}</p>
        </div>
    );
};
export default Icon;
