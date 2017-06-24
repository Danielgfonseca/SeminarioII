<<<<<<< HEAD
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const verificationController = require('./controllers/verification');
const messageWebhookController = require('./controllers/messageWebhook');
const imageSearchController = require('./controllers/imageSearch');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(5000, () => console.log('Webhook server is listening at port 5000'));

app.get('/', verificationController);
app.post('/', messageWebhookController);
app.post('/image-search', imageSearchController);
=======
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const verificationController = require('./controllers/verification');
const messageWebhookController = require('./controllers/messageWebhook');
const imageSearchController = require('./controllers/imageSearch');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(5000, () => console.log('Webhook server is listening at port 5000'));

app.get('/', verificationController);
app.post('/', messageWebhookController);
app.post('/image-search', imageSearchController);
>>>>>>> 818dca6593854c0c1fbeb85423c31ab75c50283c
