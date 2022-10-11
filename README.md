# To Do List

## About this Project

Use this simple to do list app to add and delete to do list items connected to Airtable using the Fetch API. 

## Challenges and Lessons

I had so much fun figuring out how to use useCallback and useEffect to re-fetch the data from Airtable after a new to do item was added. It took me a bit to get things working the way I wanted when adding an item, but through a lot of trial and error (and a good night's sleep), I finally resolved my issues and made the thing functional. 

I also had fun converting part of the project from the Airtable API to Fetch API (per the project requirements via Code the Dream). It was fun learning how to use the Airtable API and I plan to explore this API more in future projects.

Figuring out DELETE using the Fetch API was a challenge - and it took me quite some time to figure out exactly what data Airtable needed sent with the delete request. It turned out to be so simple, I had been busy trying to complicate things for the better part of an afternoon. 

## Built with

- React.js
- Fetch API
- React Router
- CSS


## Getting started

1. Clone this repo to your local machine. 
2. Run `npm install`. 
3. Visit [Airtable](https://www.airtable.com), sign up and create a base.
4. Save your API key, base ID, and base name (as `/BASE_NAME`) to your .env.local file. (Don't forget to add this file name to your .gitignore file.)
5. Run `npm start`.


## Contact me

- [LinkedIn](https://www.linkedin.com/in/dpetrides/)
- [Twitter](https://twitter.com/danimitchp)

## Acknowledgements

This app was created as part of my work for Code The Dream's Summer 2022 React class. Thank you to my amazing mentors at Code the Dream for their guidance and support. 