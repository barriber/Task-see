import React, { useState, useEffect } from "react";

const CurrentTime = () => {
    const [dt, setDt] = useState(new Date().toLocaleString());

    useEffect(() => {
        let secTimer = setInterval(() => {
            setDt(new Date().toLocaleString())
        }, 1000)

        return () => clearInterval(secTimer);
    }, []);

    return <h1>{dt}</h1>
}


export default CurrentTime;
