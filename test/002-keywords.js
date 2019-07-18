'use strict'

require('dotenv').config()
const UUID = require('uuid')
const TypeDetect = require('type-detect')
const expect = require('chai').expect
const Agilite = require('../controllers/agilite')
const Enums = require('../utils/enums')
const DataTemplate = require('../data-templates/keywords')

const agilite = new Agilite({
  apiServerUrl: process.env.API_SERVER_URL,
  apiKey: process.env.API_KEY
})

describe('Agilit-e Keywords', () => {
  let mainEntry = null
  let tmpEntry = null
  let recordId = null
  let key = UUID.v1()
  let groupName = UUID.v1()

  it('Create New Record', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.new))
    mainEntry.data.key = key

    agilite.Keywords.postData(mainEntry)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_OBJECT_PROPER)

        // Check if GroupName exists and is blank
        expect(response.data.data).to.haveOwnProperty('groupName')
        expect(response.data.data.groupName).to.equal(Enums.STRING_EMPTY)

        // Compare Values object to confirm that data passed is the same as the data returned
        expect(JSON.stringify(response.data.data.values)).to.equal(JSON.stringify(mainEntry.data.values))

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

    agilite.Keywords.getData()
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_ARRAY_PROPER)
        expect(response.data.length).to.be.greaterThan(0)

        for (let x in response.data) {
          tmpEntry = response.data[x]

          if (tmpEntry._id === recordId) {
            // Check that data and values objects exist
            expect(tmpEntry).to.haveOwnProperty('data')
            expect(tmpEntry.data).to.haveOwnProperty('values')

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
    mainEntry.data.groupName = groupName

    agilite.Keywords.putData(recordId, mainEntry)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_OBJECT_PROPER)

        // Check if GroupName exists and contains passed value
        expect(response.data.data).to.haveOwnProperty('groupName')
        expect(response.data.data.groupName).to.equal(mainEntry.data.groupName)

        // Compare Values object to confirm that data passed is the same as the data returned
        expect(JSON.stringify(response.data.data.values)).to.equal(JSON.stringify(mainEntry.data.values))
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Get By Profile Key', (done) => {
    expect(key).to.not.equal(null)

    agilite.Keywords.getByProfileKey(key)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_ARRAY_PROPER)
        expect(response.data.length).to.be.greaterThan(0)
        expect(JSON.stringify(response.data)).to.equal(JSON.stringify(mainEntry.data.values))

        // Get first entry and check if there is a label and value property
        tmpEntry = response.data[0]
        expect(tmpEntry).to.haveOwnProperty('label')
        expect(tmpEntry).to.haveOwnProperty('value')
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Get Profile Keys by Group', (done) => {
    expect(groupName).to.not.equal(null)

    agilite.Keywords.getProfileKeysByGroup(groupName)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_ARRAY_PROPER)
        expect(response.data.length).to.be.greaterThan(0)
        expect(JSON.stringify(response.data)).to.equal(JSON.stringify([key]))
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Get Label By Value', (done) => {
    agilite.Keywords.getLabelByValue(key, mainEntry.data.values[0].value)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_STRING_LOWER)
        expect(response.data).to.equal(mainEntry.data.values[0].label)
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Get Value By Label', (done) => {
    agilite.Keywords.getValueByLabel(key, mainEntry.data.values[0].label)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_STRING_LOWER)
        expect(response.data).to.equal(mainEntry.data.values[0].value)
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Delete Record', (done) => {
    expect(recordId).to.not.equal(null)

    agilite.Keywords.deleteData(recordId)
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
