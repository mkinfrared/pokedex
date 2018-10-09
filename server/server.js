require('dotenv').config();

const http       = require('http'),
	  express    = require('express'),
	  bodyParser = require('body-parser'),
	  session    = require('express-session'),
	  path       = require('path');

const checkForSession = require('./middlewares/checkForSession'),
	  ac              = require('./controllers/user_controller');

const app    = express();
const server = http.createServer(app);

const {SERVER_PORT, SESSION_SECRET} = process.env;

app.use(bodyParser.json({limit: '50mb'}));
app.use(session({
	secret           : SESSION_SECRET,
	resave           : false,
	saveUninitialized: true
}));
app.use(checkForSession);

app.use(express.static(`${__dirname}/../build`));


app.post('/api/login', ac.login);
app.post('/api/register', ac.register);
app.post('/api/signout', ac.signout);
app.get('/api/user', ac.getUser);
app.put('/api/add-favorite', ac.addFavorite);
app.put('/api/remove-favorite', ac.removeFavorites);

app.get('*', (req, res, next) => {
	res.sendFile(path.join(__dirname, '../build/index.html'));
});

server.listen(SERVER_PORT, () => console.log(`Server is working on port ${SERVER_PORT}`));