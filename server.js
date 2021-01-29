const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res) => {
    const element = getRandomElement(quotes);
    const response = {
        quote: element
    };
    res.send(response);
})

app.get('/api/quotes', (req, res) => {
    const response1 = {
        quotes: quotes
    };
    if (!req.query.person) {
        res.send(response1);
    } else {
        let prepare = quotes.filter(obj => obj.person===req.query.person);
        const response2 = {
            quotes: prepare
        }
        res.send(response2);
    }
})

app.post('/api/quotes', (req, res) => {

    if (!req.query.person || !req.query.quote) {
        res.status(400).send();
    } else {
        const response2 = {
            quote: {
                quote: req.query.quote,
                person: req.query.person
            }
        }
        quotes.push(response2.quote);
        res.send(response2);
    }
})

app.listen(PORT);
