# DeepDeck Configuration Website

## Quick start guide
To start testing in local, install all the dependencies.
- Install latest angular. Current version uses Angular 15 and Material 14 https://angular.io/guide/setup-local
- Clone this repo
- Navigate to the repo folder
- In the terminal run `npm install` to install all the dependencies
- Run `ng serve` to run the server locally
- Navigate to [`http://localhost:4200/`](http://localhost:4200/) to acces the content.
- If the content is white, try exploring the dev tools (F12 in chrome). Make sure that the index.html has this line <base href="http://localhost:4200/">

## Upload to DeepDeck

You can run the following commands:
- `npm run build-prod` to build the project
- `npm run compress-artifacts` to compress the ocmponents
- Copy all the contents of dist/esp-frontend to the folder spiffs on the DeepDeck project
- Compile and run DeepDeck 

# Online version

There is an online version at https://deepsea-developments.github.io/DeepDeck.Web
note: As https is not implemented yet on DeepDeck, you have to change the browser settings to allow insecure content. Otherwhise it will not allow the connection to the DeepDeck

# Desktop version

A desktop version is being develop using electron. change to the branch feature/electron to have the version

# Git organization

- Main branch will have the most stable release
- develop branch will have the latest changes
- there will be feature/<name of feature> branches with specific developments
- When a release is done it will be taggued, so also look for tagged versions


