'use strict'

require('dotenv').config()
const UUID = require('uuid')
const TypeDetect = require('type-detect')
const expect = require('chai').expect
const Agilite = require('../controllers/agilite')
const Enums = require('../utils/enums')
const DataTemplate = require('../data-templates/templates')

const agilite = new Agilite({
  apiServerUrl: process.env.API_SERVER_URL,
  apiKey: process.env.API_KEY
})

describe('Agilit-e Templates', () => {
  let mainEntry = null
  let tmpEntry = null
  let recordId = null
  let key = UUID.v1()

  it('Create New Record', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.new))
    mainEntry.data.key = key

    agilite.Templates.postData(mainEntry)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_OBJECT_PROPER)

        // Compare values to confirm that data passed is the same as the data returned
        expect(response.data.data.key).to.equal(key)

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

    agilite.Templates.getData()
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_ARRAY_PROPER)
        expect(response.data.length).to.be.greaterThan(0)

        for (let x in response.data) {
          tmpEntry = response.data[x]

          if (tmpEntry._id === recordId) {
            // Check for certain properties to exisst
            expect(tmpEntry).to.haveOwnProperty('data')

            // Check if the returned object is a Slim Result
            // TODO: expect(tmpEntry.createdBy).to.equal(undefined)
          }
        }
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

    agilite.Templates.putData(recordId, mainEntry)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_OBJECT_PROPER)

        // Compare Values object to confirm that data passed is the same as the data returned
        expect(response.data.data.key).to.equal(key)
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Execute', (done) => {
    expect(key).to.not.equal(null)

    agilite.Templates.execute(key)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_STRING_LOWER)
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Delete Record', (done) => {
    expect(recordId).to.not.equal(null)

    agilite.Templates.deleteData(recordId)
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
