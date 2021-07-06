require('dotenv').config();

const server = require('./src/app.js');
// const PORT = process.env.PORT || 3001;
const PORT = 8080;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
