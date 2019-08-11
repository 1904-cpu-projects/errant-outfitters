const server = require('./server');
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Dragons spotted over on port ${port}`));
