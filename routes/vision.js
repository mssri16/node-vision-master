var express = require('express');
var router = express.Router();

router.post('/classify', function(req, res, next) {
  // DON'T return the hardcoded response after implementing the backend
  let response;

  // Your code starts here //

  // Defining a constant for aws-sdk
  const AWS = require('aws-sdk');
  
  // Configuring the access and secret key as provided
  AWS.config.update({
  accessKeyId: 'AKIARAR74F5B2ZJFROOU',
  secretAccessKey: '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',
  region: 'ap-southeast-1'
  })
  
  // Defining the Rekognition method in the constant
  const rekognition = new AWS.Rekognition();
  
  // Defining the parameters to call the API
  const params = {
    Image: {
      Bytes: req.files.file.data,
    },
    MaxLabels: 10, 
    MinConfidence: 80, 
  };
  
  //Calling detectLabels method from rekognition
  rekognition.detectLabels(params, (err, data) => {
    if (err) {
      console.error('Error calling Rekognition:', err);
      res.status(500).json({ error: 'Error calling Rekognition' });
    } else {
      response = data.Labels.map(label => label.Name);
      res.json({
		"labels": response
	  });
    }
  });
  // Your code ends here //

});

module.exports = router;
