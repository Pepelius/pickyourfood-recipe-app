# Pick Your Food - Recipe Browser
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## App Description
Pick Your Food is a simple recipe browser that's built with React, using free open-source data received through [Edamam's Recipe Search API](https://developer.edamam.com/edamam-recipe-api).\
The App consists of:
- Home page, where the user sees randomly picked recipe suggestions, presented in a slider.
- Recipe search, where the user can freely search for recipes using a keyword.
- Meal filter, where the user can get randomized suggestions for the chosen meal type.
- Your Picks, a list of recipes the user has saved as a collection.

## Use of localStorage
This app utilizes your browser's localStorage to store data, like **user's picked recipes** and randomized recipe suggestions on
front page (to prevent the API from reaching it's Free-tier request limitations).

## Additional libraries
These are the libraries that I've decided to use in this project for additional styling and/or improved functionality.
- [Bootstrap 5.2](https://getbootstrap.com/)
- [framer-motion](https://www.framer.com/motion/) - provides simple transition animations when switching views.
- [Splide](https://splidejs.com/) - a lightweight slider for the home page's recommendations.
- [react-icons](https://react-icons.github.io/react-icons/) - for easy access to huge variety of icons by different providers.

## .env
This file is used to store app sensitive data, like APP_ID and API_KEY in the case of this app. It would normally be left out from git, but as the information here is required to test the app, it is in this case included with the repository. 

## TODO
Basically a list of things (best practices) to do in order to make the app more optimized, that I did not have time to investigate and/or implement.
- Fetched results should be cached to prevent unnecessary requests (Home page currently does this on localStorage).
- Improvements to fetch method. The App had a chance to render the view before the state received any data from the API, resulting in a blank page. This was quick-fixed by making an if-check of whether or not the state has content before return.
- API GET fetch should be made into it's own component with parameters to adjust what the view needs. Right now the fetch is called separately in each view.
- Category, Saved and Searched could be a same component, as the view is basically the same.

## Limitations
- API Requests are limited to 10 requests per minute, 20 results per fetch.
- API doesn't provide an ID for the recipes directly (as a workaround, it is received by splitting the recipe's uri, where the ID can be located)
- API doesn't provide cooking instructions for recipes in itself, but instead offers an URL to a third-party website for instructions.

## Known issues
- Navigating through the app (views) makes the API to lock-up (net::ERR_FAILED_429). The Issue is diagnosed to act as a response for sending too many GET requests to the API (10 calls/minute on Free-tier access).