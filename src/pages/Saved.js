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
                    <section id="saved-recipes" className="recipe-list py-4">
                        <div className="row">
                            <div className="col-12">
                                <div className="row mb-3 justify-content-between">
                                    <div className="col-auto">
                                        <h2>Picked recipes</h2>
                                    </div>
                                    <div className="col-auto">
                                        <h2 className="styled">Enjoy your meals!</h2>
                                    </div>
                                </div>
                                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                                    {recipeList.map((item) => {
                                        // Splitting the uri value in order to get an ID, which the API doesn't
                                        // provide directly...
                                        let id = item.recipe.uri.split("_")[1];
                                        return (
                                            <div className="col" key={id}>
                                                <div className="card">
                                                    <Link to={'/recipe/' + id}>
                                                        <img src={item.recipe.image} alt={"Picture of " + item.recipe.label}/>
                                                        <h4>{item.recipe.label}</h4>
                                                        <div className="labels">
                                                            <div className="badge bg-secondary">{parseInt(item.recipe.calories)} kcal</div>
                                                        </div>
                                                        <div className="overlay"></div>
                                                    </Link>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </motion.div>
        );
    }
}

export default Saved;