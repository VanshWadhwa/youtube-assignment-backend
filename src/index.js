/* eslint-disable no-undef */
const express = require('express');
const { sequelize } = require('./db/config/database');
const routes = require('./routes');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', routes);



app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await sequelize.sync();
});
