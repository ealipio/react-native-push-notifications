## Push Notifications with React Native and NodeJS in the server

to create a public URL from our local server we are using [ngrock](https://ngrok.com/) so to start the application just do this:

## ngrock
* install ngrock 
* start the server and with the public url update that information in `app/App.js` for `PUSH_REGISTRATION_ENDPOINT` and `MESSAGE_ENPOINT`

### app:
* Install expo CLI
* `cd app && npm install`
* configure your emulator or device
* `npm run android`

### server:
* Install expo CLI
* `cd server && npm install`
* `npm start`