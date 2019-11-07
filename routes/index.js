var express = require('express');
var router = express.Router();
var request = require('request');
const csv = require('csv-parser');
const fs = require('fs');

/* GET home page. 

 npm i -s csv-parser
 
 https://csv.js.org/parse/*/
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root:  'public' });
});
router.get('/getcity',function(req,res,next) {
    console.log("In getcity route");
    var fs = require('fs');
    fs.createReadStream('SynthesizersReworked.csv')
      .pipe(csv())
      .on('data', (row) => {
        console.log(row);
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
      });
    fs.readFile(__dirname + '/cities.dat.txt',function(err,data) 
    {
      if(err) throw err;
      var cities = data.toString().split("\n");
      var myRe = new RegExp("^" + req.query.q);
      console.log(myRe);
      var jsonresult = [];
      for(var i = 0; i < cities.length; i++) 
      {
        var result = cities[i].search(myRe);
        if(result != -1) 
        {
          console.log(cities[i]);
          jsonresult.push({city:cities[i]});
        }
      }
      console.log(jsonresult);
      res.status(200).json(jsonresult);
    });
});

router.get('/owl', function(req, res) {
  var owlurl = "https://owlbot.info/api/v1/dictionary/";
  console.log("In Owl");
  request(owlurl + req.query.q).pipe(res);
});
module.exports = router;
