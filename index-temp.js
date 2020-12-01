const MochaAgiliteCon = require('./mocha-agilite/controller')
const BPMModel = require('./test-models/bpm')

;(async () => {
  const unitTests = await MochaAgiliteCon.init('bpm', true, BPMModel)
  console.log(unitTests.length)
})()
