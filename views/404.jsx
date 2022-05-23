const React = require('react');
const Default = require('./layouts/default');

function error404(){
    return(
        <Default>
            <h2>404</h2>
            <h3>You seem lost... sorry, this page does not exist.</h3>
            <a href='/breads'><button className='btn-primary'>Go home</button></a>
        </Default>
    )
};

module.exports = error404;