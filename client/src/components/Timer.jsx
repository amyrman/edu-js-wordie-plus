import React, { useEffect, useState } from "react";

function Timer({ startTime }) {
    const [time, setTime] = useState(0);

    useEffect(() => {
        if (startTime !== null) {
            const intervalId = setInterval(() => {
                const newTime = Date.now() - startTime;
                setTime(newTime);
            }, 10);

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [startTime]);

    return <div>Time: {(time / 1000).toFixed(2)}</div>;
}

export default Timer;
