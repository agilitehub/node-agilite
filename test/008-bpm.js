'use strict'

require('agilite-utils/dotenv').config()
const UUID = require('agilite-utils/uuid')
const TypeDetect = require('agilite-utils/type-detect')
const expect = require('chai').expect
const Agilite = require('../controllers/agilite')
const EnumsTypeDetect = require('agilite-utils/enums-type-detect')
const DataTemplate = require('../data-templates/bpm')
const Enums = require('../utils/enums')

const agilite = new Agilite({
  apiServerUrl: process.env.API_SERVER_URL,
  apiKey: process.env.API_KEY
})

describe('Agilit-e BPM', () => {
  const invalidValue = 'invalid_value'

  let mainEntry = null
  let tmpEntry = null
  let recordId = null
  let key = UUID.v1()
  const name = UUID.v1()
  let processKey = null
  let bpmRecordId = null
  let numberingId = null

  describe('Create New Record', () => {
    describe('Negative Tests', () => {
      it('No Params Negative', (done) => {
        agilite.BPM.postData(mainEntry)
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

      it('Empty Object (Negative)', (done) => {
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyObject))

        agilite.BPM.postData(mainEntry)
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

      it('No Profile Key (Negative)', (done) => {
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyDataObject))

        agilite.BPM.postData(mainEntry)
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

      it('No Profile Name (Negative)', (done) => {
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyDataObject))
        mainEntry.data.key = key

        agilite.BPM.postData(mainEntry)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Invalid request body. \'name\' property required')
          })
          .then(done, done)
      })
    })

    describe('Positive Test', () => {
      it('Success', (done) => {
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.new))
        mainEntry.data.key = key
        mainEntry.data.name = key

        agilite.BPM.postData(mainEntry)
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if provided values match
            expect(response.data.data).to.haveOwnProperty('key')
            expect(response.data.data.key).to.equal(key)
            expect(response.data.data).to.haveOwnProperty('name')
            expect(response.data.data.name).to.equal(key)

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
            expect(TypeDetect(response.data.data.numberingId)).to.equal(EnumsTypeDetect.STRING)

            // Store Record Id to be used later
            recordId = response.data._id
            numberingId = response.data.data.numberingId
          })
          .then(done, done)
      })
    })
  })

  describe('Get Data', () => {
    describe('Negative Tests', () => {})

    describe('Positive Test', () => {
      it('Slim Result - Find Record By Id- Success', (done) => {
        agilite.BPM.getData()
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
    describe('Negative Tests', () => {
      it('No Params (Negative)', (done) => {
        agilite.BPM.putData()
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

      it('No Data Param (Negative)', (done) => {
        agilite.BPM.putData(recordId)
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

      it('Empty Object Data Param (Negative)', (done) => {
        agilite.BPM.putData(recordId, {})
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

      it('No Profile Key (Negative)', (done) => {
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyDataObject))

        agilite.BPM.putData(recordId, mainEntry)
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

      it('No Profile Name (Negative)', (done) => {
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyDataObject))
        mainEntry.key = key

        agilite.BPM.putData(recordId, mainEntry)
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
    })

    describe('Positive Test', () => {
      it('Success', (done) => {
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.modified))
        mainEntry.data.key = key
        mainEntry.data.name = 'PUT_' + key
        mainEntry.data.numberingId = numberingId

        agilite.BPM.putData(recordId, mainEntry)
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if provided values match
            expect(response.data.data).to.haveOwnProperty('key')
            expect(response.data.data.key).to.equal(key)
            expect(response.data.data).to.haveOwnProperty('name')
            expect(response.data.data.name).to.equal('PUT_' + key)

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
    })
  })

  describe('Register BPM Record', () => {
    describe('Negative Test', () => {})

    describe('Positive Test', () => {
      it('Success', (done) => {
        agilite.BPM.registerBPMRecord(key, 'user')
          .then((response) => {
            expect(response.data).to.haveOwnProperty('key')
            expect(response.data.key).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('name')
            expect(response.data.name).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('description')
            expect(response.data.description).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('instructions')
            expect(response.data.instructions).to.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('duration')
            expect(response.data.duration).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('processStage')
            expect(response.data.processStage).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('responsibleRole')
            expect(response.data.responsibleRole).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('visibleObjects')
            expect(TypeDetect(response.data.visibleObjects)).to.equal(EnumsTypeDetect.ARRAY)
            expect(response.data).to.haveOwnProperty('stepOptions')
            expect(TypeDetect(response.data.stepOptions)).to.equal(EnumsTypeDetect.ARRAY)

            processKey = response.data.processKey
            bpmRecordId = response.data.recordId
          })
          .then(done, done)
      })
    })
  })

  describe('Execute', () => {
    describe('Negative Tests', () => {})

    describe('Positive Test', () => {
      it('Success', (done) => {
        agilite.BPM.execute(processKey, bpmRecordId, 'Submit', 'user')
          .then((response) => {
            expect(response.data).to.haveOwnProperty('isNewEntry')
            expect(response.data.isNewEntry).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('isActive')
            expect(response.data.isActive).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('firstStep')
            expect(response.data.firstStep).to.not.equal(Enums.STRING_EMPTY)
            expect(response.data).to.haveOwnProperty('key')
            expect(response.data).to.haveOwnProperty('name')
            expect(response.data).to.haveOwnProperty('description')
            expect(response.data).to.haveOwnProperty('instructions')
            expect(response.data).to.haveOwnProperty('duration')
            expect(response.data).to.haveOwnProperty('processStage')
            expect(response.data).to.haveOwnProperty('responsibility')
            expect(response.data).to.haveOwnProperty('responsibleRole')
            expect(response.data).to.haveOwnProperty('eventStamp')
            expect(response.data).to.haveOwnProperty('roleLevels')
            expect(response.data).to.haveOwnProperty('visibleObjects')
            expect(response.data).to.haveOwnProperty('stepOptions')
            expect(response.data).to.haveOwnProperty('notes')
            expect(response.data).to.haveOwnProperty('referenceUrl')
            expect(response.data).to.haveOwnProperty('notificationTemplate')
            expect(response.data).to.haveOwnProperty('responsibleUsers')
            expect(response.data).to.haveOwnProperty('submittedIntoStep')
            expect(response.data).to.haveOwnProperty('targetTimeDuration')
            expect(response.data).to.haveOwnProperty('processKey')
          })
          .then(done, done)
      })
    })
  })

  describe('Get Record State', () => {
    describe('Negative Tests', () => {
      it('No Params (Negative)', (done) => {
        agilite.BPM.getRecordState()
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal(`At least one header property of ('process-keys', 'bpm-record-ids', 'step-names') or ('responsible-users', 'relevant-users') needs to be provided`)
          })
          .then(done, done)
      })
    })

    describe('Positive Tests', () => {
      it('ProcessKey - Success', (done) => {
        agilite.BPM.getRecordState([processKey])
          .then((response) => {
            expect(response).to.haveOwnProperty('data')
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.ARRAY)
            expect(response.data.length).to.not.equal(0)
          })
          .then(done, done)
      })

      it('BPM Record Id - Success', (done) => {
        agilite.BPM.getRecordState(null, [bpmRecordId])
          .then((response) => {
            expect(response).to.haveOwnProperty('data')
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.ARRAY)
            expect(response.data.length).to.not.equal(0)
          })
          .then(done, done)
      })

      it('Exclude History & Step Options & Visible Objects - Success', (done) => {
        agilite.BPM.getRecordState([processKey], [bpmRecordId], null, null, null, false, false, false)
          .then((response) => {
            expect(response).to.haveOwnProperty('data')
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.ARRAY)
            expect(response.data.length).to.not.equal(0)

            response.data.map(entry => {
              expect(entry).to.haveOwnProperty('visibleObjects')
              expect(entry.visibleObjects.length).to.equal(0)
              expect(entry).to.haveOwnProperty('stepOptions')
              expect(entry.stepOptions.length).to.equal(0)
              expect(entry).to.haveOwnProperty('history')
              expect(entry.history.length).to.equal(0)
            })
          })
          .then(done, done)
      })
    })
  })

  describe('Get By Profile Key', () => {
    describe('Negative Tests', () => {
      it('No Param (Negative)', (done) => {
        agilite.BPM.getByProfileKey()
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

      it('Invalid Param (Negative)', (done) => {
        agilite.BPM.getByProfileKey({})
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Active BPM Profile cannot be found - [object Object]')
          })
          .then(done, done)
      })
    })

    describe('Positive Test', () => {
      it('Success', (done) => {
        agilite.BPM.getByProfileKey(key)
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)

            expect(response.data).to.haveOwnProperty('key')
            expect(response.data).to.haveOwnProperty('name')
            expect(response.data).to.haveOwnProperty('description')
            expect(response.data).to.haveOwnProperty('groupName')
            expect(response.data).to.haveOwnProperty('appUrl')
            expect(response.data).to.haveOwnProperty('referenceUrl')
            expect(response.data).to.haveOwnProperty('appAdmin')
            expect(response.data).to.haveOwnProperty('notes')
            expect(response.data).to.haveOwnProperty('processSteps')
            expect(TypeDetect(response.data.processSteps)).to.equal(EnumsTypeDetect.ARRAY)

            response.data.processSteps.map(step => {
              expect(step).to.haveOwnProperty('key')
              expect(step).to.haveOwnProperty('name')
              expect(step).to.haveOwnProperty('description')
              expect(step).to.haveOwnProperty('instructions')
              expect(step).to.haveOwnProperty('duration')
              expect(step).to.haveOwnProperty('processStage')
              expect(step).to.haveOwnProperty('responsibility')
              expect(step).to.haveOwnProperty('responsibleRole')
              expect(step).to.haveOwnProperty('roleLevels')
              expect(step).to.haveOwnProperty('visibleObjects')
              expect(step).to.haveOwnProperty('stepOptions')
              expect(step).to.haveOwnProperty('notes')
              expect(step).to.haveOwnProperty('referenceUrl')
            })
          })
          .then(done, done)
      })
    })
  })

  describe('Assign Role', () => {
    describe('Negative Tests', () => {
      it('No Params (Negative)', (done) => {
        agilite.BPM.assignRole()
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Validation Failed. \'bpm-record-id\' Header parameter required')
          })
          .then(done, done)
      })

      it('No BPM Record Id (Negative)', (done) => {
        agilite.BPM.assignRole(invalidValue)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Validation Failed. \'bpm-record-id\' Header parameter required')
          })
          .then(done, done)
      })

      it('No Current User (Negative)', (done) => {
        agilite.BPM.assignRole(invalidValue, invalidValue)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Validation Failed. \'current-user\' Header parameter required')
          })
          .then(done, done)
      })

      it('No Responsible Users (Negative)', (done) => {
        agilite.BPM.assignRole(invalidValue, invalidValue, null, invalidValue)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Validation Failed. \'role-name\' Header parameter required')
          })
          .then(done, done)
      })
    })

    describe('Positive Test', () => {
      it('Success', (done) => {
        agilite.BPM.assignRole(processKey, bpmRecordId, DataTemplate.modified.data.processSteps[0].responsibleRole, 'johann@agilite.io', ['users'])
          .then(response => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
            expect(response.data).to.haveOwnProperty('hasChanged')
            expect(TypeDetect(response.data.hasChanged)).to.equal(EnumsTypeDetect.BOOLEAN)
            expect(response.data.hasChanged).to.equal(true)
          })
          .then(done, done)
      })
    })
  })

  describe('Clear History Data', () => {
    describe('Negative Tests', () => {
      it('No Param (Negative)', (done) => {
        agilite.BPM.clearHistoryData()
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
    })

    describe('Positive Test', () => {
      it('Clear History Data - Success', (done) => {
        agilite.BPM.clearHistoryData(key)
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
          })
          .then(done, done)
      })
    })
  })

  describe('Get Assigned Roles', () => {
    describe('Negative Tests', () => {
      it('No Params (Negative)', (done) => {
        agilite.BPM.getAssignedRoles()
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('At least one header property of (\'process-key\', \'bpm-record-id\', \'role-names\') needs to be provided')
          })
          .then(done, done)
      })

      it('No BPM Record Id (Negative)', (done) => {
        agilite.BPM.getAssignedRoles(invalidValue)
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.ARRAY)
            expect(JSON.stringify(response.data)).to.equal('[]')
          })
          .then(done, done)
      })
    })

    describe('Positive Test', () => {
      it('Success', (done) => {
        agilite.BPM.getAssignedRoles(invalidValue, invalidValue)
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.ARRAY)

            response.data.map(entry => {
              expect(entry).to.haveOwnProperty('name')
              expect(TypeDetect(entry.name)).to.equal(EnumsTypeDetect.STRING)
              expect(entry).to.haveOwnProperty('users')
              expect(TypeDetect(entry.users)).to.equal(EnumsTypeDetect.ARRAY)
            })
          })
          .then(done, done)
      })
    })
  })

  describe('Get Active Steps', () => {
    describe('Negative Tests', () => {
      it('No Param (Negative)', (done) => {
        agilite.BPM.getActiveSteps()
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Validation Failed. \'process-key\' Header parameter required')
          })
          .then(done, done)
      })
    })

    describe('Positive Test', () => {
      it('Success', (done) => {
        agilite.BPM.getActiveSteps(key)
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.ARRAY)
            expect(response.data.lenght).to.not.equal(0)
          })
          .then(done, done)
      })
    })
  })

  describe('Get Active Users', () => {
    describe('Negative Tests', () => {
      it('No Param (Negative)', (done) => {
        agilite.BPM.getActiveUsers()
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Validation Failed. \'process-key\' Header parameter required')
          })
          .then(done, done)
      })
    })

    describe('Positive Test', () => {
      it('Success', (done) => {
        agilite.BPM.getActiveUsers(key)
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.ARRAY)
            expect(response.data.lenght).to.not.equal(0)
          })
          .then(done, done)
      })
    })
  })

  describe('Delete BPM Stubs', () => {
    describe('Negative Tests', () => {
      it('No Params', (done) => {
        agilite.BPM.deleteBPMStubs()
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Validation Failed. \'process-key\' Header parameter required')
          })
          .then(done, done)
      })

      it('No BPM Record Ids', (done) => {
        agilite.BPM.deleteBPMStubs(key, '')
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Validation Failed. \'bpm-record-ids\' Header parameter required')
          })
          .then(done, done)
      })
    })

    describe('Positive Test', () => {
      it('Success', (done) => {
        agilite.BPM.deleteBPMStubs(key, recordId)
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
            expect(JSON.stringify(response.data)).to.equal('{}')
          })
          .then(done, done)
      })
    })
  })

  describe('Delete Record', () => {
    describe('Negative Tests', () => {
      it('No Record Id (Negative)', (done) => {
        agilite.BPM.deleteData()
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

      it.skip('Invalid Record Id (Negative)', (done) => {
        agilite.BPM.deleteData(invalidValue)
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

    describe('Positive Test', () => {
      it('Success', (done) => {
        agilite.BPM.deleteData(recordId)
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
            expect(JSON.stringify(response.data)).to.equal('{}')
          })
          .then(done, done)
      })
    })
  })
})
