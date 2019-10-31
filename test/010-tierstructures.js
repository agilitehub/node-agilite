'use strict'

require('dotenv').config()
const UUID = require('uuid')
const TypeDetect = require('type-detect')
const expect = require('chai').expect
const Agilite = require('../controllers/agilite')
const EnumsTypeDetect = require('../utils/enums-type-detect')
const Enums = require('../utils/enums')
const DataTemplate = require('../data-templates/tierstructures')

const agilite = new Agilite({
  apiServerUrl: process.env.API_SERVER_URL,
  apiKey: process.env.API_KEY
})

describe('Agilit-e Tier Structures', () => {
  const invalidValue = 'invalid_value'

  let mainEntry = null
  let tmpEntry = null
  let recordId = null
  let key = UUID.v1()

  it('Create New Record - No Params (Negative)', (done) => {
    agilite.TierStructures.postData()
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('No \'data\' property found in JSON Body')
      })
      .then(done, done)
  })

  it('Create New Record - Empty Object (Negative)', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyObject))

    agilite.TierStructures.postData(mainEntry)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('No \'data\' property found in JSON Body')
      })
      .then(done, done)
  })

  it('Create New Record - No Profile Key (Negative)', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyDataObject))

    agilite.TierStructures.postData(mainEntry)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('Please provide a valid Profile \'key\'')
      })
      .then(done, done)
  })

  it('Create New Record - Invalid Values Data Type (Negative)', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyDataObject))
    mainEntry.data.key = key
    mainEntry.data.values = invalidValue

    agilite.TierStructures.postData(mainEntry)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('Array property \'values\' not properly defined')
      })
      .then(done, done)
  })

  it('Create New Record - Invalid Values Array Entry (Negative)', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.invalidValues.invalidObject))
    mainEntry.data.key = key

    agilite.TierStructures.postData(mainEntry)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('Please provide a valid \'label\' property in the \'values\' entry')
      })
      .then(done, done)
  })

  it('Create New Record - Invalid Label Property (Negative)', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.invalidValues.invalidLabel))
    mainEntry.data.key = key

    agilite.TierStructures.postData(mainEntry)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('Please provide a valid \'label\' property in the \'values\' entry')
      })
      .then(done, done)
  })

  it('Create New Record - Invalid Value Property (Negative)', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.invalidValues.invalidValue))
    mainEntry.data.key = key

    agilite.TierStructures.postData(mainEntry)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('Please provide a valid \'value\' property in the \'values\' entry')
      })
      .then(done, done)
  })

  it('Create New Record - Success', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.new))
    mainEntry.data.key = key

    agilite.TierStructures.postData(mainEntry)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if provided values match
        expect(response.data.data).to.haveOwnProperty('key')
        expect(response.data.data.key).to.equal(key)
        expect(JSON.stringify(response.data.data.values)).to.equal(JSON.stringify(mainEntry.data.values))

        // Check if unprovided values exist and have defaults
        expect(response.data).to.haveOwnProperty('_id')
        expect(response.data._id).to.not.equal(Enums.STRING_EMPTY)
        expect(response.data).to.haveOwnProperty('__v')
        expect(TypeDetect(response.data.__v)).to.equal(EnumsTypeDetect.NUMBER)
        expect(response.data).to.haveOwnProperty('createdBy')
        expect(response.data.createdBy).to.not.equal(Enums.STRING_EMPTY)
        expect(response.data).to.haveOwnProperty('modifiedBy')
        expect(response.data.modifiedBy).to.not.equal(Enums.STRING_EMPTY)
        expect(response.data).to.haveOwnProperty('createdAt')
        expect(response.data.createdAt).to.not.equal(Enums.STRING_EMPTY)
        expect(response.data).to.haveOwnProperty('updatedAt')
        expect(response.data.updatedAt).to.not.equal(Enums.STRING_EMPTY)
        expect(response.data.data).to.haveOwnProperty('isActive')
        expect(response.data.data.isActive).to.equal(true)
        expect(response.data.data).to.haveOwnProperty('description')
        expect(response.data.data.description).to.equal(Enums.STRING_EMPTY)
        expect(response.data.data).to.haveOwnProperty('notes')
        expect(response.data.data.notes).to.equal(Enums.STRING_EMPTY)
        expect(response.data.data).to.haveOwnProperty('tierEntries')
        expect(TypeDetect(response.data.data.tierEntries)).to.equal(Enums.VALUE_ARRAY_PROPER)

        // Store Record Id to be used later
        recordId = response.data._id
      })
      .then(done, done)
  })

  it('Get Data - Slim Result - Find Record By Id - Success', (done) => {
    agilite.TierStructures.getData()
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.ARRAY)
        expect(response.data.length).to.be.greaterThan(0)

        for (const x in response.data) {
          tmpEntry = response.data[x]

          expect(tmpEntry).to.haveOwnProperty('_id')
          expect(tmpEntry._id).to.not.equal(Enums.STRING_EMPTY)

          if (tmpEntry._id === recordId) {
            // Check that the values part of the slim result is returned
            expect(tmpEntry).to.haveOwnProperty('data')
            expect(tmpEntry.data).to.haveOwnProperty('values')
            expect(tmpEntry.data).to.haveOwnProperty('isActive')
            expect(TypeDetect(tmpEntry.data.isActive)).to.equal(EnumsTypeDetect.BOOLEAN)
            expect(tmpEntry.data).to.haveOwnProperty('description')
            expect(TypeDetect(tmpEntry.data.description)).to.equal(EnumsTypeDetect.STRING)
            expect(tmpEntry.data).to.haveOwnProperty('notes')
            expect(TypeDetect(tmpEntry.data.notes)).to.equal(EnumsTypeDetect.STRING)
            expect(tmpEntry.data).to.haveOwnProperty('tierEntries')
            expect(TypeDetect(tmpEntry.data.tierEntries)).to.equal(Enums.VALUE_ARRAY_PROPER)

            // Check that the values NOT part of the slim result aren't returned
            expect(tmpEntry.createdBy).to.equal(undefined)
            expect(tmpEntry.modifiedBy).to.equal(undefined)
            expect(tmpEntry.createdAt).to.equal(undefined)
            expect(tmpEntry.updatedAt).to.equal(undefined)
            expect(tmpEntry.__v).to.equal(undefined)
          }
        }
      })
      .then(done, done)
  })

  it('Update Existing Record - No Params (Negative)', (done) => {
    agilite.TierStructures.putData()
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('No Id was specified in the \'record-id\' header parameter')
      })
      .then(done, done)
  })

  it('Update Existing Record - No Data Param (Negative)', (done) => {
    agilite.TierStructures.putData(recordId)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('No \'data\' property found in JSON Body')
      })
      .then(done, done)
  })

  it('Update Existing Record - Empty Object Data Param (Negative)', (done) => {
    agilite.TierStructures.putData(recordId, {})
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('No \'data\' property found in JSON Body')
      })
      .then(done, done)
  })

  it('Update Existing Record - No Profile Key (Negative)', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyDataObject))

    agilite.TierStructures.putData(recordId, mainEntry)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('Please provide a valid Profile \'key\'')
      })
      .then(done, done)
  })

  it('Update Existing Record - Invalid Values Data Type (Negative)', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyDataObject))
    mainEntry.data.key = key
    mainEntry.data.values = invalidValue

    agilite.TierStructures.putData(recordId, mainEntry)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('Array property \'values\' not properly defined')
      })
      .then(done, done)
  })

  it('Update Existing Record - Invalid Values Array Entry (Negative)', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.invalidValues.invalidObject))
    mainEntry.data.key = key

    agilite.TierStructures.putData(recordId, mainEntry)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('Please provide a valid \'label\' property in the \'values\' entry')
      })
      .then(done, done)
  })

  it('Update Existing Record - Invalid Label Property (Negative)', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.invalidValues.invalidLabel))
    mainEntry.data.key = key

    agilite.TierStructures.putData(recordId, mainEntry)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('Please provide a valid \'label\' property in the \'values\' entry')
      })
      .then(done, done)
  })

  it('Update Existing Record - Invalid Value Property (Negative)', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.invalidValues.invalidValue))
    mainEntry.data.key = key

    agilite.TierStructures.putData(recordId, mainEntry)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('Please provide a valid \'value\' property in the \'values\' entry')
      })
      .then(done, done)
  })

  it('Update Existing Record - Invalid Record ID (Negative)', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.modified))
    mainEntry.data.key = key

    agilite.TierStructures.putData(invalidValue, mainEntry)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal(`Record with id: '${invalidValue}' cannot be found`)
      })
      .then(done, done)
  })

  it('Update Existing Record - Success', (done) => {
    key = 'PUT_' + key
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.modified))
    mainEntry.data.key = key

    agilite.TierStructures.putData(recordId, mainEntry)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if provided values match
        expect(response.data.data).to.haveOwnProperty('key')
        expect(response.data.data.key).to.equal(key)
        expect(JSON.stringify(response.data.data.values)).to.equal(JSON.stringify(mainEntry.data.values))
        expect(response.data.data.description).to.equal(mainEntry.data.description)
        expect(response.data.data.notes).to.equal(mainEntry.data.notes)
        expect(TypeDetect(response.data.data.tierEntries)).to.equal(Enums.VALUE_ARRAY_PROPER)
        expect(response.data.data.tierEntries.length).to.equal(1)

        // Check if unprovided values exist and have defaults
        expect(response.data).to.haveOwnProperty('_id')
        expect(response.data._id).to.not.equal(Enums.STRING_EMPTY)
        expect(response.data).to.haveOwnProperty('__v')
        expect(TypeDetect(response.data.__v)).to.equal(EnumsTypeDetect.NUMBER)
        expect(response.data).to.haveOwnProperty('createdBy')
        expect(response.data.createdBy).to.not.equal(Enums.STRING_EMPTY)
        expect(response.data).to.haveOwnProperty('modifiedBy')
        expect(response.data.modifiedBy).to.not.equal(Enums.STRING_EMPTY)
        expect(response.data).to.haveOwnProperty('createdAt')
        expect(response.data.createdAt).to.not.equal(Enums.STRING_EMPTY)
        expect(response.data).to.haveOwnProperty('updatedAt')
        expect(response.data.updatedAt).to.not.equal(Enums.STRING_EMPTY)
        expect(response.data.data).to.haveOwnProperty('isActive')
        expect(response.data.data.isActive).to.equal(true)
      })
      .then(done, done)
  })

  it('Get Tier By Key - No Tier Keys (Negative)', (done) => {
    agilite.TierStructures.getTierByKey()
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('No Tier Keys were specified in the \'tier-keys\' header parameter')
      })
      .then(done, done)
  })

  it('Get Tier By Key - Invalid Tier Key (Negative)', (done) => {
    agilite.TierStructures.getTierByKey([invalidValue])
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal(`Active Tier Structure cannot be found - ${invalidValue}`)
      })
      .then(done, done)
  })

  it('Get Tier By Key - Success', (done) => {
    agilite.TierStructures.getTierByKey([key])
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.ARRAY)
        expect(response.data.length).to.be.greaterThan(0)
        expect(JSON.stringify(response.data)).to.equal(JSON.stringify(mainEntry.data.values))
      })
      .then(done, done)
  })

  it('Get Tier By Key - Include Meta Data & Tier Entries - Success', (done) => {
    agilite.TierStructures.getTierByKey([key], true, true, true)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
        expect(response.data).to.haveOwnProperty('key')
        expect(response.data).to.haveOwnProperty('description')
        expect(response.data).to.haveOwnProperty('notes')
        expect(response.data).to.haveOwnProperty('values')
        expect(response.data).to.haveOwnProperty('isActive')

        expect(response.data.key).to.equal(mainEntry.data.key)
        expect(response.data.description).to.equal(mainEntry.data.description)
        expect(response.data.notes).to.equal(mainEntry.data.notes)
      })
      .then(done, done)
  })

  it('Get Tier By Key - Invalid Sort - Success', (done) => {
    agilite.TierStructures.getTierByKey([key], true, false, false, invalidValue)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.ARRAY)
        expect(response.data.length).to.be.greaterThan(0)
        expect(JSON.stringify(response.data)).to.equal(JSON.stringify(mainEntry.data.values))
      })
      .then(done, done)
  })

  it('Get Tier By Key - Invalid Sort - Invalid Output Format - Success', (done) => {
    agilite.TierStructures.getTierByKey([key], true, false, false, invalidValue, invalidValue)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.ARRAY)
        expect(response.data.length).to.be.greaterThan(0)
        expect(JSON.stringify(response.data)).to.equal(JSON.stringify(mainEntry.data.values))
      })
      .then(done, done)
  })

  it('Get Tier By Key - JSON Output Format - Success', (done) => {
    agilite.TierStructures.getTierByKey([key], true, false, false, '', 'json')
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
      })
      .then(done, done)
  })

  it('Delete Record - No Record Id (Negative)', (done) => {
    agilite.TierStructures.deleteData()
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('No Id was specified in the \'record-id\' header parameter')
      })
      .then(done, done)
  })

  it('Delete Record - Invalid Record Id (Negative)', (done) => {
    agilite.TierStructures.deleteData(invalidValue)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal(`Record with id: '${invalidValue}' cannot be found`)
      })
      .then(done, done)
  })

  it('Delete Record - Success', (done) => {
    agilite.TierStructures.deleteData(recordId)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
        expect(JSON.stringify(response.data)).to.equal('{}')
      })
      .then(done, done)
  })
})
