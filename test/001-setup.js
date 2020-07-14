'use strict'

/*
 * OVERIVEW: Testing the creation of a new Agilit-e instance of the Node Module
 * CATEGORIES:
 * - Initial Setup
 *   TESTS:
 *    - Check that API Server URL is valid - (POSITIVE)
 *    - Check that API Key is valid - (POSITIVE)
 */

require('dotenv').config()
const expect = require('chai').expect
const Agilite = require('../controllers/agilite')
const Enums = require('../utils/enums')

const agilite = new Agilite({
  apiServerUrl: process.env.API_SERVER_URL,
  apiKey: process.env.API_KEY
})

describe('Initial Setup', () => {
  it('Check that API Server URL is valid - (POSITIVE)', (done) => {
    expect(agilite.getConfig()).to.haveOwnProperty('apiServerUrl')
    expect(agilite.getConfig().apiServerUrl).to.not.equal(Enums.STRING_EMPTY)
    // TODO: Check that apiServerUrl is a valid url string
    done()
  })

  it('Check that API Key is valid - (POSITIVE)', (done) => {
    expect(agilite.getConfig()).to.haveOwnProperty('apiKey')
    expect(agilite.getConfig().apiKey).to.not.equal(Enums.STRING_EMPTY)
    done()
  })
})
