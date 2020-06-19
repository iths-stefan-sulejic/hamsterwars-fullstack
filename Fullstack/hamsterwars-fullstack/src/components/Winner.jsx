import React from "react";

const Winner = ({
    setWinningHamster: { name, age, favFood, imgName },
}) => {
    return (
        <div>
            <h3>Click on Battle to start another clash between hamsters or check stats to see which is the most favoritized hamster of them all!</h3>
            <h1>Winner is:</h1>
            <img
                src={`./images/hamsters/${imgName}`}
                alt="alt winning hamster"
            />

            <h1>{name}</h1>
            <h1> Age: {age}</h1>
            <h1>Favorite food: {favFood}</h1>
        </div>
    );
};

export default Winner;