'use strict'

/*
 * OVERIVEW: Testing the endpoints of Agilit-e Batch Logging
 *
 * - CREATE NEW RECORD
 *    + No Params       - (NEGATIVE)
 *    + Empty Object    - (NEGATIVE)
 *    + No Profile Key  - (NEGATIVE)
 *    + Successful      - (POSITIVE)
 *
 * - GET DATA
 *    + Slim Result: Find Record By Id - (POSITIVE)
 *
 * - UPDATE EXISTING RECORD
 *    + No Params               - (NEGATIVE)
 *    + No Data Param           - (NEGATIVE)
 *    + Empty Object Data Param - (NEGATIVE)
 *    + No Profile Key          - (NEGATIVE)
 *    + Successful              - (POSITIVE)
 *
 * - GET BY PROFILE KEY
 *    + No Params                - (NEGATIVE)
 *    + Invalid Key              - (NEGATIVE)
 *    + Null as Data: Successful - (POSITIVE)
 *
 * - INIT PROCESS
 *    + No Params - (NEGATIVE)
 *
 * - COMPLETE PROCESS
 *    + No Params   - (NEGATIVE)
 *    + Invalid Key - (NEGATIVE)
 *
 * - DELETE RECORD
 *    + No Record Id      - (NEGATIVE)
 *    + Invalid Record Id - (NEGATIVE)
 *    + Successful        - (POSITIVE)
 */

require('dotenv').config()
const UUID = require('uuid')
const TypeDetect = require('type-detect')
const expect = require('chai').expect
const Agilite = require('../controllers/agilite')
const EnumsTypeDetect = require('../utils/enums-type-detect')
const Enums = require('../utils/enums')
const DataTemplate = require('../data-templates/batchlogging')

const agilite = new Agilite({
  apiServerUrl: process.env.API_SERVER_URL,
  apiKey: process.env.API_KEY
})

describe('Agilit-e Batch Logging \n', function () {
  this.bail(true)
  const invalidValue = 'invalid_value'

  let mainEntry = null
  let tmpEntry = null
  let recordId = null
  let logProcessId = null // TODO: Need to store the Log Process Id and reference that for other tests
  let key = UUID.v1()

  describe('Create New Record', () => {
    describe('  Negative Tests', () => {
      it('Create New Record - No Params (NEGATIVE)', (done) => {
        agilite.BatchLogging.postData()
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

      it('Create New Record - Empty Object (NEGATIVE)', (done) => {
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyObject))

        agilite.BatchLogging.postData(mainEntry)
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

      it('Create New Record - No Profile Key (NEGATIVE)', (done) => {
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyDataObject))

        agilite.BatchLogging.postData(mainEntry)
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
    })

    describe('  Positive Tests', () => {
      it('Create New Record - Success (POSITIVE)', (done) => {
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.new))
        mainEntry.data.key = key
        mainEntry.data.name = key

        agilite.BatchLogging.postData(mainEntry)
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

            // Store Record Id to be used later
            recordId = response.data._id
          })
          .then(done, done)
      })
    })
  })

  describe('Get Data', () => {
    describe('  Negative Tests', () => {
    })

    describe('  Positive Tests', () => {
      it('Get Data - Slim Result - Find Record By Id - Success (POSITIVE)', (done) => {
        agilite.BatchLogging.getData()
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
    })
  })

  describe('Update Existing Record', () => {
    describe('  Negative Tests', () => {
      it('Update Existing Record - No Params (NEGATIVE)', (done) => {
        agilite.BatchLogging.putData()
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

      it('Update Existing Record - No Data Param (NEGATIVE)', (done) => {
        agilite.BatchLogging.putData(recordId)
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

      it('Update Existing Record - Empty Object Data Param (NEGATIVE)', (done) => {
        agilite.BatchLogging.putData(recordId, {})
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

      it('Update Existing Record - No Profile Key (NEGATIVE)', (done) => {
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyDataObject))

        agilite.BatchLogging.putData(recordId, mainEntry)
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
    })

    describe('  Positive Tests', () => {
      it('Update Existing Record - Success (POSITIVE)', (done) => {
        key = 'PUT_' + key
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.modified))
        mainEntry.data.key = key
        mainEntry.data.name = key

        agilite.BatchLogging.putData(recordId, mainEntry)
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if provided values match
            expect(response.data.data).to.haveOwnProperty('key')
            expect(response.data.data.key).to.equal(key)
            expect(response.data.data).to.haveOwnProperty('groupName')
            expect(response.data.data.groupName).to.equal(DataTemplate.modified.data.groupName)
            expect(response.data.data).to.haveOwnProperty('description')
            expect(response.data.data.description).to.equal(DataTemplate.modified.data.description)

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
    })
  })

  describe('Get By Profile Key', () => {
    describe('  Negative Tests', () => {
      it('Get By Profile Key - No Params (NEGATIVE)', (done) => {
        agilite.BatchLogging.getByProfileKey()
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('No Profile Key was specified in the \'profile-key\' header parameter')
          })
          .then(done, done)
      })

      it('Get By Profile Key - Invalid Key (NEGATIVE)', (done) => {
        agilite.BatchLogging.getByProfileKey('invalid')
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Active Batch Logging Profile cannot be found - invalid')
          })
          .then(done, done)
      })
    })

    describe('  Positive Tests', () => {
      it('Get By Profile Key - Null as Data - Success (POSITIVE)', (done) => {
        agilite.BatchLogging.getByProfileKey(key, null)
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
          })
          .then(done, done)
      })
    })
  })

  describe('Init Process', () => {
    describe('  Negative Tests', () => {
      it('Init Process - No Params (NEGATIVE)', (done) => {
        agilite.BatchLogging.initLogProcess()
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('No Profile Key was specified in the \'profile-key\' header parameter')
          })
          .then(done, done)
      })
    })

    describe('  Positive Tests', () => {
    })
  })

  describe('Complete Process', () => {
    describe('  Negative Tests', () => {
      it('Complete Process - No Params (NEGATIVE)', (done) => {
        agilite.BatchLogging.completeLogProcess()
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('No Batch Logging Process Id was specified in the \'log-process-id\' header parameter')
          })
          .then(done, done)
      })

      it('Complete Process - Invalid Key (NEGATIVE)', (done) => {
        agilite.BatchLogging.completeLogProcess('invalid')
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
          })
          .then(done, done)
      })
    })

    describe('  Positive Tests', () => {
    })
  })

  describe('Delete Record', () => {
    describe('  Negative Tests', () => {
      it('Delete Record - No Record Id (NEGATIVE)', (done) => {
        agilite.BatchLogging.deleteData()
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

      it('Delete Record - Invalid Record Id (NEGATIVE)', (done) => {
        agilite.BatchLogging.deleteData(invalidValue)
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
    })

    describe('  Positive Tests', () => {
      it('Delete Record - Success (POSITIVE)', (done) => {
        agilite.BatchLogging.deleteData(recordId)
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
            expect(JSON.stringify(response.data)).to.equal('{}')
          })
          .then(done, done)
      })
    })
  })
})
