# Travel-App Project
This a web app to help travelling users save their trip and gets advanced weather information on their destination.

## Overview
This project uses desination city and departure date to extract weather information/ forecast from [GeonNames](http://www.geonames.org/export/web-services.html), [weatherbit](https://www.weatherbit.io/api), [Pixabay](https://pixabay.com/api/docs/) APIs to dynamically update the UI and show latest weather information. 

## Get Up and Running

Fork this repo, then clone your forked repo down to your computer:

```
git clone -- git@github.com:[your-user-name]/traveldeft.git -- 
```

`cd` into your new folder and run:
- ```npm install```
- ```npm run build-dev```
- ```npm start``` to start the app
- this app runs on localhost:8081, but you can of course edit that in server.js

## Get weather info

Enter the destination city and the weather info along with sample images will be displayed. 

# Error handling

The form outputs error message if the infoprmation submitted are not valid.
