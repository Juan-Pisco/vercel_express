// install `npm install dotenv` to use .env file
// install `npm install express` to use express
// install `npm install nodemon` to use nodemon (EXTRA)

// require('dotenv').config(); // Add this line at the top of your file

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const app = express();

// JUAN TODOs:

// Learn to implement with database (all the methods and more)
// Go more in depth for swagger
// Learn to deploy to GCP (App Engine)

// Learn to deploy to Vercel


// const API_KEY = '123'; // BAD PRACTICE!
const API_KEY = process.env.API_KEY;

const PORT = process.env.PORT;

// GUARDAESPALDAS (MIDDLEWARE)
const apiKeyValidation = (req, res, next) => {
    const userApiKey = req.get('x-api-key');
    if (userApiKey && userApiKey === API_KEY) {
        next();
    } else {
        res.status(401).send('Invalid API Key');
    }
};

app.use(express.json())

// app.use(apiKeyValidation); // -> This will apply to all routes

// Swagger set up
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My Express API',
            version: '1.0.0',
            description: 'A simple Express API',
        },
    },
    // Path to the API docs
    apis: ['./app.js'],
};


// Apply swagger
const swaggerDocs = swaggerJsdoc(swaggerOptions);
// app.use('/api-docs', apiKeyValidation, swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // TURN THIS ON FOR DEPLOYING!
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to the application
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
app.get('/', (req, res) => {
    // this is where the cool logic goes
    return res.send("<h1>Hello World</h1>")
})


/**
 * @openapi
 * /user:
 *   post:
 *     description: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the user
 *                 example: John Doe
 *                 required: true
 *               email:
 *                 type: string
 *                 description: Email of the user
 *                 example: jhon123@gmail.com
 *     responses:
 *       200:
 *         description: User created successfully
 */
app.post("/user", (req, res) => { // APPLYING THE MIDDLEWARE TO A SPECIFIC ROUTE
    const name = req.body.name;

    if (name && name !== "") {
        console.log(`Name: ${name}`);
        return res.send("Successful");
    }
    else {
        res.status(400).send("Name is required");
    }

})

module.exports = app; // Export the app object so that we can use it in our tests

if (require.main === module) {
    // Only start the server if this script is run directly, not for tests
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    })
}
