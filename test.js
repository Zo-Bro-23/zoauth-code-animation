const zoauth = require('zoauth');
const express = require('express');
const app = express();

app.listen(5210);
zoauth.setCredentials({
    google: {
        scope: ['email', 'profile']
    }
})

app.get('/', (req, resp) => {
    resp.redirect(zoauth.getAuthUrl('google', {
        prompt: 'select_account'
    }));
})

app.get('/callback/google', (req, resp) => {
    zoauth.getToken('google', {code: req.query.code})
        .then((tokens) => {
            zoauth.getDetails('google', tokens)
                .then((details) => {
                    resp.send(`Welcome, ${details.name}`);
                })
        })
})