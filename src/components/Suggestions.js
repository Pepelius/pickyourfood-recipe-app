import {useEffect, useState} from "react";
import {Splide, SplideSlide} from '@splidejs/react-splide';
import {Link} from "react-router-dom";
import styled from "styled-components";

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
            //console.log("Tulokset: ", recipes.hits.recipe.uri);
        }
    }

    // Run functions as soon as this component is mounted
    useEffect(() => {
        getSuggestions();
    },[]);


    // Making sure we have the required data before returning
    if (!suggestions) {
        return "Loading suggestions...";
    } else {
        return (
            <div>
                <Wrapper>
                    <h3>Random Picks</h3>
                    <Splide options={{
                        perPage: 5,
                        gap: "2.5rem",
                        pagination: false,
                        drag: 'free',
                        breakpoints: {
                            1200: {
                                perPage: 4,
                            },
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
                                    <Card>
                                        <Link to={'/recipe/' + id}>
                                            <img src={item.recipe.image} alt={"Picture of " + item.recipe.label}/>
                                            <h4>{item.recipe.label}</h4>
                                            <Overlay/>
                                        </Link>
                                    </Card>
                                </SplideSlide>
                            );
                        })}
                    </Splide>
                </Wrapper>
            </div>
        )
    }
}

// styled components
const Wrapper = styled.section `
  margin: 3rem 0;
`;
const Card = styled.div `
  position: relative;
  min-height: 25rem;
  border-radius: 1rem;
  overflow: hidden;

  img {
    position: absolute;
    border-radius: 1rem;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  h4 {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 1em .75em;
    font-weight: 600;
    color: #fff;
    z-index: 5;
  }
`;
const Overlay = styled.div `
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,.65));
  z-index: 2;
`;

export default Suggestions;