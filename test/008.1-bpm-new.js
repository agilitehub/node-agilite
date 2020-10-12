'use strict'

require('agilite-utils/dotenv').config()
const Agilite = require('../controllers/agilite')
const MochaAgiliteCon = require('../mocha-agilite/controller')
const BPMModel = require('../mocha-agilite/models/bpm')

const agilite = new Agilite({
  apiServerUrl: process.env.API_SERVER_URL,
  apiKey: process.env.API_KEY
})

describe('Agilit-e BPM \n', async () => { // eslint-disable-line
  let unitTests = null

  try {
    unitTests = await MochaAgiliteCon.init('bpm', true, BPMModel)
    for (const test of unitTests) MochaAgiliteCon.execute(test, agilite)

    //
  } catch (e) {
    console.log(e)
  }
})
