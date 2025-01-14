// Description: This file is the entry point of the application. It contains the code for creating the express server, setting up the middlewares, connecting to the database, defining the routes, and starting the server. It also contains the code for setting up the socket.io server and defining the socket.io events.

//IMPORT PATH FS HTTP
const path = require('path');
const fs = require('fs');
const http = require('http');

//IMPORT EXPRESS
const express = require('express');

//IMPORT CORS AND HELMET MORGAN
const cors = require('cors');
const helemt = require('helmet');
const morgan = require('morgan');


//CREATE EXPRESS APP
const app = express();

//CREATE SERVER
const server = http.createServer(app); // Create HTTP server
const io = require('socket.io')(server); // Attach socket.io to the server instance


//DOTENV CONFIG
require('dotenv').config();

//IMPORT SEQUELIZE
const sequelize = require('./util/database');


//BODYPARSER
const bodyParser = require('body-parser');

//IMPORT MODELS
const User = require('./models/user');
const Recipe = require('./models/recipe');
const MainIngredients = require('./models/main_ingredients');
const Ingredients = require('./models/ingredients');
const Ingredient_Type = require('./models/ingredient_type');
const ReceipeIngredients = require('./models/recipeIngredients');



//IMPORT ROUTES
const userRouter = require('./routes/user');
const recipeRouter = require('./routes/recipe');



//IMPORT SOCKET AUTHENTICATION MIDDLEWARE
const socketAuthMiddleware = require('./middleware/socketUserAuthentication');


//CREATE ACCESS LOG FILE
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })


//MIDDLEWARES
app.use(helemt({ contentSecurityPolicy: false })); //Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(morgan('combined', { stream: accessLogStream }));//Morgan is a HTTP request logger middleware for Node.js


app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
})); //CORS

app.use(express.static(path.join(__dirname, 'public')));//Serve static files

app.use(bodyParser.json({ extended: false }));//Body parser middleware

//ROUTES
app.use(userRouter);
app.use(recipeRouter);



//SOCKET AUTHENTICATION MIDDLEWARE
io.use(socketAuthMiddleware.authentication);


//SOCKET IO CONNECTION 
io.on('connection', socket => {

    // console.log('SCOKET ID:::::',socket.id);

    //ON SEND MESSAGE EVENT
    socket.on('send-message', (msg, room, fileURL) => {
        // console.log('message: ' + msg);
        data = {
            message: msg,
            user: socket.user,
            fileURL: fileURL
        }
        //RECEIVE MESSAGE
        // io.emit('receive-message',data);
        io.to(room).emit('receive-message', data);
    });


    //JOIN ROOM
    socket.on('join-room', room => {
        console.log(room);
        socket.join(room);
    })


    //ON DISCONNECT
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

})


//ASSOCIATIONS
User.hasMany(Recipe);
Recipe.belongsTo(User);

Recipe.belongsToMany(Ingredients, { through: ReceipeIngredients });
Ingredients.belongsToMany(Recipe, { through: ReceipeIngredients });

// MainIngredients.hasMany(Ingredients);
// Ingredients.belongsTo(MainIngredients);

Ingredient_Type.hasMany(Ingredients);
Ingredients.belongsTo(Ingredient_Type);



//SYNC DATABASE AND LISTEN TO SERVER
sequelize
    .sync()
    // .sync({force:true})
    // .sync({alter:true})
    .then(async () => {

        // Seed Ingredient Types
        await Ingredient_Type.findOrCreate({
            where: { name: 'main' },
            defaults: { name: 'main' },
        });

        await Ingredient_Type.findOrCreate({
            where: { name: 'secondary' },
            defaults: { name: 'secondary' },
        });

        // app.listen(3000);
        server.listen(3000);//LISTEN TO SERVER

    })
    .catch(err => console.log(err));