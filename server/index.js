const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3000;

const indexPath  = path.resolve(__dirname, '..', 'build', 'index.html');

app.use(express.static(
    path.resolve(__dirname, '..', 'build'),
    { maxAge: '30d' },
));

app.listen(PORT, (error) => {
    if (error) {
        return console.log('Error during app startup', error);
    }
    console.log("listening on " + PORT + "...");
});

app.get('/collection/:hash/:id', (req, res, next) => {
    fs.readFile(indexPath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('Error during file reading', err);
            return res.status(404).end()
        }

        // TODO: Needs to call the api to get meta data

        htmlData = htmlData 
            .replace('__META_DESCRIPTION__', "TEST" + '_DESCRIPTION')
            .replace('__META_OG_TITLE__', "TESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTEST") // Should be between 30-60 characters max 90 chars
            .replace('__META_OG_DESCRIPTION__', "TEST" + '_OG_DESCRIPTION') // should be between 55 and 200 characters long
            .replace('__META_OG_IMAGE__', "https://media.tenor.com/images/67b24d53a775a5aae64a3ca99e3ec55a/tenor.png")
            .replace('__META_TWITTER_TITLE__', 'TWITTER_TITLE')
            .replace('__META_TWITTER_IMAGE__', "https://media.tenor.com/images/67b24d53a775a5aae64a3ca99e3ec55a/tenor.png")
            .replace('__META_TWITTER_DESCRIPTION__', 'TWITTER_DESCRIPTION_TWITTER_DESCRIPTION_TWITTER_DESCRIPTION_TWITTER_DESCRIPTION')
            .replace('__META_TWITTER_URL__', 'TWITTER_URL');

        return res.send(htmlData);
    });
});