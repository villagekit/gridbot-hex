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
npm install node-red-contrib-loop-processing
```

Open http://localhost:1880

Click top right menu > Import > Select a file to import > Import "flows.json"

## notes

### pulse.csv

The machine code expects the following files:

`step-pulse-slow.csv`

```csv
9000,1000
```

`step-pulse-fast.csv`

```csv
800,200
```

### pins

- side stepper motor driver
  - pulse +: gpio18
  - pulse -: gnd 
  - dir +: gpio19 (left is LOW, right is HIGH)t 
  - dir -: gnd
- limit switches
  - x min (Right switch from front): gpio3
  - x max: gpio2
  - y min (bottom switch): gpio11
  - y max: gpio0
- relay-exp [relay expansion board]: i2c

![](https://github.com/villagekit/BeamMachine22/blob/main/OMEGA%20Onion%202%20Pro%20pin-out%20details.png)
