import React, { useEffect, useState } from "react";

const ENDPOINT = "http://localhost:3001/api/events";

function Timer() {
    const [time, setTime] = useState(0);
    const [startTime, setStartTime] = useState(null);

    useEffect(() => {
        const eventSource = new EventSource(ENDPOINT);

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "start") {
                setStartTime(Date.now());
            } else if (data.type === "stop") {
                setTime(data.sessionTime);
                setStartTime(null);
            }
        };

        return () => {
            eventSource.close();
        };
    }, []);

    useEffect(() => {
        if (startTime !== null) {
            const intervalId = setInterval(() => {
                setTime(Date.now() - startTime);
            }, 10);

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [startTime]);

    return <div>Time: {(time / 1000).toFixed(2)}</div>;
}

export default Timer;
