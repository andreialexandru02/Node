
const express = require('express');
const bodyParser = require('body-parser'); 
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes'); 
const commentRoutes = require('./routes/commentRoutes'); 
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./../swaggerConfig')
const logger = require('./utils/logger')

const app = express();

app.use(bodyParser.json());


app.use('/users', logger, userRoutes);
app.use('/posts', logger, postRoutes);
app.use('/comments', logger, commentRoutes);



app.get('/', (req, res) => {
    res.send('Welcome to the API');
});


const PORT = 4000; 
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(logger);

