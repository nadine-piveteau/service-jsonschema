'use strict';

var fs = require('fs');
var Validator = require('ajv');
var v = new Validator({});
var s = JSON.parse(fs.readFileSync('schemas/geojson.json'));
var c = JSON.parse(fs.readFileSync('geojsons/ch.meteoschweiz.messdaten-niederschlag.json'));

var featurePropertiesSchema = {
  "title": "Properties",
  "type": "object",
  "required": ["station_name", "value", "station_symbol", "description"],
  "properties": {
    "station_name": {
      "type": "string"
    },
    "value": {
      "type": "number",
      "minmum": 0
    },
    "station_symbol": {
      "type": "number",
      "enum": [0, 1]
    },
    "description": {
      "type": "string"
    }
  }
};


s['definitions']['feature']['properties']['properties'] = featurePropertiesSchema;
var validate = v.compile(s);
var valid = validate(c)
if (!valid) console.log(validate.errors);
