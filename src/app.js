'use strict';
const express = require('express');
const got = require('got');

const apiDetails = require('./apidetails');
const storage = require('./memorystorage').MemoryStorage;

const app = express();

app.get('/search', (req, res) => {
  const rootUrl = `https://www.googleapis.com/customsearch/v1`;
  const st = 'image';
  const cx = apiDetails.engineId;
  const key = apiDetails.key;
  const q = req.query.q;
  const offset = req.query.offset || 1; // TODO : prevent offset from being less than 1

  if (!q) return res.json({ error: 'no query supplied' });

  storage.set(q);

  const target = `${rootUrl}?q=${q}&cx=${cx}&searchType=${st}&start=${offset}&key=${key}`;

  got(target).then(resp => {
    const parsed = JSON.parse(resp.body);

    const results = parsed.items.map(i => Object.assign({}, {
      url: i.link,
      snippet: i.snippet,
      thumbnail: i.image.thumbnailLink,
      context: i.image.contextLink
    }));

    res.json(results);
  })
  .catch(e => res.json({ error: e }));
});

app.get('/latest', (req, res) => {
  res.json(storage.getAll());
});

module.exports.app = app;
