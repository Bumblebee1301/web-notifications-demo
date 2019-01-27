require('dotenv').config({path: 'variables.env'});
// The dotenv package loads environmental variables 
// from this file into process.env
const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');

const app = express();

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    encrypted: true,
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'),() =>{
    console.log(`Express running on PORT ${server.address().port}`);
});

// When a POST request is received on the /event route,
// a new push event is triggered on the github channel
// and the data from GitHub is included in the event payload.
app.post('/events', (req, res) => {
    pusher.trigger('github', 'push', {
        payload: req.body,
    });
    res.status(200).end();
});