import React, { useState, useEffect } from "react";

const TopFive = () => {
    const [stats, setStats] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/charts/top");
            const json = await response.json();
            setStats(json.map(hamster => hamster));
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Most wins: </h1>
            {stats.map(hamster => (
                <h3 key={hamster.id}>
                    {hamster.name}: {hamster.wins} wins
                </h3>
            ))}
        </div>
    );
};

export default TopFive;