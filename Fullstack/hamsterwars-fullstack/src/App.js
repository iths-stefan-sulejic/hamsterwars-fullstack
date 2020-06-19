import React from "react";
import "./App.css";
import {BrowserRouter as Router, Switch, Route, NavLink} from "react-router-dom";
import Start from "./components/Start";
import TopFive from "./components/TopFive";
import LastFive from "./components/LastFive";
import NumberOfGames from "./components/NumberOfGames";
import Battle from "./components/Battle";

const App = () => {
    return (
        <Router>
            <div className="App">

                <header className="App-header">
                    <h1>HAMSTER WARS</h1>
                    <nav className = "navigation">
                        <NavLink exact to="/" activeClassName="active">
                            Start
                        </NavLink>
                        <NavLink to="/battle" activeClassName="active">
                            Battle
                        </NavLink>
                        <NavLink to="/stats" activeClassName="active">
                            Stats
                        </NavLink>
                    </nav>
                </header>

                <main className="App-main">
                    <Switch>
                        <Route exact path="/">
                            <Start />
                        </Route>
                        <Route path="/battle">
                            <Battle />
                        </Route>
                        <Route path="/stats">
                            <NumberOfGames />
                            <TopFive />
                            <LastFive />
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    );
};

export default App;