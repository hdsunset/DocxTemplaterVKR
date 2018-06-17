var webdriverio = require('webdriverio');

var options = {
    desiredCapabilities: {
        browserName: 'firefox'
    }
};

webdriverio
  .remote(options)
  .init()
  .url('http://buddy.works')
  .saveScreenshot('buddyworks.png') 
  .end();

