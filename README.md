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
  - dir +: gpio19
  - dir -: gnd
- limit switches
  - x min: gpio3
  - x max: gpio2
  - y min: gpio0
  - y max: gpio11
- relay-ext: i2c
