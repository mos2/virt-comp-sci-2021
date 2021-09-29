# Running the Node.js Sample Server "Users" App

1. You must have Node.js installed, at least version 12. Download and install from https://nodejs.org/en/download/ for your platform. Use an LTS version. The current LTS version is version 14, which will be fine for this.

2. Use git to clone down this repository if not already done so (as shown in https://www.youtube.com/watch?v=3C0zsJQsQBk), and from a command line terminal, navigate to the `nodejs_server_app` folder inside the `6_NetworkingInternet` folder.

3. In your terminal window, run `npm install` (you can use `npm i` for short) - this will download all the dependencies this app needs to run, listed in the `package.json` file. This only needs to be done once (if the dependencies were changed or updated in the future, you would need to run this again).

4. Start up the app by running `node app` from your terminal window (`app` is the name of the main file, `app.js`, without the `.js` filename extension.) The app is now running on your local machine at `http://localhost:3000`, and can receive HTTP requests at this address. Note that you will not be able to use/type-into this terminal window while the app is running.

5. To stop the app, go back to the terminal window where you ran `node app` to start it up. On your keyboard, press `Control + C` keys together. This sends an **interrupt** signal to the app, which will force it to stop running.

6. To host a database, if you have docker installed, you can run docker-compose, otherwise, you can host a postgres database yourself, or on the internet.

### If using Docker

Open a terminal ( CMD for windows ) and run docker-comose up -d when in the same directory as the docker-compose.yml file.

This will pull a docker image and will host a PostgresQL database on your local network, on port 5432.
