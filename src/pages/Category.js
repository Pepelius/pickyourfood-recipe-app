import React, {useState, useEffect} from 'react';
import styled from "styled-components";
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
        return "Loading recipes...";
    } else {
        return (
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: .5}}
            >
                <List>
                    {category.map((item) => {
                        // Splitting the uri value in order to get an ID, which the API doesn't
                        // provide directly...
                        const id = item.recipe.uri.split("_")[1];
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
        )
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

export default Category;