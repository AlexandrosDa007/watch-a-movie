### Watch a movie (Client)

![GitHub package.json version](https://img.shields.io/github/package-json/v/AlexandrosDa007/watch-a-movie?style=plastic)

An angular+electron+cordova application to use as a client for [watch-a-movie-server](https://github.com/AlexandrosDa007/watch-a-movie-server)

Its created with the template of https://github.com/maximegris/angular-electron 👍

The project can be build for both desktop and android.<br><br>
You will need to install java and grade to use with cordova,
to build and run for android.

***

### How to use
```
git clone https://github.com/AlexandrosDa007/watch-a-movie
```
#### Install dependencies
```
npm install
```
#### Run
```
npm start
```
#### Build for desktop
```
npm run electron:build
```
#### Build for android
```
npm run android:build
```

#### Run for android
```
npm run android:run
```


***


In the application you must set the url of the the server along with the port number,<br>
in the settings page. After which you will be able to see the movies that were requested<br>
by the client.
