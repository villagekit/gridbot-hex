const pigpio = require('pigpio')
const createStepperRamp = require('@villagekit/stepper-ramp')

const { Gpio } = pigpio

const args = process.argv.slice(2)

const pulseCount = Number(args[0])
const speed = String(args[1])

if (
  (pulseCount == null || isNaN(pulseCount))
  || (speed !== 'slow' && speed !== 'fast')
) {
  console.log('usage: node pulse.js <count> <speed>')
  return
}


console.log(`pulse ${pulseCount} ${speed}`)

let isKilled = false

pigpio.initialize()
process.on('SIGINT', () => {
  pigpio.terminate()

  isKilled = true
})

const outPin = 5
const pulseOutput = new Gpio(outPin, {
  mode: Gpio.OUTPUT
})

pulseOutput.digitalWrite(1)

const { waves, chain } = createWaveChain()

pigpio.waveChain(chain)

function tick () {
  if (isKilled) return

  if (pigpio.waveTxBusy()) {
    setImmediate(tick)
    return
  }

  for (let waveId of waves) {
    pigpio.waveDelete(waveId)
  }
}

setImmediate(tick)

/* --- */

function createWaveChain() {
  const targetSpeedInStepsPerSec = speed === 'fast' ? 1000 : 400
  const accelerationInStepsPerSecPerSec = speed === 'fast' ? 4000 : 800

  const stepperRamp = createStepperRamp({
    targetSpeedInStepsPerSec,
    accelerationInStepsPerSecPerSec,
  })

  const movement = stepperRamp.movement(pulseCount)

  let pulses = []
  let nextPulse = null
  let lastPeriodInUs = null

  for (let periodInUs of movement) {
    if (periodInUs === lastPeriodInUs) {
      nextPulse.count++
    } else {
      if (nextPulse !== null) {
        pulses.push(nextPulse)
      }
      nextPulse = {
        periodInUs,
        count: 1
      }
    }

    lastPeriodInUs = periodInUs
  }
  // push last pulse
  pulses.push(nextPulse)

  let waves = []
  let chain = []
  const pulseInUs = 20

  pigpio.waveClear()

  for (let pulse of pulses) {
    const stepWaveForm = [
      {
        gpioOn: 0,
        gpioOff: outPin,
        usDelay: pulseInUs
      },
      {
        gpioOn: outPin,
        gpioOff: 0,
        usDelay: pulse.periodInUs - pulseInUs
      },
    ]
    pigpio.waveAddGeneric(stepWaveForm)
    const stepWaveId = pigpio.waveCreate()
    if (stepWaveId < 0) throw new Error("Failed to create wave id")
    waves.push(stepWaveId)

    if (pulse.count === 1) {
      // single pulse
      chain.push(stepWaveId)
    } else {
      // looped pulse
      const pulseCount256 = Math.floor(pulse.count / 256)
      const pulseCount1 = pulse.count % 256

      chain.push(
        255, 0, // marks the beginning of a new wave
        stepWaveId,  // transmits stepWaveId
        255, 1, pulseCount1, pulseCount256, // repeats pulseCount times (pulse256Remainder + pulse256Count * 256 = pulseCount)
      )
    }
  }

  return { waves, chain }
}
