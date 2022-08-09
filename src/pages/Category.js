import React, {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import {Link, useParams} from 'react-router-dom';

function Category() {
    const [category, setCategory] = useState([]);

    // Initializing the use of params
    let params = useParams();

    // Fetching recipes by category/dishType from the API
    const getCategory = async (mealType) => {
        const data = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=all&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}&mealType=${mealType}&random=true`);
        const recipes = await data.json();
        setCategory(recipes.hits)
    }

    // getCategory with useEffect every time the mealType param changes
    useEffect(() => {
        getCategory(params.mealType);
    }, [params.mealType]);


    // Making sure we have the required data before returning
    if (!category) {
        return "";
    } else {
        return (
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: .5}}
            >
                <section id="recipes-by-meal" className="recipe-list py-4">
                    <div className="row">
                        <div className="col-12">
                            <div className="row mb-3 justify-content-between">
                                <div className="col-auto">
                                    <h2>{params.mealType} recipes</h2>
                                </div>
                                <div className="col-auto">
                                    <h2 className="styled">Here are our top picks!</h2>
                                </div>
                            </div>
                            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                                {category.map((item) => {
                                    // Splitting the uri value in order to get an ID, which the API doesn't
                                    // provide directly...
                                    const id = item.recipe.uri.split("_")[1];
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
            </motion.div>
        )
    }
}

export default Category;