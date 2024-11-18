import app from './app.js'
import { PORT } from './config.js'
import { si } from './Controllers/indexController.js';

app.use(si);

app.listen(PORT)
console.log("server running...")