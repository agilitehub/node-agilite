'use strict'

require('agilite-utils/dotenv').config()
const UUID = require('agilite-utils/uuid')
const TypeDetect = require('agilite-utils/type-detect')
const expect = require('chai').expect
const Agilite = require('../dist/controllers/agilite')
const EnumsTypeDetect = require('agilite-utils/enums-type-detect')
const { Enums } = require('../dist/utils/enums')
const DataTemplate = require('../data-templates/events')

const agilite = new Agilite({
  apiServerUrl: process.env.API_SERVER_URL,
  apiKey: process.env.API_KEY
})

describe('Agilit-e Events', () => {
  const invalidValue = 'invalid_value'

  let mainEntry = null
  let tmpEntry = null
  let recordId = null
  let key = UUID.v1()

  it('Create New Record - No Params (Negative)', (done) => {
    agilite.Events.postData()
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

    agilite.Events.postData(mainEntry)
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

    agilite.Events.postData(mainEntry)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('Please provide a valid Event \'key\'')
      })
      .then(done, done)
  })

  it('Create New Record - Success', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.new))
    mainEntry.data.key = key

    agilite.Events.postData(mainEntry)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if provided values match
        expect(response.data.data).to.haveOwnProperty('key')
        expect(response.data.data.key).to.equal(key)

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
        expect(response.data.data).to.haveOwnProperty('groupName')
        expect(response.data.data.groupName).to.equal(Enums.STRING_EMPTY)
        expect(response.data.data).to.haveOwnProperty('description')
        expect(response.data.data.description).to.equal(Enums.STRING_EMPTY)
        expect(response.data.data).to.haveOwnProperty('actions')
        expect(response.data.data).to.haveOwnProperty('subscriptions')

        // Store Record Id to be used later
        recordId = response.data._id
      })
      .then(done, done)
  })

  it('Get Data - Slim Result - Find Record By Id - Success', (done) => {
    agilite.Events.getData()
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
            expect(tmpEntry.data).to.haveOwnProperty('isActive')
            expect(TypeDetect(tmpEntry.data.isActive)).to.equal(EnumsTypeDetect.BOOLEAN)
            expect(tmpEntry.data).to.haveOwnProperty('groupName')
            expect(TypeDetect(tmpEntry.data.groupName)).to.equal(EnumsTypeDetect.STRING)

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
    agilite.Events.putData()
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
    agilite.Events.putData(recordId)
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
    agilite.Events.putData(recordId, {})
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

    agilite.Events.putData(recordId, mainEntry)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('Please provide a valid Event \'key\'')
      })
      .then(done, done)
  })

  it('Update Existing Record - Success', (done) => {
    key = 'PUT_' + key
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.modified))
    mainEntry.data.key = key

    agilite.Events.putData(recordId, mainEntry)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if provided values match
        expect(response.data.data).to.haveOwnProperty('key')
        expect(response.data.data.key).to.equal(key)
        expect(response.data.data).to.haveOwnProperty('groupName')
        expect(response.data.data.groupName).to.equal(DataTemplate.modified.data.groupName)
        expect(response.data.data).to.haveOwnProperty('description')
        expect(response.data.data.description).to.equal(DataTemplate.modified.data.description)
        expect(response.data.data).to.haveOwnProperty('actions')
        expect(response.data.data).to.haveOwnProperty('subscriptions')

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

  // it('Execute Event - No Params (Negative)', (done) => {
  //   agilite.Events.execute()
  //     .catch((err) => {
  //       expect(err).to.haveOwnProperty('response')
  //       expect(err.response.status).to.equal(400)
  //       expect(err.response).to.haveOwnProperty('data')
  //       expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

  //       // Check if errorMessage exists and contains correct error message
  //       expect(err.response.data).to.haveOwnProperty('errorMessage')
  //       expect(err.response.data.errorMessage).to.equal('No Profile Key was specified in the \'profile-key\' header parameter')
  //     })
  //     .then(done, done)
  // })

  // it('Execute Event - Invalid Key (Negative)', (done) => {
  //   agilite.Events.execute('invalid')
  //     .catch((err) => {
  //       expect(err).to.haveOwnProperty('response')
  //       expect(err.response.status).to.equal(400)
  //       expect(err.response).to.haveOwnProperty('data')
  //       expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

  //       // Check if errorMessage exists and contains correct error message
  //       expect(err.response.data).to.haveOwnProperty('errorMessage')
  //       expect(err.response.data.errorMessage).to.equal('Active Profile cannot be found - invalid')
  //     })
  //     .then(done, done)
  // })

  // it('Execute Event - Null as Data - Success', (done) => {
  //   agilite.Events.execute(key, null)
  //     .then((response) => {
  //       expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
  //     })
  //     .then(done, done)
  // })

  // it('Execute Event - Object as Data - Success', (done) => {
  //   agilite.Events.execute(key, null)
  //     .then((response) => {
  //       expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
  //     })
  //     .then(done, done)
  // })

  it('Delete Record - No Record Id (Negative)', (done) => {
    agilite.Events.deleteData()
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
    agilite.Events.deleteData(invalidValue)
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
    agilite.Events.deleteData(recordId)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
        expect(JSON.stringify(response.data)).to.equal('{}')
      })
      .then(done, done)
  })
})
