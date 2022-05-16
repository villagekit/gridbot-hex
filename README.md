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
sudo apt install onoff
```

install npm packages:

```shell
cd ~/.node-red
npm install pigpio
```

install node-red packages

- `node-red-dashboard` 
- `node-red-contrib-loop-processing`
- `node-red-simple-gate`
- `node-red-contrib-countdown`

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

### scripts

The machine code expects the files in `./scripts` to be in the `pi` user's home directory.

```shell
cd
mkdir scripts
```

```shell
scp -P 14131 ./scripts/*.(js|json) pi@machine:scripts
```

```shell
cd ./scripts
npm install
```

### pins

https://pinout.xyz/#

- limit switches:
  - gnd: Pin 9
  - x min (right switch from front): Pin 11 / GPIO 17
  - x max: Pin 13 / GPIO 27
  - y min (bottom switch): Pin 15 / GPIO 22
  - 3.3v: Pin 17
  - y max: Pin 19 / GPIO 10
- x motor:
  - pulse +: GPIO 5
  - dir +: GPIO 6
- y motor:
  - up relay: GPIO 23
  - down relay: GPIO 24
- spindle motor:
  - speed up relay: GPIO 8
  - speed down relay: GPIO 25
  - speed off: GPIO 7
