'use strict'

require('agilite-utils/dotenv').config()
const UUID = require('agilite-utils/uuid')
const TypeDetect = require('agilite-utils/type-detect')
const expect = require('chai').expect
const Agilite = require('../dist/controllers/agilite')
const EnumsTypeDetect = require('agilite-utils/enums-type-detect')
const { Enums } = require('../dist/utils/enums')
const DataTemplate = require('../data-templates/keywords')

const agilite = new Agilite({
  apiServerUrl: process.env.API_SERVER_URL,
  apiKey: process.env.API_KEY
})

describe('Agilit-e Keywords', () => {
  const groupName = UUID.v1()
  const invalidValue = 'invalid_value'

  let mainEntry = null
  let tmpEntry = null
  let recordId = null
  let key = UUID.v1()

  it('Create New Record - No Params (Negative)', (done) => {
    agilite.Keywords.postData()
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

    agilite.Keywords.postData(mainEntry)
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

    agilite.Keywords.postData(mainEntry)
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

  it('Create New Record - No Values Array (Negative)', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyDataObject))
    mainEntry.data.key = key

    agilite.Keywords.postData(mainEntry)
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

  it('Create New Record - Invalid Values Data Type (Negative)', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyDataObject))
    mainEntry.data.key = key
    mainEntry.data.values = invalidValue

    agilite.Keywords.postData(mainEntry)
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

  it('Create New Record - Empty Values (Negative)', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyValues))
    mainEntry.data.key = key

    agilite.Keywords.postData(mainEntry)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('At least 1 \'values\' JSON entry is required')
      })
      .then(done, done)
  })

  it('Create New Record - Success', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.new))
    mainEntry.data.key = key

    agilite.Keywords.postData(mainEntry)
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

        // Store Record Id to be used later
        recordId = response.data._id
      })
      .then(done, done)
  })

  it('Get Data - Slim Result - Find Record By Id - Success', (done) => {
    agilite.Keywords.getData()
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
    agilite.Keywords.putData()
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('Validation Failed. \'record-id\' Header parameter required')
      })
      .then(done, done)
  })

  it('Update Existing Record - No Data Param (Negative)', (done) => {
    agilite.Keywords.putData(recordId)
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
    agilite.Keywords.putData(recordId, {})
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

    agilite.Keywords.putData(recordId, mainEntry)
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

  it('Update Existing Record - No Values Array (Negative)', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyDataObject))
    mainEntry.data.key = key

    agilite.Keywords.putData(recordId, mainEntry)
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

  it('Update Existing Record - Invalid Values Data Type (Negative)', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyDataObject))
    mainEntry.data.key = key
    mainEntry.data.values = invalidValue

    agilite.Keywords.putData(recordId, mainEntry)
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

  it('Update Existing Record - Empty Values (Negative)', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyValues))
    mainEntry.data.key = key

    agilite.Keywords.putData(recordId, mainEntry)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('At least 1 \'values\' JSON entry is required')
      })
      .then(done, done)
  })

  it('Update Existing Record - Invalid Record ID (Negative)', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.modified))
    mainEntry.data.key = key

    agilite.Keywords.putData(invalidValue, mainEntry)
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
    key = 'put_' + key
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.modified))
    mainEntry.data.key = key
    mainEntry.data.groupName = groupName

    agilite.Keywords.putData(recordId, mainEntry)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if provided values match
        expect(response.data.data).to.haveOwnProperty('key')
        expect(response.data.data.key).to.equal(key)
        expect(response.data.data).to.haveOwnProperty('groupName')
        expect(response.data.data.groupName).to.equal(groupName)
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
      })
      .then(done, done)
  })

  it('Get By Profile Key - No Profile Key (Negative)', (done) => {
    agilite.Keywords.getValuesByProfileKey()
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('Validation Failed. \'profile-key\' Header parameter required')
      })
      .then(done, done)
  })

  it('Get By Profile Key - Invalid Profile Key (Negative)', (done) => {
    agilite.Keywords.getValuesByProfileKey(invalidValue)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal(`Active Profile cannot be found - ${invalidValue}`)
      })
      .then(done, done)
  })

  it('Get By Profile Key - Success', (done) => {
    agilite.Keywords.getValuesByProfileKey(key)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.ARRAY)
        expect(response.data.length).to.be.greaterThan(0)
        expect(JSON.stringify(response.data)).to.equal(JSON.stringify(mainEntry.data.values))
      })
      .then(done, done)
  })

  it('Get By Profile Key - Invalid Sort - Success', (done) => {
    agilite.Keywords.getValuesByProfileKey(key, invalidValue)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.ARRAY)
        expect(response.data.length).to.be.greaterThan(0)
        expect(JSON.stringify(response.data)).to.equal(JSON.stringify(mainEntry.data.values))
      })
      .then(done, done)
  })

  it('Get By Profile Key - Invalid Sort - Invalid Output Format - Success', (done) => {
    agilite.Keywords.getValuesByProfileKey(key, invalidValue, invalidValue)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.ARRAY)
        expect(response.data.length).to.be.greaterThan(0)
        expect(JSON.stringify(response.data)).to.equal(JSON.stringify(mainEntry.data.values))
      })
      .then(done, done)
  })

  it('Get By Profile Key - JSON Output Format - Success', (done) => {
    agilite.Keywords.getValuesByProfileKey(key, null, 'json')
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
      })
      .then(done, done)
  })

  it('Get Profile Keys By Group - No Group Name (Negative)', (done) => {
    agilite.Keywords.getProfileKeysByGroup()
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('Validation Failed. \'group-name\' Header parameter required')
      })
      .then(done, done)
  })

  it('Get Profile Keys By Group - Invalid Group Name (Negative)', (done) => {
    agilite.Keywords.getProfileKeysByGroup(invalidValue)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal(`Active Profiles cannot be found for Group - ${invalidValue}`)
      })
      .then(done, done)
  })

  it('Get Profile Keys By Group - Success', (done) => {
    agilite.Keywords.getProfileKeysByGroup(groupName)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.ARRAY)
        expect(response.data.length).to.be.greaterThan(0)
      })
      .then(done, done)
  })

  it('Get Profile Keys By Group - Invalid Sort - Success', (done) => {
    agilite.Keywords.getProfileKeysByGroup(groupName, invalidValue)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.ARRAY)
        expect(response.data.length).to.be.greaterThan(0)
      })
      .then(done, done)
  })

  it('Get Label By Value - No Params (Negative)', (done) => {
    agilite.Keywords.getLabelByValue()
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('Validation Failed. \'profile-key\' Header parameter required')
      })
      .then(done, done)
  })

  it('Get Label By Value - No Value (Negative)', (done) => {
    agilite.Keywords.getLabelByValue(key)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('Validation Failed. \'value-key\' Header parameter required')
      })
      .then(done, done)
  })

  it('Get Label By Value - Invalid Key (Negative)', (done) => {
    agilite.Keywords.getLabelByValue(invalidValue, mainEntry.data.values[0].value)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('Active Profile cannot be found - ' + invalidValue) // TODO: We can provide a better Error Message
      })
      .then(done, done)
  })

  it('Get Label By Value - Invalid Value (Negative)', (done) => {
    agilite.Keywords.getLabelByValue(key, invalidValue)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal(`Label Entry cannot be found - ${invalidValue}`) 
      })
      .then(done, done)
  })

  it('Get Label By Value - Success', (done) => {
    agilite.Keywords.getLabelByValue(key, mainEntry.data.values[0].value)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)
        expect(response.data).to.equal(mainEntry.data.values[0].label)
      })
      .then(done, done)
  })

  it('Get Label By Value - Invalid Output Format - Success', (done) => {
    agilite.Keywords.getLabelByValue(key, mainEntry.data.values[0].value, invalidValue)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)
        expect(response.data).to.equal(mainEntry.data.values[0].label)
      })
      .then(done, done)
  })

  it('Get Label By Value - JSON Output Format - Success', (done) => {
    agilite.Keywords.getLabelByValue(key, mainEntry.data.values[0].value, 'json')
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
      })
      .then(done, done)
  })

  it('Get Value By Label - No Params (Negative)', (done) => {
    agilite.Keywords.getValueByLabel()
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('Validation Failed. \'profile-key\' Header parameter required')
      })
      .then(done, done)
  })

  it('Get Value By Label - No Value (Negative)', (done) => {
    agilite.Keywords.getValueByLabel(key)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('Validation Failed. \'label-key\' Header parameter required')
      })
      .then(done, done)
  })

  it('Get Value By Label - Invalid Key (Negative)', (done) => {
    agilite.Keywords.getValueByLabel(invalidValue, mainEntry.data.values[0].label)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('Active Profile cannot be found - ' + invalidValue) 
      })
      .then(done, done)
  })

  it('Get Value By Label - Invalid Value (Negative)', (done) => {
    agilite.Keywords.getValueByLabel(key, invalidValue)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal(`Label Entry cannot be found - ${invalidValue}`) // TODO: We can provide a better Error Message
      })
      .then(done, done)
  })

  it('Get Value By Label - Success', (done) => {
    agilite.Keywords.getValueByLabel(key, mainEntry.data.values[0].label)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)
        expect(response.data).to.equal(mainEntry.data.values[0].value)
      })
      .then(done, done)
  })

  it('Get Value By Label - Invalid Output Format - Success', (done) => {
    agilite.Keywords.getValueByLabel(key, mainEntry.data.values[0].label, invalidValue)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)
        expect(response.data).to.equal(mainEntry.data.values[0].value)
      })
      .then(done, done)
  })

  it('Get Value By Label - JSON Output Format - Success', (done) => {
    agilite.Keywords.getValueByLabel(key, mainEntry.data.values[0].label, 'json')
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
      })
      .then(done, done)
  })

  it('Delete Record - No Record Id (Negative)', (done) => {
    agilite.Keywords.deleteData()
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('Validation Failed. \'record-id\' Header parameter required')
      })
      .then(done, done)
  })

  it('Delete Record - Invalid Record Id (Negative)', (done) => {
    agilite.Keywords.deleteData(invalidValue)
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
    agilite.Keywords.deleteData(recordId)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
        expect(JSON.stringify(response.data)).to.equal('{}')
      })
      .then(done, done)
  })
})
