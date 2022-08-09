import {useEffect, useState} from "react";
import {Splide, SplideSlide} from '@splidejs/react-splide';
import {Link} from "react-router-dom";

import "@splidejs/splide/dist/css/splide.min.css";

function Suggestions() {
    // Initializing states
    const [suggestions, setSuggestions] = useState([]);

    const getSuggestions = async () => {
        // LocalStorage caching to prevent unnecessary API requests (limited requests)
        const check = localStorage.getItem('suggested');
        if (check) {
            // Parse and return the stringified results
            setSuggestions(JSON.parse(check));
        } else {
            // If there are no cached results, fetch results from API
            const data = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}&random=true`);
            const recipes = await data.json();

            // Save fetched data to LocalStorage as a string
            localStorage.setItem('suggested', JSON.stringify(recipes.hits));

            // Saving the received data from API to suggestions
            setSuggestions(recipes.hits);
        }
    }

    // Run functions as soon as this component is mounted
    useEffect(() => {
        getSuggestions();
    },[]);


    // Making sure we have the required data before returning
    if (!suggestions) {
        return "";
    } else {
        return (
            <section id="random-picks" className="recipe-list py-4">
                <div className="row">
                    <div className="col-12">
                        <div className="row mb-3 justify-content-between">
                            <div className="col-auto">
                                <h2>Random Picks</h2>
                            </div>
                            <div className="col-auto">
                                <h2 className="styled">...for when you want to get surprised!</h2>
                            </div>
                        </div>

                        <Splide aria-label="Suggested recipes" options={{
                            perPage: 4,
                            gap: "2rem",
                            pagination: true,
                            arrows: false,
                            drag: 'free',
                            autoplay: true,
                            breakpoints: {
                                992: {
                                    perPage: 3,
                                },
                                768: {
                                    perPage: 2,
                                },
                            }
                        }}>
                            {suggestions.map((item) => {
                                // Splitting the uri value in order to get an ID, which the API doesn't
                                // provide directly...
                                let id = item.recipe.uri.split("_")[1];
                                return (
                                    <SplideSlide key={id}>
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
                                    </SplideSlide>
                                );
                            })}
                        </Splide>
                    </div>
                </div>
            </section>
        )
    }
}

export default Suggestions;