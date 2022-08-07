import React from "react";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {motion} from 'framer-motion';
import styled from "styled-components";

function Recipe() {
    const [details, setDetails] = useState(null);
    const [activeTab, setActiveTab] = useState("ingredients");

    // Initializing useParams
    let params = useParams();

    const fetchDetails = async () => {
        const data = await fetch(`https://api.edamam.com/api/recipes/v2/${params.id}?type=public&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}`);
        const result = await data.json();
        setDetails(result);
        console.log(result);
    }

    // Handler for saving the selected recipe to user's picks (localStorage)
    const saveRecipeHandler = (e) => {
        e.preventDefault();

        let savedRecipes = JSON.parse(localStorage.getItem('user-picks'));
        // Checking if or not there are existing entries saved to localStorage
        // If not, create an empty array for new entries
        if (savedRecipes == null) savedRecipes = [];

        // Preparing data for the array
        let entry = {
            "id": e.currentTarget.id
        };

        // Pushing selected recipe to savedRecipes array
        savedRecipes.push(entry);
        localStorage.setItem('user-picks', JSON.stringify(savedRecipes));
    }

    useEffect(() => {
        fetchDetails();
    }, [params.id]);

    // Making sure we have the required data before returning
    if (!details) {
        return "Loading recipe...";
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
                <DetailWrapper>
                    <div>
                        <h2>{details.recipe.label}</h2>
                        <img src={details.recipe.image} alt="Test"/>
                    </div>
                    <Info>
                        <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab('ingredients')}>Ingredients</Button>
                        <Button className={activeTab === 'nutrition' ? 'active' : ''} onClick={() => setActiveTab('nutrition')}>Nutrition</Button>
                        <a className="btn btn-default" href={details.recipe.url} target="_blank">Instructions</a>

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
                                <ul>
                                    {details.recipe.digest.map((nutrient, index) =>
                                        <li key={index}>
                                            <strong>{nutrient.label}</strong>: {parseInt(nutrient.daily)} {nutrient.unit}
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </Info>
                    <button className="btn btn-success" onClick={saveRecipeHandler} id={id}>Pick</button>
                </DetailWrapper>
            </motion.div>
        );
    }


}

// styled components
const DetailWrapper = styled.div `
  display: flex;
  margin: 10rem 0 5rem;
  
  .active {
    background: var(--color-secondary);
  }
  h2 { margin-bottom: 1.5rem; }
  ul {
    margin-top: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
`;
const Button = styled.button `
  background: var(--color-primary-light);
  padding: 1rem 2rem;
  color: #313131;
  border: 2px solid var(--color-primary);
  margin-right: 1rem;
`;
const Info = styled.div `
  margin-left: 10rem;    
`;

export default Recipe;