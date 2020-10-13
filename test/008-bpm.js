'use strict'

require('agilite-utils/dotenv').config()
const expect = require('chai').expect
const TypeDetect = require('agilite-utils/type-detect')
const EnumsTypeDetect = require('agilite-utils/enums-type-detect')

const Agilite = require('../controllers/agilite')
const MochaAgiliteCon = require('../mocha-agilite/controller')
const BPMModel = require('../test-models/bpm')
const DataTemplates = require('../test-data-templates/bpm')

const agilite = new Agilite({
  apiServerUrl: process.env.API_SERVER_URL,
  apiKey: process.env.API_KEY
})

describe('Agilit-e BPM', async () => { // eslint-disable-line
  const unitTests = await MochaAgiliteCon.init('bpm', true, BPMModel)
  for (const test of unitTests) MochaAgiliteCon.execute(test, agilite)

  describe('     CUSTOM: Unit Tests', async () => { // eslint-disable-line
    it(' -- No Name Prop (Negative)', (done) => { // eslint-disable-line
      agilite.BPM.postData(DataTemplates[0])
        .catch((err) => {
          expect(err).to.haveOwnProperty('response')
          expect(err.response.status).to.equal(400)
          expect(err.response).to.haveOwnProperty('data')
          expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

          // Check if errorMessage exists and contains correct error message
          expect(err.response.data).to.haveOwnProperty('errorMessage')
          expect(err.response.data.errorMessage).to.equal('Invalid request body. \'key\' property required')
        })
        .then(done, done)
    })
  })
})
