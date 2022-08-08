import React from "react";
import {Route, Routes, useLocation} from 'react-router-dom';
import {AnimatePresence} from "framer-motion";

// Import pages for routing
import Home from "./Home";
import Category from "./Category";
import Searched from "./Searched";
import Recipe from "./Recipe";
import Saved from "./Saved";

function Pages() {
    const location = useLocation();

    return (
        <div className="container py-5">
            <AnimatePresence exitBeforeEnter>
                <Routes Location={location} key={location.pathname}>
                    <Route path="/" element={<Home />} />
                    <Route path="/category/:mealType" element={<Category />} />
                    <Route path="/searched/:search" element={<Searched />} />
                    <Route path="/recipe/:id" element={<Recipe />} />
                    <Route path="/saved" element={<Saved />} />
                </Routes>
            </AnimatePresence>
        </div>
    )
}

export default Pages;