var mqtt = require('mqtt');

var DOMAIN_KEY = process.env.DOMAIN_KEY;
var API_KEY = process.env.API_KEY;
var MESSAGE_ID = process.env.MESSAGE_ID;
var DEVICE_MODEL = 'AWSIOTBTN';
var FIRMWARE_VERSION = '1.0.0';

exports.handler = (event, context, callback) => {
    
        var sn = event.serialNumber;
        
        if(sn == null || typeof sn === 'undefined'){
           
             context.fail('Invalid Event');
    
        }else{
                
                var options = {
                        clientId:"DEV_" + sn,
                        username:"DEV_" + DOMAIN_KEY,
                        password: API_KEY,
                        clean:true
                };

                var url = 'mqtt://mqtt.boodskap.io';
                var topic = '/'+ DOMAIN_KEY +'/device/'+ sn +'/msgs/'+ MESSAGE_ID +'/'+ DEVICE_MODEL +'/' + FIRMWARE_VERSION;
                var click = 1; 	
                if(event.clickType === 'DOUBLE'){
                    click = 2;
                }
                var packet = {
                    'click': click,
                    'battery': event.batteryVoltage
                };
                  

                var client = mqtt.connect(url, options)

                client.on("connect",function(){	
                        console.log(topic + ':', JSON.stringify(packet));
                        client.publish(topic, JSON.stringify(packet), {qos:0});
                        context.succeed('Success');
                })

                client.on("error",function(error){
                        console.error(error);
                        context.fail("MQTT Connect failed");
                });
                
                
        }
        
    };