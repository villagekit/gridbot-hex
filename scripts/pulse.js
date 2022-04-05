const pigpio = require('pigpio')

const { Gpio } = pigpio

const args = process.argv.slice(2)

const pulseCount = Number(args[0])

if (pulseCount == null || isNaN(pulseCount)) {
  console.log('usage: node pulse.js <count>')
  return
}

console.log(`pulse ${pulseCount}`)

pigpio.initialize()

process.on('SIGINT', () => {
  if (pigpio.waveTxBusy()) {
    pigpio.waveTxStop()
  }
  pigpio.terminate()
})

const outPin = 5
const pulseOutput = new Gpio(outPin, {
  mode: Gpio.OUTPUT
})

const stepWaveForm = [
  {
    gpioOn: outPin,
    gpioOff: 0,
    usDelay: 9000
  },
  {
    gpioOn: 0,
    gpioOff: outPin,
    usDelay: 1000
  }
]

pigpio.waveClear()
pigpio.waveAddGeneric(stepWaveForm)

const stepWaveId = pigpio.waveCreate()

const pulseCount256 = Math.floor(pulseCount / 256)
const pulseCount1 = pulseCount % 256

const chain = [
  255, 0, // marks the beginning of a new wave
  stepWaveId,  // transmits stepWaveId
  255, 1, pulseCount1, pulseCount256, // repeats pulseCount times (pulse256Remainder + pulse256Count * 256 = pulseCount)
]

pigpio.waveChain(chain)

while (pigpio.waveTxBusy()) {}

pigpio.waveDelete(stepWaveId)
