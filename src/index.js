const http = require('http');
const dotenv = require('dotenv');
const request = require('./request')

const server = http.createServer(request.handleRequest);

dotenv.config();
server.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});