// Starting express and mongoose application
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const shortid = require('shortid');

const app = express();
const PORT = process.env.PORT || 3000;

// Here is the Middleware
app.use(bodyParser.json());




// Connect mongoose connection to the MongoDB
mongoose.connect('mongodb://localhost/url-shortener', { useNewUrlParser: true, useUnifiedTopology: true });

// URL Model Schema
const urlSchema = new mongoose.Schema({
    url: { type: String, required: true },
    shortCode: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    accessCount: { type: Number, default: 0 }
});

const Url = mongoose.model('Url', urlSchema);

// Here Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


//IMPLEMENTING API ENDPOINT.

//Creating short URL

app.post('/shorten', async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const shortCode = shortid.generate();
    const newUrl = new Url({ url, shortCode });

    try {
        await newUrl.save();
        res.status(201).json(newUrl);
    } catch (error) {
        res.status(400).json({ error: 'Error creating short URL' });
    }
});

// Retrieve Original URL.

app.get('/shorten/:shortCode', async (req, res) => {
    const { shortCode } = req.params;

    try {
        const urlEntry = await Url.findOne({ shortCode });
        if (!urlEntry) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        // Increment access count.
        urlEntry.accessCount++;
        urlEntry.updatedAt = Date.now();
        await urlEntry.save();

        res.status(200).json(urlEntry);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving URL' });
    }
});

// Update Short URL

app.put('/shorten/:shortCode', async (req, res) => {
    const { shortCode } = req.params;
    const { url } = req.body;
    // Add validation point
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

        //redirect functionality for short links
    try {
        const urlEntry = await Url.findOneAndUpdate(
            { shortCode },
            { url, updatedAt: Date.now() },
            { new: true }
        );

        if (!urlEntry) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        res.status(200).json(urlEntry);
    } catch (error) {
        res.status(400).json({ error: 'Error updating short URL' });
    }
});

//Delete Short URL

app.delete('/shorten/:shortCode', async (req, res) => {
    const { shortCode } = req.params;

    try {
        const result = await Url.deleteOne({ shortCode });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting short URL' });
    }
});

//  Get URL Statistics
app.get('/shorten/stats/:shortCode', async (req, res) => {
    const { shortCode } = req.params;

    try {
        const urlEntry = await Url.findOne({ shortCode });
        if (!urlEntry) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        res.status(200).json({
            id: urlEntry._id,
            url: urlEntry.url,
            shortCode: urlEntry.shortCode,
            createdAt: urlEntry.createdAt,
            updatedAt: urlEntry.updatedAt,
            accessCount: urlEntry.accessCount
        });
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving statistics' });
    }
});
