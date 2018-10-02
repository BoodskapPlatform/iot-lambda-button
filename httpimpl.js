var request = require('request');

var DOMAIN_KEY = process.env.DOMAIN_KEY;
var API_KEY = process.env.API_KEY;
var MESSAGE_ID = parseInt(process.env.MESSAGE_ID);
var DEVICE_MODEL = 'AWSIOTBTN';
var FIRMWARE_VERSION = '1.0.0';

exports.handler = (event, context, callback) => {
    
    var sn = event.serialNumber;
    
    if(sn == null || typeof sn === 'undefined'){
        context.fail('Invalid Event');
    }else{
        
       
    	var click = 1;
    	
    	if(event.clickType === 'DOUBLE'){
    	    click = 2;
    	}
        
        var URL = 'https://api.boodskap.io/push/raw/' + DOMAIN_KEY + '/' + API_KEY + '/'+ sn +'/'+ DEVICE_MODEL +'/'+ FIRMWARE_VERSION +'/'+ MESSAGE_ID +'?type=JSON';
        var data = {
            "battery": event.batteryVoltage,
    	    "click": click
        }
            
        var options = {
            headers: {
            },
            url: URL,
            body: JSON.stringify(data)
        };

        request.post(options, function ocall(error, response, body){
                
                //console.log('response:', response);
                
                if(error){
                    context.fail(error);
                } 
                
                if(null != body){
                    context.succeed(body);
                }
        });

      
    }
    
};
