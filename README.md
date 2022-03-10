# BeamMachine22

## local development

With Node.js > 8 installed (using `nvm`),

```shell
npm install -g node-red@1.2.9
```

```shell
node-red
```

```shell
cd ~/.node-red
npm install node-red-dashboard@2.28.2
npm install node-red-contrib-easing
npm install node-red-contrib-loop-processing
```

Open http://localhost:1880

Click top right menu > Import > Select a file to import > Import "flows.json"

## pins

- side stepper motor driver
  - pulse +: pwm0 / gpio18
  - pulse -: gnd
  - dir +: gpio11
  - dir -: gnd
