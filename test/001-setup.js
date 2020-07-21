'use strict'

/*
 * OVERIVEW: Testing the creation of a new Agilit-e instance of the Node Module
 * CATEGORIES:
 *
 * - API SERVER URL
 *    + Check that API Server URL is valid - (POSITIVE)
 *
 * - API KEY
 *    + Check that API Key is valid        - (POSITIVE)
 */

require('dotenv').config()
const expect = require('chai').expect
const Agilite = require('../controllers/agilite')
const Enums = require('../utils/enums')

const agilite = new Agilite({
  apiServerUrl: process.env.API_SERVER_URL,
  apiKey: process.env.API_KEY
})

describe('Agilit-e Initial Setup \n', function () {
  // this.bail(true)
  // let pattern = null
  describe('API Server URL', () => {
    describe('Negative Tests', () => {})

    describe('Positive Tests', () => {
      it('Check that API Server URL is valid - (POSITIVE)', (done) => {
        expect(agilite.getConfig()).to.haveOwnProperty('apiServerUrl')
        expect(agilite.getConfig().apiServerUrl).to.not.equal(Enums.STRING_EMPTY)
        // TODO: Check that apiServerUrl is a valid url string - I am unsure if this should be a Regex expression or if we need to implement a library that can do this for us?
        // pattern = new RegExp('^(https?:\\/\\/)?' + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + '((\\d{1,3}\\.){3}\\d{1,3}))' + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + '(\\?[;&a-z\\d%_.~+=-]*)?' + '(\\#[-a-z\\d_]*)?$', 'i')
        // expect(pattern.test(agilite.getConfig().apiServerUrl)).to.equal(true)
        done()
      })
    })
  })

  describe('API Key', () => {
    describe('Negative Tests', () => {
    })

    describe('Positive Tests', () => {
      it('Check that API Key is valid - (POSITIVE)', (done) => {
        expect(agilite.getConfig()).to.haveOwnProperty('apiKey')
        expect(agilite.getConfig().apiKey).to.not.equal(Enums.STRING_EMPTY)
        done()
      })
    })
  })
})