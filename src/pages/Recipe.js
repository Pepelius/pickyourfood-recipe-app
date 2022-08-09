import React from "react";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {RiHeart2Line} from 'react-icons/ri';
import {motion} from 'framer-motion';
import Swal from "sweetalert2";

function Recipe() {
    const [details, setDetails] = useState(null);
    const [activeTab, setActiveTab] = useState("ingredients");

    // Initializing useParams
    let params = useParams();

    const fetchDetails = async () => {
        const data = await fetch(`https://api.edamam.com/api/recipes/v2/${params.id}?type=public&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}`);
        const result = await data.json();
        setDetails(result);
    }

    // Handler for saving the selected recipe to user's picks (localStorage)
    const saveRecipeHandler = (e) => {
        e.preventDefault();

        const recipe = e.currentTarget.id;

        if (!localStorage.getItem('user-picks')) {
            localStorage.setItem('user-picks', '[]');
        }

        const entries = JSON.parse(localStorage.getItem('user-picks'));
        let exist = false;
        // Go through saved entries and toggle exists if the id is already stored
        for (let i = 0; i < entries.length; i++) {
            if (entries[i].id == recipe) {
                exist = true;
                break;
            }
        }
        // If no existing entry is found for selected id, push it to the array
        if (!exist) {
            entries.push({id: recipe});
            // Store the recipe's id to localStorage
            localStorage.setItem('user-picks', JSON.stringify(entries));
            // Alert for a successful save
            Swal.fire({
                title: "<strong>Recipe saved!</strong>",
                html: "<i>You can now find this recipe under <strong>Your Picks</strong>!</i>",
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            });
            e.currentTarget.setAttribute('disabled','');
        } else {
            Swal.fire({
                title: "<strong>You have already picked this recipe!</strong>",
                html: "<i>Check <strong>Your Picks</strong> to view your collection of picked recipes.</i>",
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            });
        }
    }

    useEffect(() => {
        fetchDetails();
    }, [params.id]);

    // Making sure we have the required data before returning
    if (!details) {
        return "";
    } else {
        // Splitting the uri value in order to get an ID, which the API doesn't
        // provide directly...
        let id = details.recipe.uri.split("_")[1];

        return (
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: .5}}
            >
                <section id="inspect-recipe" className="py-4">
                    <div className="row g-5">
                        <div className="order-2 col-lg-5 order-lg-1">
                            <div className="recipe-image">
                                <img src={details.recipe.image} className="img-fluid" alt="Image of the complete dish"/>
                            </div>
                        </div>
                        <div className="order-1 col-lg-7 order-lg-2">
                            <div className="row justify-content-between">
                                <div className="col-auto">
                                    <ul className="nav">
                                        <li className="nav-item me-2">
                                            <a className={activeTab === 'ingredients' ? 'nav-link active' : 'nav-link'} onClick={() => setActiveTab('ingredients')}>Ingredients</a>
                                        </li>
                                        <li className="nav-item me-2">
                                            <a className={activeTab === 'nutrition' ? 'nav-link active' : 'nav-link'} onClick={() => setActiveTab('nutrition')}>Nutrition</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href={details.recipe.url} target="_blank">Instructions</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-auto">
                                    <button className="btn btn-lg btn-success" onClick={saveRecipeHandler} id={id}>
                                        <RiHeart2Line className="me-2" />
                                        Pick
                                    </button>
                                </div>
                            </div>

                            <hr />
                            <h2>{details.recipe.label}</h2>

                            {activeTab === 'ingredients' && (
                                <ul>
                                    {details.recipe.ingredients.map((ingredient, index) =>
                                        <li key={index}>
                                            {ingredient.text}
                                        </li>
                                    )}
                                </ul>
                            )}

                            {activeTab === 'nutrition' && (
                                <div>
                                    <p>{parseInt(details.recipe.calories)} kcal</p>
                                    {details.recipe.digest.map((nutrient, index) =>
                                        <span className="nutrient" key={index}>
                                            <strong>{nutrient.label}</strong>: {parseInt(nutrient.daily)} {nutrient.unit}{index == details.recipe.digest.length-1 ? '' : ', '}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </motion.div>
        );
    }
}

export default Recipe;