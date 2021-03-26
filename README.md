# Travel-App Project
This a web app to help travelling users save their trip and gets advanced weather information on their destination.

## Overview
This project uses desination city and departure date to extract weather information/ forecast from [GeonNames](http://www.geonames.org/export/web-services.html), [weatherbit](https://www.weatherbit.io/api), [Pixabay](https://pixabay.com/api/docs/) APIs to dynamically update the UI and show latest weather information. 

# Brief about important files in your project (Project structure)
The project is structure is as shown below and generated with `tree` command. Read more [here](https://superuser.com/questions/359723/mac-os-x-equivalent-of-the-ubuntu-tree-command)

```bash

├── README.md
├── __test__
│   ├── app.test.js
│   └── server.test.js
├── package-lock.json
├── package.json
├── src
│   ├── client
│   │   ├── index.js
│   │   ├── js
│   │   │   └── application.js
│   │   ├── media
│   │   │   ├── Paris.jpeg
│   │   │   ├── logo.png
│   │   │   ├── logo1.png
│   │   │   └── logo2.png
│   │   ├── styles
│   │   │   ├── base.scss
│   │   │   ├── footer.scss
│   │   │   ├── form.scss
│   │   │   ├── header.scss
│   │   │   ├── main.scss
│   │   │   └── resets.scss
│   │   └── views
│   │       └── index.html
│   └── server
│       ├── server.js
│       └── start.js
├── webpack.dev.js
└── webpack.prod.js

```

# Dependencies
The dependencies for this app are archived in `package.json` file. Running 

```bash
npm install 
```
from the project root directory will install all the required dependencies.

## Get Up and Running

Fork this repo, then clone your forked repo down to your computer:

```
git clone -- git@github.com:[your-user-name]/traveldeft.git -- 
```

# how to run the project in development mode
`cd` into your new folder and run:
- ```npm install```
- ```npm run build-dev```
- ```npm start``` to start the app
- this app runs on localhost:8081, but you can of course edit that in start.js

# how to run the project in production mode.
`cd` into your new folder and run:
- ```npm install```
- ```npm run build-prod```
- ```npm start``` to start the app
- then navigate to localhost:8081 on your browser to access the app

## Get weather info
Enter the destination city on the webpage and the destinatination weather info along with sample images will be displayed. 

# Error handling
The form outputs error message if the infoprmation submitted are not valid.

# References
* The [jest](https://jestjs.io/) documentation.
* The [geonames](http://www.geonames.org/export/web-services.html) API.
* The [weatherbit](https://www.weatherbit.io/) API.
* The [pixabay](https://pixabay.com/api/docs/) API.



