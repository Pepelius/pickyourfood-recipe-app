import React from "react";
import {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import {motion} from 'framer-motion';
import styled from "styled-components";

function Searched() {
    const [searchResults, setSearchResults] = useState([]);

    // Initializing the use of params
    let params = useParams();

    // Fetching recipes by search query from the API
    const getSearched = async (input) => {
        const data = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${input}&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}`);
        const recipes = await data.json();
        console.log(data);
        console.log(recipes.hits);
        setSearchResults(recipes.hits);
    }

    // getSearched with useEffect every time the search param changes
    useEffect(() => {
        getSearched(params.search);
    }, [params.search]);


    // Making sure we have the required data before returning
    if (!searchResults) {
        return "Searching for recipes...";
    } else {
        return (
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: .5}}
            >
                <List>
                    {searchResults.map((item) => {
                        // Splitting the uri value in order to get an ID, which the API doesn't
                        // provide directly...
                        let id = item.recipe.uri.split("_")[1];
                        return (
                            <Card key={id}>
                                <Link to={'/recipe/' + id}>
                                    <img src={item.recipe.image} alt={"Picture of " + item.recipe.label}/>
                                    <h4>{item.recipe.label}</h4>
                                </Link>
                            </Card>
                        );
                    })}
                </List>
            </motion.div>
        );
    }
}

// styled components
const List = styled.section `
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 2.5rem;
`;
const Card = styled.div `
  img {
    width: 100%;
    border-radius: 2rem;
    object-fit: cover;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Searched;