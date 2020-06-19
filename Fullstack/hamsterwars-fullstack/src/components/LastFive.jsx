import React, { useState, useEffect } from "react";

const LastFive = () => {
    const [stats, setStats] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/charts/bottom");
            const json = await response.json();
            setStats(json.map(hamster => hamster));
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Most defeats:</h1>
            {stats.map(hamster => (
                <h3 key={hamster.id}>
                    {hamster.name}: {hamster.defeats} defeats
                </h3>
            ))}
        </div>
    );
};

export default LastFive;