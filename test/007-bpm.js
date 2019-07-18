'use strict'

require('dotenv').config()
const UUID = require('uuid')
const TypeDetect = require('type-detect')
const expect = require('chai').expect
const Agilite = require('../controllers/agilite')
const Enums = require('../utils/enums')
const DataTemplate = require('../data-templates/bpm')

const agilite = new Agilite({
  apiServerUrl: process.env.API_SERVER_URL,
  apiKey: process.env.API_KEY
})

describe('Agilit-e BPM', () => {
  let mainEntry = null
  let tmpEntry = null
  let recordId = null
  let recordId2 = null
  let key = UUID.v1()
  let groupName = UUID.v1()
  let stepId = UUID.v1()
  let optionId = UUID.v1()

  it('Create New Record', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.new))
    mainEntry.data.key = key
    mainEntry.data.name = key

    agilite.BPM.postData(mainEntry)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_OBJECT_PROPER)

        // Check if Optional Fields exists
        expect(response.data.data).to.haveOwnProperty('isActive')
        expect(response.data.data).to.haveOwnProperty('description')
        expect(response.data.data).to.haveOwnProperty('groupName')
        expect(response.data.data).to.haveOwnProperty('appUrl')
        expect(response.data.data).to.haveOwnProperty('referenceUrl')
        expect(response.data.data).to.haveOwnProperty('appAdmin')
        expect(response.data.data).to.haveOwnProperty('processSteps')
        expect(response.data.data).to.haveOwnProperty('notes')

        // Compare Values to confirm that data passed is the same as the data returned
        expect(response.data.data.key).to.equal(mainEntry.data.key)
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

    agilite.BPM.getData()
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

    mainEntry = JSON.parse(JSON.stringify(DataTemplate.modified))
    mainEntry.data.key = key
    mainEntry.data.name = key
    mainEntry.data.groupName = groupName
    mainEntry.data.processSteps[0]._id = stepId
    mainEntry.data.processSteps[0].stepOptions[0]._id = optionId

    agilite.BPM.putData(recordId, mainEntry)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_OBJECT_PROPER)

        // Check if pre-defined exists and contains passed value
        expect(response.data.data.groupName).to.equal(mainEntry.data.groupName)
        expect(response.data.data.processSteps[0]._id).to.equal(stepId)
        expect(response.data.data.processSteps[0].stepOptions[0]._id).to.equal(optionId)
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Get Record State - 1', (done) => {
    agilite.BPM.getRecordState([key])
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_ARRAY_PROPER)
        expect(response.data.length).to.equal(0)
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Get Active Steps - 1', (done) => {
    agilite.BPM.getActiveSteps(key)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_ARRAY_PROPER)
        expect(response.data.length).to.be.equal(0)
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Get Active Users - 1', (done) => {
    agilite.BPM.getActiveUsers(key)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_ARRAY_PROPER)
        expect(response.data.length).to.be.equal(0)
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Register BPM Record', (done) => {
    agilite.BPM.registerBPMRecord(key, 'user.current@acme.com')
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_OBJECT_PROPER)

        tmpEntry = response.data
        recordId2 = tmpEntry.recordId

        expect(tmpEntry).to.haveOwnProperty('_id')
        expect(tmpEntry).to.haveOwnProperty('key')
        expect(tmpEntry).to.haveOwnProperty('name')
        expect(tmpEntry).to.haveOwnProperty('description')
        expect(tmpEntry).to.haveOwnProperty('instructions')
        expect(tmpEntry).to.haveOwnProperty('duration')
        expect(tmpEntry).to.haveOwnProperty('processStage')
        expect(tmpEntry).to.haveOwnProperty('responsibleRole')
        expect(tmpEntry).to.haveOwnProperty('visibleObjects')
        expect(tmpEntry).to.haveOwnProperty('stepOptions')
        expect(tmpEntry).to.haveOwnProperty('referenceUrl')
        expect(tmpEntry).to.haveOwnProperty('responsibleUsers')
        expect(tmpEntry).to.haveOwnProperty('history')
        expect(tmpEntry).to.haveOwnProperty('recordId')
        expect(tmpEntry).to.haveOwnProperty('roles')
        expect(tmpEntry).to.haveOwnProperty('eventStampHistory')

        expect(tmpEntry._id).to.be.equal(stepId)
        expect(tmpEntry.key).to.be.equal('first_step')
        expect(tmpEntry.stepOptions.length).to.be.equal(1)
        expect(tmpEntry.stepOptions[0]._id).to.be.equal(optionId)
        expect(tmpEntry.roles.length).to.be.equal(1)
        expect(tmpEntry.history.length).to.be.equal(1)
        expect(tmpEntry.eventStampHistory.length).to.be.equal(1)
        expect(tmpEntry.recordRef).to.be.equal(key + '-1')
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Get By Profile Key', (done) => {
    agilite.BPM.getByProfileKey(key)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_OBJECT_PROPER)

        tmpEntry = response.data

        expect(tmpEntry).to.haveOwnProperty('key')
        expect(tmpEntry).to.haveOwnProperty('name')
        expect(tmpEntry).to.haveOwnProperty('description')
        expect(tmpEntry).to.haveOwnProperty('groupName')
        expect(tmpEntry).to.haveOwnProperty('appUrl')
        expect(tmpEntry).to.haveOwnProperty('referenceUrl')
        expect(tmpEntry).to.haveOwnProperty('appAdmin')
        expect(tmpEntry).to.haveOwnProperty('notes')
        expect(tmpEntry).to.haveOwnProperty('processSteps')
        expect(tmpEntry.processSteps.length).to.be.equal(1)
        expect(tmpEntry.processSteps[0]._id).to.be.equal(stepId)
        expect(tmpEntry.processSteps[0].stepOptions.length).to.be.equal(1)
        expect(tmpEntry.processSteps[0].stepOptions[0]._id).to.be.equal(optionId)
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Get Record State - 2', (done) => {
    agilite.BPM.getRecordState([key])
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_ARRAY_PROPER)
        expect(response.data.length).to.be.equal(1)

        tmpEntry = response.data[0]

        expect(tmpEntry).to.haveOwnProperty('_id')
        expect(tmpEntry).to.haveOwnProperty('key')
        expect(tmpEntry).to.haveOwnProperty('name')
        expect(tmpEntry).to.haveOwnProperty('description')
        expect(tmpEntry).to.haveOwnProperty('instructions')
        expect(tmpEntry).to.haveOwnProperty('duration')
        expect(tmpEntry).to.haveOwnProperty('processStage')
        expect(tmpEntry).to.haveOwnProperty('responsibleRole')
        expect(tmpEntry).to.haveOwnProperty('visibleObjects')
        expect(tmpEntry).to.haveOwnProperty('stepOptions')
        expect(tmpEntry).to.haveOwnProperty('referenceUrl')
        expect(tmpEntry).to.haveOwnProperty('responsibleUsers')
        expect(tmpEntry).to.haveOwnProperty('history')
        expect(tmpEntry).to.haveOwnProperty('recordId')
        expect(tmpEntry).to.haveOwnProperty('roles')
        expect(tmpEntry).to.haveOwnProperty('eventStampHistory')
        expect(tmpEntry).to.haveOwnProperty('submittedIntoStep')
        expect(tmpEntry).to.haveOwnProperty('targetTimeDuration')

        expect(tmpEntry._id).to.be.equal(stepId)
        expect(tmpEntry.key).to.be.equal('first_step')
        expect(tmpEntry.stepOptions.length).to.be.equal(1)
        expect(tmpEntry.stepOptions[0]._id).to.be.equal(optionId)
        expect(tmpEntry.roles.length).to.be.equal(1)
        expect(tmpEntry.history.length).to.be.equal(1)
        expect(tmpEntry.eventStampHistory.length).to.be.equal(1)
        expect(tmpEntry.recordRef).to.be.equal(key + '-1')
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Get Active Steps - 2', (done) => {
    agilite.BPM.getActiveSteps(key)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_ARRAY_PROPER)
        expect(response.data.length).to.be.equal(1)
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Get Active Users - 2', (done) => {
    agilite.BPM.getActiveUsers(key)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_ARRAY_PROPER)
        expect(response.data.length).to.be.equal(1)
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Execute - Submit', (done) => {
    agilite.BPM.execute(key, recordId2, 'Submit', 'user.current2@acme.com', 'Test Comments')
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_OBJECT_PROPER)

        tmpEntry = response.data

        expect(tmpEntry).to.haveOwnProperty('_id')
        expect(tmpEntry).to.haveOwnProperty('isActive')
        expect(tmpEntry).to.haveOwnProperty('firstStep')
        expect(tmpEntry).to.haveOwnProperty('key')
        expect(tmpEntry).to.haveOwnProperty('name')
        expect(tmpEntry).to.haveOwnProperty('description')
        expect(tmpEntry).to.haveOwnProperty('instructions')
        expect(tmpEntry).to.haveOwnProperty('duration')
        expect(tmpEntry).to.haveOwnProperty('processStage')
        expect(tmpEntry).to.haveOwnProperty('responsibility')
        expect(tmpEntry).to.haveOwnProperty('responsibleRole')
        expect(tmpEntry).to.haveOwnProperty('eventStamp')
        expect(tmpEntry).to.haveOwnProperty('roleLevels')
        expect(tmpEntry).to.haveOwnProperty('visibleObjects')
        expect(tmpEntry).to.haveOwnProperty('stepOptions')
        expect(tmpEntry).to.haveOwnProperty('notes')
        expect(tmpEntry).to.haveOwnProperty('referenceUrl')
        expect(tmpEntry).to.haveOwnProperty('responsibleUsers')
        expect(tmpEntry).to.haveOwnProperty('submittedIntoStep')
        expect(tmpEntry).to.haveOwnProperty('targetTimeDuration')
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Get Record State - 3', (done) => {
    agilite.BPM.getRecordState([key])
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_ARRAY_PROPER)
        expect(response.data.length).to.be.equal(1)

        tmpEntry = response.data[0]

        expect(tmpEntry.history.length).to.be.equal(2)
        expect(tmpEntry.eventStampHistory.length).to.be.equal(2)
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Clear History Data', (done) => {
    agilite.BPM.clearHistoryData(key)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_OBJECT_PROPER)
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Delete Record', (done) => {
    expect(recordId).to.not.equal(null)

    agilite.BPM.deleteData(recordId)
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
