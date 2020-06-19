# Webtools Projekt
[Click here](https://orangefoil.github.io/ss20-webtools-project/) to see this project in action.

## Prerequisites
* [NPM](https://www.npmjs.com/) 

## Start application locally and/or for development 
```
npm install
npm start
```

## Build a static version for deployment
```
npm install
npm run build
```
Copy the contents of the `build/` folder to the web-root of your webserver.

## Customization 
Help texts and examples are stored in the `src/data/` folder.
The syntax should be self-explanatory.  
Help texts are stored in `src/data/descriptions.json`. Examples in `src/data/examples.json`.

 
All fields except `title` and `data` support HTML
(although technically its [JSX](https://reactjs.org/docs/introducing-jsx.html)).  
Note that empty tags must be closed. For example:  
Correct: `<br />`  
Wrong: `<br>` 
