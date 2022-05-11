const express = require('express');

// DEPENDENCIES
const express = require('express');
const { append } = require('express/lib/response');

// CONFIGURATION
require('dotenv').config();
const PORT = process.env.PORT;
console.log(PORT);

// ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to an Awesome App about Breads!');
})

// LISTEN
app.listen(PORT, () => {
    console.log('nomming at post', PORT);
})
