import React, {useState, useEffect} from "react";
import {BrowserRouter} from "react-router-dom";

// Importing views
import Pages from "./pages/Pages";
import Header from "./components/Header";
import Meals from "./components/Meals";
import Search from "./components/Search";
import Navigation from "./components/Navigation";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navigation />
                <Header />
                <Pages />
            </BrowserRouter>

            <section id="recipes">

            </section>
        </div>
    );
}

export default App;
