const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/synths', {
  useNewUrlParser: true
});


// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: './public/images/',
  limits: {
    fileSize: 10000000
  }
});

// Create a scheme for synths in collection
const itemSchema = new mongoose.Schema({
  title: String,
  manufacturer: String,
  path: String,
  type: String,
  year: String,
  oscillators: String,
  polyphony: String,
  waveforms: String,
  effects: String,
  keyboard: String,
});

itemSchema.virtual('id').get(function() 
{
  return this._id.toHexString();
});

// Create a model for items in the collection
const Item = mongoose.model('Item', itemSchema);

app.listen(4000, () => console.log('Server listening on port 4000!'));

// Create a new item in the collection: takes a title and a path to an image.
app.post('/api/items', async (req, res) => {
  const item = new Item({
    title: req.body.title,
    path: req.body.path,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    //console.log("Uploading photo, return the path of stored photo!");
    path: "/images/" + req.file.filename
  });
});

// Get a list of all of the items in the museum.
app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
    await Item.deleteOne(
      {
        _id: req.params.id
      });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/items/:id', async (req, res) => {
  try {
    let item = await Item.findOne(
      {
        _id: req.params.id
      });
    item.title = req.body.title;
    item.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
