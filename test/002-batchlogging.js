'use strict'

/*
 * OVERIVEW: Testing the endpoints of Agilit-e Batch Logging
 *
 * - CREATE NEW RECORD
 *    + No Params             - (NEGATIVE)
 *    + Empty String          - (NEGATIVE)
 *    + Empty Object          - (NEGATIVE)
 *    + Empty Data Object     - (NEGATIVE)
 *    + String Data           - (NEGATIVE)
 *    + Array Data            - (NEGATIVE)
 *    + No Profile Key        - (NEGATIVE)
 *    + No Profile Name       - (NEGATIVE)
 *    + Active Profile        - (POSITIVE)
 *    + Inactive Profile      - (POSITIVE)
 *
 * - GET DATA
 *    + Slim Result: Find All             - (POSITIVE)
 *    + "Fat" Result: Find All            - (POSITIVE)
 *    + Slim Result: Find by Profile Key  - (POSITIVE)
 *    + "Fat" Result: Find by Profile Key - (POSITIVE)
 *    + Slim Result: Find by Record Id    - (POSITIVE)
 *    + "Fat" Result: Find by Record Id   - (POSITIVE)
 *
 * - UPDATE EXISTING RECORD
 *    + No Params                 - (NEGATIVE)
 *    + Empty String Record Id    - (NEGATIVE)
 *    + String Record Id          - (NEGATIVE)
 *    + Number Record Id          - (NEGATIVE)
 *    + Object Record Id          - (NEGATIVE)
 *    + Array Record Id           - (NEGATIVE)
 *    + No Data Param             - (NEGATIVE)
 *    + Empty Object Data Param   - (NEGATIVE)
 *    + Empty Data Object Param   - (NEGATIVE)
 *    + No Profile Key            - (NEGATIVE)
 *    + No Profile Name           - (NEGATIVE)
 *    + Update Active to Inactive - (POSITIVE)
 *    + Update Inactive to Active - (POSITIVE)
 *
 * - GET BY PROFILE KEY
 *    + No Params                 - (NEGATIVE)
 *    + Empty String Key          - (NEGATIVE)
 *    + String Key                - (NEGATIVE)
 *    + Number Key                - (NEGATIVE)
 *    + Object Key                - (NEGATIVE)
 *    + Array Key                 - (NEGATIVE)
 *    + Invalid Profile Key       - (NEGATIVE)
 *    + Get Active Profile by Key - (POSITIVE)
 *
 * - INIT PROCESS
 *    + No Params    - (NEGATIVE)
 *    + Empty Key    - (NEGATIVE)
 *    + String Key   - (NEGATIVE)
 *    + Number Key   - (NEGATIVE)
 *    + Object Key   - (NEGATIVE)
 *    + Array Key    - (NEGATIVE)
 *    + Inactive Key - (NEGATIVE)
 *    + Active Key   - (POSITIVE)
 *
 * - CREATE LOG ENTRY
 *    + No Params                    - (NEGATIVE)
 *    + Empty String Process Id      - (NEGATIVE)
 *    + String Process Id            - (NEGATIVE)
 *    + Number Process Id            - (NEGATIVE)
 *    + Object Process Id            - (NEGATIVE)
 *    + Array Process Id             - (NEGATIVE)
 *    + Valid Process Id, Empty Data - (POSITIVE)
 *    + Valid Process Id, Valid Data - (POSITIVE)
 *
 * - COMPLETE LOG PROCESS
 *    + No Params            - (NEGATIVE)
 *    + Empty String Id      - (NEGATIVE)
 *    + String Id            - (NEGATIVE)
 *    + Number Id            - (NEGATIVE)
 *    + Object Id            - (NEGATIVE)
 *    + Array Id             - (NEGATIVE)
 *    + Valid Id, Empty Data - (POSITIVE)
 *    + Valid Id, Valid Data - (POSITIVE)
 *
 * - GENERATE LOG PROCESS REPORT
 *
 * - DELETE RECORD
 *    + No Record Id            - (NEGATIVE)
 *    + Empty String Record Id  - (NEGATIVE)
 *    + String Record Id        - (NEGATIVE)
 *    + Number Record Id        - (NEGATIVE)
 *    + Object Record Id        - (NEGATIVE)
 *    + Array Record Id         - (NEGATIVE)
 *    + Delete Inactive Profile - (POSITIVE)
 *    + Delete Active Profile   - (POSITIVE)
 */

require('agilite-utils/dotenv').config()
const UUID = require('agilite-utils/uuid')
const TypeDetect = require('agilite-utils/type-detect')
const expect = require('chai').expect
const Agilite = require('../controllers/agilite')
const EnumsTypeDetect = require('agilite-utils/enums-type-detect')
const Enums = require('../utils/enums')
const DataTemplate = require('../data-templates/batchlogging')
const { emptyObject } = require('../data-templates/batchlogging')

const agilite = new Agilite({
  apiServerUrl: process.env.API_SERVER_URL,
  apiKey: process.env.API_KEY
})

describe('Agilit-e Batch Logging \n', function () {
  // this.bail(true)
  const invalidValue = 'invalid_value'

  let mainEntry = null
  let tmpEntry = null
  let recordId1 = null
  let recordId2 = null
  let logProcessId = null // TODO: Need to store the Log Process Id and reference that for other tests
  let key1 = UUID.v1()
  let key2 = UUID.v1()

  describe('Create New Record', () => {
    describe('Negative Tests', () => {
      it('No Params (NEGATIVE)', (done) => {
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

      it('Empty String (NEGATIVE)', (done) => {
        agilite.BatchLogging.postData('')
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

      it('Empty Object (NEGATIVE)', (done) => {
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

      it('Empty Data Object (NEGATIVE)', (done) => {
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

      it('String Data (NEGATIVE)', (done) => {
        agilite.BatchLogging.postData(invalidValue)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
          })
          .then(done, done)
      })

      it('Array Data (NEGATIVE)', (done) => {
        agilite.BatchLogging.postData([])
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Request body needs to be of Content-Type \'JSON\'')
          })
          .then(done, done)
      })

      it('No Profile Key (NEGATIVE)', (done) => {
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.new))
        mainEntry.data.name = key1

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

      it('No Profile Name (NEGATIVE)', (done) => {
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyDataObject))
        mainEntry.data.key = key1

        agilite.BatchLogging.postData(mainEntry)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Please provide a valid Profile \'name\'')
          })
          .then(done, done)
      })
    })

    describe('Positive Tests', () => {
      it('Active Profile (POSITIVE)', (done) => {
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.new))
        mainEntry.data.key = key1
        mainEntry.data.name = key1

        agilite.BatchLogging.postData(mainEntry)
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if provided values match
            expect(response.data.data).to.haveOwnProperty('key')
            expect(response.data.data.key).to.equal(key1)

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
            recordId1 = response.data._id
          })
          .then(done, done)
      })

      it('Inactive Profile (POSITIVE)', (done) => {
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.new))
        mainEntry.data.key = key2
        mainEntry.data.name = key2
        mainEntry.data.isActive = false

        agilite.BatchLogging.postData(mainEntry)
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if provided values match
            expect(response.data.data).to.haveOwnProperty('key')
            expect(response.data.data.key).to.equal(key2)

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
            expect(response.data.data.isActive).to.equal(false)
            expect(response.data.data).to.haveOwnProperty('groupName')
            expect(response.data.data.groupName).to.equal(Enums.STRING_EMPTY)
            expect(response.data.data).to.haveOwnProperty('description')
            expect(response.data.data.description).to.equal(Enums.STRING_EMPTY)

            // Store Record Id to be used later
            recordId2 = response.data._id
          })
          .then(done, done)
      })
    })
  })

  describe('Get Data', () => {
    describe('Positive Tests', () => {
      it('Slim Result - Find All - Success (POSITIVE)', (done) => {
        agilite.BatchLogging.getData()
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.ARRAY)
            expect(response.data.length).to.be.greaterThan(0)

            for (const x in response.data) {
              tmpEntry = response.data[x]

              expect(tmpEntry).to.haveOwnProperty('_id')
              expect(tmpEntry._id).to.not.equal(Enums.STRING_EMPTY)

              if (tmpEntry._id === recordId1) {
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

      it('"Fat" Result - Find All - Success (POSITIVE)', (done) => {
        agilite.BatchLogging.getData([], [], false, '')
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.ARRAY)
            expect(response.data.length).to.be.greaterThan(0)

            for (const x in response.data) {
              tmpEntry = response.data[x]

              expect(tmpEntry).to.haveOwnProperty('_id')
              expect(tmpEntry._id).to.not.equal(Enums.STRING_EMPTY)

              if (tmpEntry._id === recordId1) {
                // Check that the values part of the slim result is returned
                expect(tmpEntry).to.haveOwnProperty('data')
                expect(tmpEntry.data).to.haveOwnProperty('isActive')
                expect(TypeDetect(tmpEntry.data.isActive)).to.equal(EnumsTypeDetect.BOOLEAN)
                expect(tmpEntry.data).to.haveOwnProperty('groupName')
                expect(TypeDetect(tmpEntry.data.groupName)).to.equal(EnumsTypeDetect.STRING)

                // Check that the values that are part of the "Fat" result get returned
                expect(tmpEntry.createdBy).to.not.equal(Enums.STRING_EMPTY)
                expect(tmpEntry.modifiedBy).to.not.equal(Enums.STRING_EMPTY)
                expect(tmpEntry.createdAt).to.not.equal(Enums.STRING_EMPTY)
                expect(tmpEntry.updatedAt).to.not.equal(Enums.STRING_EMPTY)
                expect(tmpEntry.__v).to.not.equal(Enums.STRING_EMPTY)
              }
            }
          })
          .then(done, done)
      })

      it('Slim Result - Find by Profile Key - Success (POSITIVE)', (done) => {
        agilite.BatchLogging.getData([key1], [], true, '')
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.ARRAY)
            expect(response.data.length).to.be.greaterThan(0)

            expect(response.data[0]).to.haveOwnProperty('_id')
            expect(response.data[0]._id).to.not.equal(Enums.STRING_EMPTY)

            if (response.data[0]._id === recordId1) {
              expect(response.data[0]).to.haveOwnProperty('data')
              expect(response.data[0].data).to.haveOwnProperty('key')
              expect(TypeDetect(response.data[0].data.key)).to.equal(EnumsTypeDetect.STRING)
              expect(response.data[0].data.key).to.equal(key1)
              expect(response.data[0].data).to.haveOwnProperty('name')
              expect(TypeDetect(response.data[0].data.name)).to.equal(EnumsTypeDetect.STRING)
              expect(response.data[0].data.name).to.equal(key1)

              // Check that the values part of the slim result is returned
              expect(response.data[0].data).to.haveOwnProperty('isActive')
              expect(TypeDetect(response.data[0].data.isActive)).to.equal(EnumsTypeDetect.BOOLEAN)
              expect(response.data[0].data).to.haveOwnProperty('groupName')
              expect(TypeDetect(response.data[0].data.groupName)).to.equal(EnumsTypeDetect.STRING)

              // Check that the values NOT part of the slim result aren't returned
              expect(response.data[0].createdBy).to.equal(undefined)
              expect(response.data[0].modifiedBy).to.equal(undefined)
              expect(response.data[0].createdAt).to.equal(undefined)
              expect(response.data[0].updatedAt).to.equal(undefined)
              expect(response.data[0].__v).to.equal(undefined)
            }
          })
          .then(done, done)
      })

      it('"Fat" Result - Find by Profile Key - Success (POSITIVE)', (done) => {
        agilite.BatchLogging.getData([key2], [], true, '')
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.ARRAY)
            expect(response.data.length).to.be.greaterThan(0)

            expect(response.data[0]).to.haveOwnProperty('_id')
            expect(response.data[0]._id).to.not.equal(Enums.STRING_EMPTY)

            if (response.data[0]._id === recordId1) {
              expect(response.data[0]).to.haveOwnProperty('data')
              expect(response.data[0].data).to.haveOwnProperty('key')
              expect(TypeDetect(response.data[0].data.key)).to.equal(EnumsTypeDetect.STRING)
              expect(response.data[0].data.key).to.equal(key2)
              expect(response.data[0].data).to.haveOwnProperty('name')
              expect(TypeDetect(response.data[0].data.name)).to.equal(EnumsTypeDetect.STRING)
              expect(response.data[0].data.name).to.equal(key2)

              // Check that the values part of the slim result is returned
              expect(response.data[0].data).to.haveOwnProperty('isActive')
              expect(TypeDetect(response.data[0].data.isActive)).to.equal(EnumsTypeDetect.BOOLEAN)
              expect(response.data[0].data).to.haveOwnProperty('groupName')
              expect(TypeDetect(response.data[0].data.groupName)).to.equal(EnumsTypeDetect.STRING)

              // Check that the values that are part of the "Fat" result get returned
              expect(response.data[0].createdBy).to.equal(Enums.STRING_EMPTY)
              expect(response.data[0].modifiedBy).to.equal(Enums.STRING_EMPTY)
              expect(response.data[0].createdAt).to.equal(Enums.STRING_EMPTY)
              expect(response.data[0].updatedAt).to.equal(Enums.STRING_EMPTY)
              expect(response.data[0].__v).to.equal(Enums.STRING_EMPTY)
            }
          })
          .then(done, done)
      })

      it('Slim Result - Find by Record Id - Success (POSITIVE)', (done) => {
        agilite.BatchLogging.getData([], [recordId1], true, '')
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.ARRAY)
            expect(response.data.length).to.be.greaterThan(0)

            expect(response.data[0]).to.haveOwnProperty('_id')
            expect(response.data[0]._id).to.not.equal(Enums.STRING_EMPTY)

            if (response.data[0]._id === recordId1) {
              expect(response.data[0]).to.haveOwnProperty('data')
              expect(response.data[0].data).to.haveOwnProperty('key')
              expect(TypeDetect(response.data[0].data.key)).to.equal(EnumsTypeDetect.STRING)
              expect(response.data[0].data.key).to.equal(key1)
              expect(response.data[0].data).to.haveOwnProperty('name')
              expect(TypeDetect(response.data[0].data.name)).to.equal(EnumsTypeDetect.STRING)
              expect(response.data[0].data.name).to.equal(key1)

              // Check that the values part of the slim result is returned
              expect(response.data[0].data).to.haveOwnProperty('isActive')
              expect(TypeDetect(response.data[0].data.isActive)).to.equal(EnumsTypeDetect.BOOLEAN)
              expect(response.data[0].data).to.haveOwnProperty('groupName')
              expect(TypeDetect(response.data[0].data.groupName)).to.equal(EnumsTypeDetect.STRING)

              // Check that the values NOT part of the slim result aren't returned
              expect(response.data[0].createdBy).to.equal(undefined)
              expect(response.data[0].modifiedBy).to.equal(undefined)
              expect(response.data[0].createdAt).to.equal(undefined)
              expect(response.data[0].updatedAt).to.equal(undefined)
              expect(response.data[0].__v).to.equal(undefined)
            }
          })
          .then(done, done)
      })

      it('"Fat" Result - Find by Record Id - Success (POSITIVE)', (done) => {
        agilite.BatchLogging.getData([], [recordId2], true, '')
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.ARRAY)
            expect(response.data.length).to.be.greaterThan(0)

            expect(response.data[0]).to.haveOwnProperty('_id')
            expect(response.data[0]._id).to.not.equal(Enums.STRING_EMPTY)

            if (response.data[0]._id === recordId1) {
              expect(response.data[0]).to.haveOwnProperty('data')
              expect(response.data[0].data).to.haveOwnProperty('key')
              expect(TypeDetect(response.data[0].data.key)).to.equal(EnumsTypeDetect.STRING)
              expect(response.data[0].data.key).to.equal(key2)
              expect(response.data[0].data).to.haveOwnProperty('name')
              expect(TypeDetect(response.data[0].data.name)).to.equal(EnumsTypeDetect.STRING)
              expect(response.data[0].data.name).to.equal(key2)

              // Check that the values part of the slim result is returned
              expect(response.data[0].data).to.haveOwnProperty('isActive')
              expect(TypeDetect(response.data[0].data.isActive)).to.equal(EnumsTypeDetect.BOOLEAN)
              expect(response.data[0].data).to.haveOwnProperty('groupName')
              expect(TypeDetect(response.data[0].data.groupName)).to.equal(EnumsTypeDetect.STRING)

              // Check that the values that are part of the "Fat" result get returned
              expect(response.data[0].createdBy).to.equal(Enums.STRING_EMPTY)
              expect(response.data[0].modifiedBy).to.equal(Enums.STRING_EMPTY)
              expect(response.data[0].createdAt).to.equal(Enums.STRING_EMPTY)
              expect(response.data[0].updatedAt).to.equal(Enums.STRING_EMPTY)
              expect(response.data[0].__v).to.equal(Enums.STRING_EMPTY)
            }
          })
          .then(done, done)
      })
    })
  })

  describe('Update Existing Record', () => {
    describe('Negative Tests', () => {
      it('No Params (NEGATIVE)', (done) => {
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

      it('Empty String Record Id (NEGATIVE)', (done) => {
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.new))
        mainEntry.data.key = key1
        mainEntry.data.name = key1

        agilite.BatchLogging.putData('', mainEntry)
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

      it('String Record Id (NEGATIVE)', (done) => {
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.new))
        mainEntry.data.key = key1
        mainEntry.data.name = key1

        agilite.BatchLogging.putData(invalidValue, mainEntry)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Record with id: \'invalid_value\' cannot be found')
          })
          .then(done, done)
      })

      it('Number Record Id (NEGATIVE)', (done) => {
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.new))
        mainEntry.data.key = key1
        mainEntry.data.name = key1

        agilite.BatchLogging.putData(423452345, mainEntry)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Record with id: \'423452345\' cannot be found')
          })
          .then(done, done)
      })

      it('Object Record Id (NEGATIVE)', (done) => {
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.new))
        mainEntry.data.key = key1
        mainEntry.data.name = key1

        agilite.BatchLogging.putData({}, mainEntry)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            // expect(err.response.data).to.haveOwnProperty('errorMessage')
            // expect(err.response.data.errorMessage).to.equal('No Id was specified in the \'record-id\' header parameter')
          })
          .then(done, done)
      })

      it('Array Record Id (NEGATIVE)', (done) => {
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.new))
        mainEntry.data.key = key1
        mainEntry.data.name = key1

        agilite.BatchLogging.putData([], mainEntry)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            // expect(err.response.data).to.haveOwnProperty('errorMessage')
            // expect(err.response.data.errorMessage).to.equal('No Id was specified in the \'record-id\' header parameter')
          })
          .then(done, done)
      })

      it('No Data Param (NEGATIVE)', (done) => {
        agilite.BatchLogging.putData(recordId1)
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

      it('Empty Object Data Param (NEGATIVE)', (done) => {
        agilite.BatchLogging.putData(recordId1, {})
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

      it('Empty Data Object Param (NEGATIVE)', (done) => {
        agilite.BatchLogging.putData(recordId1, DataTemplate.emptyDataObject)
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

      it('No Profile Key (NEGATIVE)', (done) => {
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.new))
        mainEntry.data.name = key1

        agilite.BatchLogging.putData(recordId1, mainEntry)
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

      it('No Profile Name (NEGATIVE)', (done) => {
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.new))
        mainEntry.data.key = key1

        agilite.BatchLogging.putData(recordId1, mainEntry)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Please provide a valid Profile \'name\'')
          })
          .then(done, done)
      })
    })

    describe('Positive Tests', () => {
      it('Update Active to Inactive (POSITIVE)', (done) => {
        key1 = 'PUT_' + key1
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.modified))
        mainEntry.data.key = key1
        mainEntry.data.name = key1
        mainEntry.data.isActive = false

        agilite.BatchLogging.putData(recordId1, mainEntry)
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if provided values match
            expect(response.data.data).to.haveOwnProperty('key')
            expect(response.data.data.key).to.equal(key1)
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
            expect(response.data.data.isActive).to.equal(false)

            // Store Record Id to be used later
            recordId1 = response.data._id
          })
          .then(done, done)
      })

      it('Update Inactive to Active (POSITIVE)', (done) => {
        key2 = 'PUT_' + key2
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.modified))
        mainEntry.data.key = key2
        mainEntry.data.name = key2
        mainEntry.data.isActive = true

        agilite.BatchLogging.putData(recordId2, mainEntry)
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if provided values match
            expect(response.data.data).to.haveOwnProperty('key')
            expect(response.data.data.key).to.equal(key2)
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
            recordId2 = response.data._id
          })
          .then(done, done)
      })
    })
  })

  describe('Get By Profile Key', () => {
    describe('Negative Tests', () => {
      it('No Params (NEGATIVE)', (done) => {
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

      it('Empty String Key (NEGATIVE)', (done) => {
        agilite.BatchLogging.getByProfileKey('')
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

      it('String Key (NEGATIVE)', (done) => {
        agilite.BatchLogging.getByProfileKey(invalidValue)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Active Batch Logging Profile cannot be found - invalid_value')
          })
          .then(done, done)
      })

      it('Number Key (NEGATIVE)', (done) => {
        agilite.BatchLogging.getByProfileKey(123123123)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Active Batch Logging Profile cannot be found - 123123123')
          })
          .then(done, done)
      })

      it('Object Key (NEGATIVE)', (done) => {
        agilite.BatchLogging.getByProfileKey({})
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Active Batch Logging Profile cannot be found - [object Object]')
          })
          .then(done, done)
      })

      it('Array Key (NEGATIVE)', (done) => {
        agilite.BatchLogging.getByProfileKey([])
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Active Batch Logging Profile cannot be found - [object Object]')
          })
          .then(done, done)
      })

      it('Inactive Profile Key (NEGATIVE)', (done) => {
        agilite.BatchLogging.getByProfileKey(key1)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            const errMsg = `Active Batch Logging Profile cannot be found - ${key1}`
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal(errMsg)
          })
          .then(done, done)
      })
    })

    describe('Positive Tests', () => {
      it('Get Active Profile by Key - Success (POSITIVE)', (done) => {
        agilite.BatchLogging.getByProfileKey(key2, null)
          .then((response) => {
            expect(response).to.haveOwnProperty('data')
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
            expect(response.data).to.haveOwnProperty('isActive')
            expect(TypeDetect(response.data.isActive)).to.equal(EnumsTypeDetect.BOOLEAN)
            expect(response.data.isActive).to.equal(true)

            expect(response.data).to.haveOwnProperty('key')
            expect(TypeDetect(response.data.key)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.key).to.equal(key2)
            expect(response.data).to.haveOwnProperty('name')
            expect(TypeDetect(response.data.name)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.name).to.equal(key2)

            expect(response.data).to.haveOwnProperty('description')
            expect(TypeDetect(response.data.description)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.description).to.equal('Test Description')
            expect(response.data).to.haveOwnProperty('groupName')
            expect(TypeDetect(response.data.groupName)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.groupName).to.equal('Test Group Name')
            expect(response.data).to.haveOwnProperty('notes')
            expect(TypeDetect(response.data.notes)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.notes).to.equal('Test Notes')
            expect(response.data).to.haveOwnProperty('logLevel')
            expect(TypeDetect(response.data.logLevel)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.logLevel).to.equal('advanced')
          })
          .then(done, done)
      })
    })
  })

  describe('Init Process', () => {
    describe('Negative Tests', () => {
      it('No Params (NEGATIVE)', (done) => {
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

      it('Empty Key (NEGATIVE)', (done) => {
        agilite.BatchLogging.initLogProcess('')
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

      it('String Key (NEGATIVE)', (done) => {
        agilite.BatchLogging.initLogProcess(invalidValue)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Active Batch Logging Profile cannot be found - invalid_value')
          })
          .then(done, done)
      })

      it('Number Key (NEGATIVE)', (done) => {
        agilite.BatchLogging.initLogProcess(123123123)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Active Batch Logging Profile cannot be found - 123123123')
          })
          .then(done, done)
      })

      it('Object Key (NEGATIVE)', (done) => {
        agilite.BatchLogging.initLogProcess({})
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Active Batch Logging Profile cannot be found - [object Object]')
          })
          .then(done, done)
      })

      it('Array Key (NEGATIVE)', (done) => {
        agilite.BatchLogging.initLogProcess([])
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Active Batch Logging Profile cannot be found - [object Object]')
          })
          .then(done, done)
      })

      it('Inactive Key (NEGATIVE)', (done) => {
        agilite.BatchLogging.initLogProcess(key1, {})
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            const errMsg = `Active Batch Logging Profile cannot be found - ${key1}`
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal(errMsg)
          })
          .then(done, done)
      })
    })

    describe('Positive Tests', () => {
      it('Active Key (POSITIVE)', (done) => {
        agilite.BatchLogging.initLogProcess(key2, {})
          .then((response) => {
            expect(TypeDetect(response)).to.equal(EnumsTypeDetect.OBJECT)
            expect(response).to.haveOwnProperty('status')
            expect(TypeDetect(response.status)).to.equal(EnumsTypeDetect.NUMBER)
            expect(response.status).to.equal(200)
            expect(response).to.haveOwnProperty('data')
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)

            logProcessId = response.data
          })
          .then(done, done)
      })
    })
  })

  describe('Create Log Entry', () => {
    describe('Negative Tests', () => {
      it('No Params (NEGATIVE)', (done) => {
        agilite.BatchLogging.createLogEntry()
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

      it('Empty String Process Id (NEGATIVE)', (done) => {
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.logEntry))
        agilite.BatchLogging.createLogEntry('', mainEntry)
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

      it.skip('String Process Id (NEGATIVE)', (done) => {
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.logEntry))
        agilite.BatchLogging.createLogEntry(invalidValue, mainEntry)
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

      it.skip('Number Process Id (NEGATIVE)', (done) => {
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.logEntry))
        agilite.BatchLogging.createLogEntry(123123123, mainEntry)
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

      it.skip('Object Process Id (NEGATIVE)', (done) => {
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.logEntry))
        agilite.BatchLogging.createLogEntry({}, mainEntry)
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

      it.skip('Array Process Id (NEGATIVE)', (done) => {
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.logEntry))
        agilite.BatchLogging.createLogEntry([], mainEntry)
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
    })

    describe('Positive Tests', () => {
      it('Valid Process Id, Empty Data (POSITIVE)', (done) => {
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyObject))
        agilite.BatchLogging.createLogEntry(logProcessId, '')
          .then((response) => {
            expect(TypeDetect(response)).to.equal(EnumsTypeDetect.OBJECT)
            expect(response).to.haveOwnProperty('status')
            expect(TypeDetect(response.status)).to.equal(EnumsTypeDetect.NUMBER)
            expect(response.status).ordered.equal(200)

            expect(response).to.haveOwnProperty('data')
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
          })
          .then(done, done)
      })

      it('Valid Process Id, Valid Data (POSITIVE)', (done) => {
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.logEntry))
        agilite.BatchLogging.createLogEntry(logProcessId, mainEntry)
          .then((response) => {
            expect(TypeDetect(response)).to.equal(EnumsTypeDetect.OBJECT)
            expect(response).to.haveOwnProperty('status')
            expect(TypeDetect(response.status)).to.equal(EnumsTypeDetect.NUMBER)
            expect(response.status).ordered.equal(200)

            expect(response).to.haveOwnProperty('data')
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
          })
          .then(done, done)
      })
    })
  })

  describe('Complete Log Process', () => {
    describe('Negative Tests', () => {
      it('No Params (NEGATIVE)', (done) => {
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

      it('Empty String Id (NEGATIVE)', (done) => {
        agilite.BatchLogging.completeLogProcess('')
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(TypeDetect(err.response.data.errorMessage)).to.equal(EnumsTypeDetect.STRING)
            expect(err.response.data.errorMessage).to.equal('No Batch Logging Process Id was specified in the \'log-process-id\' header parameter')
          })
          .then(done, done)
      })

      it('String Id (NEGATIVE)', (done) => {
        agilite.BatchLogging.completeLogProcess(invalidValue)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(TypeDetect(err.response.data.errorMessage)).to.equal(EnumsTypeDetect.STRING)
            expect(err.response.data.errorMessage).to.equal('Invalid Batch Logging Process Id was provided in the \'log-process-id\' header parameter')
          })
          .then(done, done)
      })

      it('Number Id (NEGATIVE)', (done) => {
        agilite.BatchLogging.completeLogProcess(123123)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(TypeDetect(err.response.data.errorMessage)).to.equal(EnumsTypeDetect.STRING)
            expect(err.response.data.errorMessage).to.equal('Invalid Batch Logging Process Id was provided in the \'log-process-id\' header parameter')
          })
          .then(done, done)
      })

      it('Object Id (NEGATIVE)', (done) => {
        agilite.BatchLogging.completeLogProcess({})
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(TypeDetect(err.response.data.errorMessage)).to.equal(EnumsTypeDetect.STRING)
            expect(err.response.data.errorMessage).to.equal('Invalid Batch Logging Process Id was provided in the \'log-process-id\' header parameter')
          })
          .then(done, done)
      })

      it('Array Id (NEGATIVE)', (done) => {
        agilite.BatchLogging.completeLogProcess([])
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(TypeDetect(err.response.data.errorMessage)).to.equal(EnumsTypeDetect.STRING)
            expect(err.response.data.errorMessage).to.equal('Invalid Batch Logging Process Id was provided in the \'log-process-id\' header parameter')
          })
          .then(done, done)
      })
    })

    describe('Positive Tests', () => {
      it('Valid Id, Empty Data (POSITIVE)', (done) => {
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyObject))
        agilite.BatchLogging.completeLogProcess(logProcessId, emptyObject)
          .then((response) => {
            expect(TypeDetect(response)).to.equal(EnumsTypeDetect.OBJECT)
            expect(response).to.haveOwnProperty('status')
            expect(TypeDetect(response.status)).to.equal(EnumsTypeDetect.NUMBER)
            expect(response.status).ordered.equal(200)

            expect(response).to.haveOwnProperty('data')
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
          })
          .then(done, done)
      })

      it('Valid Id, Valid Data (POSITIVE)', (done) => {
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.logEntry))
        agilite.BatchLogging.completeLogProcess(logProcessId, mainEntry)
          .then((response) => {
            expect(TypeDetect(response)).to.equal(EnumsTypeDetect.OBJECT)
            expect(response).to.haveOwnProperty('status')
            expect(TypeDetect(response.status)).to.equal(EnumsTypeDetect.NUMBER)
            expect(response.status).ordered.equal(200)

            expect(response).to.haveOwnProperty('data')
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
          })
          .then(done, done)
      })
    })
  })

  // TODO: Need to add a few more here
  describe('Generate Log Process Report', () => {
    describe('Negative Tests', () => {
      it('No Params (NEGATIVE)', (done) => {
        agilite.BatchLogging.generateLogProcessReport()
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

      it('Empty String Id (NEGATIVE)', (done) => {
        agilite.BatchLogging.generateLogProcessReport('')
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

      it('Number Id (NEGATIVE)', (done) => {
        agilite.BatchLogging.generateLogProcessReport(123123123)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Invalid Batch Logging Process Id was provided in the \'log-process-id\' header parameter')
          })
          .then(done, done)
      })
    })

    describe('Positive Tests', () => {})
  })

  describe('Delete Record', () => {
    describe('Negative Tests', () => {
      it('No Record Id (NEGATIVE)', (done) => {
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

      it('Empty String Record Id (NEGATIVE)', (done) => {
        agilite.BatchLogging.deleteData('')
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

      it('String Record Id (NEGATIVE)', (done) => {
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

      it('Number Record Id (NEGATIVE)', (done) => {
        agilite.BatchLogging.deleteData(123123)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Record with id: \'123123\' cannot be found')
          })
          .then(done, done)
      })

      it('Object Record Id (NEGATIVE)', (done) => {
        agilite.BatchLogging.deleteData({})
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Record with id: \'[object Object]\' cannot be found')
          })
          .then(done, done)
      })

      it('Array Record Id (NEGATIVE)', (done) => {
        agilite.BatchLogging.deleteData([])
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Record with id: \'[object Object]\' cannot be found')
          })
          .then(done, done)
      })
    })

    describe('Positive Tests', () => {
      it('Delete Inactive Profile (POSITIVE)', (done) => {
        agilite.BatchLogging.deleteData(recordId1)
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
            expect(JSON.stringify(response.data)).to.equal('{}')
          })
          .then(done, done)
      })

      it('Delete Active Profile (POSITIVE)', (done) => {
        agilite.BatchLogging.deleteData(recordId2)
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
            expect(JSON.stringify(response.data)).to.equal('{}')
          })
          .then(done, done)
      })
    })
  })
})
