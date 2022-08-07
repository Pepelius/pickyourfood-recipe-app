import React from "react";
import {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import {motion} from 'framer-motion';

function Saved() {
    const [recipeList, setRecipeList] = useState([]);

    // Initializing useParams
    let params = useParams();

    const getRecipes = async () => {
        // Checking if entries exist in localStorage
        const check = localStorage.getItem('user-picks');
        if (check) {
            // Store a parsed version of the string
            const saved = JSON.parse(check);

            // Map through each result from user-picks, whilst fetching each recipe's data
            // from the API
            const promises = saved.map(item =>
                fetch(`https://api.edamam.com/api/recipes/v2/${item.id}?type=public&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}`)
                    .then((response) => response.json()));

            // Waiting for the promises to be filled
            const recipes = await Promise.all(promises);
            // Pushing recipes to the recipeList state
            setRecipeList(recipes);
        } else {
            return "You haven't picked any recipes yet!";
        }
    }

    // Run functions as soon as this component is mounted
    useEffect(() => {
        getRecipes();
    },[params.id]);

    // Making sure we have the required data before returning
    if (!recipeList) {
        return "Loading recipe...";
    } else {
        return (
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: .5}}
            >
                <div>
                    {recipeList.map((item) => {
                        // Splitting the uri value in order to get an ID, which the API doesn't
                        // provide directly...
                        let id = item.recipe.uri.split("_")[1];
                        return (
                            <div key={id}>
                                <Link to={'/recipe/' + id}>
                                    <img src={item.recipe.image} alt={"Picture of " + item.recipe.label}/>
                                    <h4>{item.recipe.label}</h4>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </motion.div>
        );
    }
}

export default Saved;