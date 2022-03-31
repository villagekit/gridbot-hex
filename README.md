# BeamMachine22

## pi setup

[install node-red](https://nodered.org/docs/getting-started/raspberrypi)

```shell
bash <(curl -sL https://raw.githubusercontent.com/node-red/linux-installers/master/deb/update-nodejs-and-nodered)
```

```shell
sudo systemctl enable nodered.service
```

```shell
node-red-start
```

install pigpio:

```shell
sudo apt update
sudo apt install pigpio
```

install npm packages:

```shell
cd ~/.node-red
npm install pigpio
npm install onoff
```

install node-red packages

- `node-red-dashboard` 
- `node-red-contrib-loop-processing`

## local development

With Node.js > 12 installed (using `nvm`),

```shell
npm install -g node-red
```

```shell
node-red
```

```shell
cd ~/.node-red
npm install node-red-dashboard
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

https://pinout.xyz/#

- limit switches:
  - x min (right switch from front): GPIO 17
  - x max: GPIO 27
  - y min (bottom switch): GPIO 22
  - y max: GPIO 10
- x motor:
  - pulse +: GPIO 5
  - dir +: GPIO 6
- y motor:
  - up relay: GPIO 23
  - down relay: GPIO 24
- spindle motor:
  - speed up relay: GPIO 25
  - speed down relay: GPIO 8
