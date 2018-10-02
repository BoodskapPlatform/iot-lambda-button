var dgram = require('dgram');

var DOMAIN_KEY = process.env.DOMAIN_KEY;
var API_KEY = process.env.API_KEY;
var MESSAGE_ID = parseInt(process.env.MESSAGE_ID);
var DEVICE_MODEL = 'AWSIOTBTN';
var FIRMWARE_VERSION = '1.0.0';
var HOST = 'udp.boodskap.io';
var PORT = 5555;

exports.handler = (event, context, callback) => {
    
    var sn = event.serialNumber;
    
    if(sn == null || typeof sn === 'undefined'){
       
	 context.fail('Invalid Event');

    }else{
       
    	var click = 1;
    	
    	if(event.clickType === 'DOUBLE'){
    	    click = 2;
    	}
    	
    	var packet = {
    	  
    	  "header": {
                  'key': DOMAIN_KEY,
                  'api': API_KEY,
                  'did': sn,
                  'dmdl': DEVICE_MODEL,
                  'fwver': FIRMWARE_VERSION,
                  'mid': MESSAGE_ID
    	  },
    	  
    	  "data": {
    	      "battery": event.batteryVoltage,
    	      "click": click
    	  }
    	};
        
        var data = JSON.stringify(packet);
        
        console.log('Packet:', data);
        
    	var message = new Buffer(data);
    	
    	var client = dgram.createSocket('udp4');
    
    	client.send(message, 0, message.length, PORT, HOST, function(err, bytes){
    		if(err){
    			console.error(err);
    			context.fail("UDP Packet failed");
    		}else{
    			client.close();
    			context.succeed('Success');
    		}
    	 });
      	
    }
    
};
