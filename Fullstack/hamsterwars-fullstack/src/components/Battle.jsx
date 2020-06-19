import React, { useState, useEffect } from "react";
import Winner from "./Winner";
import "./Battle.css";

const Battle = () => {
    const [hamsterOne, setHamsterOne] = useState({});
    const [hamsterTwo, setHamsterTwo] = useState({});
    const [isGamePlayed, setIsGamePlayed] = useState(false);
    const [isHamsterOneWinner, setIsHamsterOneWinner] = useState(false);
    const [isHamsterTwoWinner, setIsHamsterTwoWinner] = useState(false);
    const [winningHamsterId, setWinningHamsterId] = useState("");
    const [defeatedHamsterId, setDefeatedHamsterId] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/hamsters/random");
            const hamster = await response.json();
            setHamsterOne(hamster);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/hamsters/random");
            const hamster = await response.json();
            setHamsterTwo(hamster);
        };
        fetchData();
    }, []);

    const winningHamster = () => {
        if (isHamsterOneWinner) {
            return hamsterOne;
        } else if (isHamsterTwoWinner) {
            return hamsterTwo;
        }
    };

    const gameStatsWins = {
        wins: 1,
        defeats: 0,
    };

    const gameStatsDefeats = {
        wins: 0,
        defeats: 1,
    };

    const handleClickHamsterOne = () => {
        setIsGamePlayed(true);
        setIsHamsterOneWinner(true);
        setWinningHamsterId(hamsterOne.id.toString());
        setDefeatedHamsterId(hamsterTwo.id.toString());
    };

    const handleClickHamsterTwo = () => {
        setIsGamePlayed(true);
        setIsHamsterTwoWinner(true);
        setWinningHamsterId(hamsterTwo.id.toString());
        setDefeatedHamsterId(hamsterOne.id.toString());
    };

    const updateStatsWins = async () => {
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            const body = JSON.stringify(gameStatsWins);
            const requestOptions = {
                method: "PUT",
                headers,
                body,
                redirect: "follow",
            };
            await fetch(
                `/api/hamsters/${winningHamsterId}/result`,
                requestOptions
            );
            console.log("added game stats");
        } catch (err) {
            console.log(err);
        }
    };

    const updateStatsDefeats = async () => {
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            const body = JSON.stringify(gameStatsDefeats);
            const requestOptions = {
                method: "PUT",
                headers,
                body,
                redirect: "follow",
            };
            await fetch(
                `/api/hamsters/${defeatedHamsterId}/result`,
                requestOptions
            );
            console.log("added game stats");
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        updateStatsWins();
    }, [winningHamsterId]);

    useEffect(() => {
        updateStatsDefeats();
    }, [defeatedHamsterId]);

    return (
        <div>
            {isGamePlayed ? (
                <div className="winning-container">
                    <Winner setWinningHamster={winningHamster()} />
                </div>
            ) : (
                <div className="wrapper">
                    <h2>Which hamster do you like the most?</h2>
                    <h3>Choose your favorite hamster by clicking on them.</h3>
                    <div className = "hamster-container">
                        <div className="left" onClick={handleClickHamsterOne}>
                            <h3>{hamsterOne.name}</h3>
                            <img
                                src={`/images/hamsters/${hamsterOne.imgName}`}
                                alt={hamsterOne.imgName}
                            />
                        </div>
                        <div className="right" onClick={handleClickHamsterTwo}>
                            <h3>{hamsterTwo.name}</h3>
                            <img
                                src={`/images/hamsters/${hamsterTwo.imgName}`}
                                alt={hamsterTwo.imgName}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Battle;