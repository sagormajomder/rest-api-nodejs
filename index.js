const app = require('./app');
const config = require('./config/config');
const db_connect = require('./config/db');
const PORT = config.app.port;

app.listen(PORT, async () => {
  console.log(`Server is running at port http://localhost:${PORT}`);
  await db_connect();
});
