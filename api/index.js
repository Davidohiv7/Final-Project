require('dotenv').config();

const server = require('./src/app.js');
const PORT = 8080;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
