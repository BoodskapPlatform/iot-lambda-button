# AWS IoT Button Integration with Boodskap IoT Platform

```sh
$ npm install mqtt --save
$ npm install dgram --save
$ npm install request --save
$ npm run pack
```

At this point, you should have boodskap-iot-button.zip file created

# Upload the zip to AWS Lambda Function

You can pick one of the implementation (HTTP | MQTT | UDP) as request handler

```sh
httpimpl.handler
mqttimpl.handler
udpimpl.handler
```

| Releases | Link |
| ------ | ------ |
| 1.0.0 | https://github.com/BoodskapPlatform/iot-lambda-button/releases/download/1.0.0/boodskap-iot-button.zip|
