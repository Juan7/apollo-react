# apollo-react
Testing about Apollo-React capabilities

# Summary
This is a simple project which shows GitHub users and their respective repositories, made on `Apollo-React`

# Setup
## System requirements
Before we begin, make sure you have the following installed:

- Node.js v8.x or later
- npm v6.x or later
- git v2.14.1 or later

## Server Setup
`cd start/server && npm install`
- To run server we must execute `npm start` command (By default it will run on `port:4000`)

## Client Setup 
`cd start/client && npm install`
- To run server we must execute `npm start` command (By default it will run on `port:3000`)

# Description
- On main page we will see the users from GitHub.
- By default it shows 5 but you can get more on `Load More` button.
- Every User is a link when we can check detailed info about it and also a link to chek their repositories.
- At every page we have a button to go a level up on navigation.
- We have a home button on footer.

# Known issues
- We have the `search` users endpoints on server, but help is required to calls from UX (But the endpoint works!)
- We must refactor some code specially on `resolvers` sections.
- We must improve design.

Thanks for your time!
