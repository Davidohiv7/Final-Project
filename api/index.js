const server = require('./src/app.js');


server.listen(3001, () => {
    console.log('API connection established in port 3001'); // eslint-disable-line no-console
})
