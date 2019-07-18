'use strict'

require('dotenv').config()
const UUID = require('uuid')
const TypeDetect = require('type-detect')
const expect = require('chai').expect
const Agilite = require('../controllers/agilite')
const Enums = require('../utils/enums')
const DataTemplate = require('../data-templates/tierstructures')

const agilite = new Agilite({
  apiServerUrl: process.env.API_SERVER_URL,
  apiKey: process.env.API_KEY
})

describe('Agilit-e Tier Structures', () => {
  let mainEntry = null
  let tmpEntry = null
  let recordId = null
  let key = UUID.v1()

  it('Create New Record', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.new))
    mainEntry.data.key = key

    agilite.TierStructures.postData(mainEntry)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_OBJECT_PROPER)

        // Check if Optional Fields exists
        expect(response.data.data).to.haveOwnProperty('isActive')
        expect(response.data.data).to.haveOwnProperty('description')
        expect(response.data.data).to.haveOwnProperty('notes')
        expect(response.data.data).to.haveOwnProperty('tierEntries')

        // Compare Values to confirm that data passed is the same as the data returned
        expect(response.data.data.key).to.equal(mainEntry.data.key)
        expect(response.data.data.values.length).to.equal(1)

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

    agilite.TierStructures.getData()
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

  it('Update Record', (done) => {
    expect(recordId).to.not.equal(null)
    key = 'PUT_' + key

    mainEntry = JSON.parse(JSON.stringify(DataTemplate.modified))
    mainEntry.data.key = key

    agilite.TierStructures.putData(recordId, mainEntry)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_OBJECT_PROPER)

        // Check if Tier Entries has more than 1 value
        expect(response.data.data.tierEntries.length).to.be.greaterThan(0)
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Get Tier By Key - Tier 1', (done) => {
    agilite.TierStructures.getTierByKey([key], true, false, false, agilite.TierStructures.sort.ASC, agilite.TierStructures.outputFormat.ARRAY)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_ARRAY_PROPER)
        expect(response.data.length).to.be.greaterThan(0)
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Delete Record', (done) => {
    expect(recordId).to.not.equal(null)

    agilite.TierStructures.deleteData(recordId)
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
