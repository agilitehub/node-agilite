'use strict'

require('dotenv').config()
const UUID = require('uuid')
const TypeDetect = require('type-detect')
const expect = require('chai').expect
const Agilite = require('../controllers/agilite')
const Enums = require('../utils/enums')
const DataTemplate = require('../data-templates/numbering')

const agilite = new Agilite({
  apiServerUrl: process.env.API_SERVER_URL,
  apiKey: process.env.API_KEY
})

describe('Agilit-e Numbering', () => {
  let mainEntry = null
  let tmpEntry = null
  let recordId = null
  let key = UUID.v1()
  let groupName = UUID.v1()

  it('Create New Record', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.new))
    mainEntry.data.key = key
    mainEntry.data.name = key

    agilite.Numbering.postData(mainEntry)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_OBJECT_PROPER)

        // Check if Optional Fields exists
        expect(response.data.data).to.haveOwnProperty('description')
        expect(response.data.data).to.haveOwnProperty('groupName')
        expect(response.data.data).to.haveOwnProperty('prefix')
        expect(response.data.data).to.haveOwnProperty('suffix')
        expect(response.data.data).to.haveOwnProperty('startAt')
        expect(response.data.data).to.haveOwnProperty('incrementBasedOn')
        expect(response.data.data).to.haveOwnProperty('minLength')

        // Compare Values to confirm that data passed is the same as the data returned
        expect(response.data.data.name).to.equal(mainEntry.data.name)

        // Store Record Id to be used later
        recordId = response.data._id
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Get Data - Slim Result - Find Record By Id', (done) => {
    expect(recordId).to.not.equal(null)

    agilite.Numbering.getData()
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_ARRAY_PROPER)
        expect(response.data.length).to.be.greaterThan(0)

        for (let x in response.data) {
          tmpEntry = response.data[x]

          if (tmpEntry._id === recordId) {
            // Check that data objects exist
            expect(tmpEntry).to.haveOwnProperty('data')

            // Check if the returned object is a Slim Result
            expect(tmpEntry.createdBy).to.equal(undefined)
          }
        }
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Generate Number - Test 1', (done) => {
    expect(key).to.not.equal(null)

    agilite.Numbering.generate(key, agilite.Numbering.outputFormat.STRING, null)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_NUMBER_LOWER)
        expect(response.data).to.equal(1)
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Update Record', (done) => {
    expect(recordId).to.not.equal(null)
    key = 'PUT_' + key

    mainEntry = JSON.parse(JSON.stringify(DataTemplate.modified))
    mainEntry.data.key = key
    mainEntry.data.name = key
    mainEntry.data.groupName = groupName

    agilite.Numbering.putData(recordId, mainEntry)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_OBJECT_PROPER)

        // Check if GroupName exists and contains passed value
        expect(response.data.data).to.haveOwnProperty('groupName')
        expect(response.data.data.groupName).to.equal(mainEntry.data.groupName)
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Generate Number - Test 2', (done) => {
    expect(key).to.not.equal(null)

    agilite.Numbering.generate(key, agilite.Numbering.outputFormat.STRING, null)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_STRING_LOWER)
        expect(response.data).to.equal('PRE00010SUF')
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Generate Number - Test 3', (done) => {
    expect(key).to.not.equal(null)

    agilite.Numbering.generate(key, agilite.Numbering.outputFormat.STRING, null)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_STRING_LOWER)
        expect(response.data).to.equal('PRE00011SUF')
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Reset Numbering Counters', (done) => {
    expect(recordId).to.not.equal(null)

    agilite.Numbering.resetCounters(recordId)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_OBJECT_PROPER)
        expect(JSON.stringify(response.data)).to.equal('{}')
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Generate Number - Test 4', (done) => {
    expect(key).to.not.equal(null)

    agilite.Numbering.generate(key, agilite.Numbering.outputFormat.STRING, null)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_STRING_LOWER)
        expect(response.data).to.equal('PRE00010SUF')
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Delete Record', (done) => {
    expect(recordId).to.not.equal(null)

    agilite.Numbering.deleteData(recordId)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_OBJECT_PROPER)
        expect(JSON.stringify(response.data)).to.equal('{}')
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })
})
