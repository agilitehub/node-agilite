'use strict'

require('agilite-utils/dotenv').config()
const UUID = require('agilite-utils/uuid')
const TypeDetect = require('agilite-utils/type-detect')
const expect = require('chai').expect
const Agilite = require('../controllers/agilite')
const EnumsTypeDetect = require('agilite-utils/enums-type-detect')
const DataTemplate = require('../data-templates/bpm')
const Enums = require('../utils/enums')
const MochaAgiliteCon = require('../mocha-agilite/controller')
const BPMModel = require('../test-models/bpm')

const agilite = new Agilite({
  apiServerUrl: process.env.API_SERVER_URL,
  apiKey: process.env.API_KEY
})

describe('Agilit-e Automated BPM', async () => { // eslint-disable-line
  const unitTests = await MochaAgiliteCon.init('bpm', true, BPMModel)
  for (const test of unitTests) MochaAgiliteCon.execute(test, agilite)
})

describe('\nAgilit-e BPM Custom Tests\n', async () => { // eslint-disable-line
  const invalidValue = 'invalid_value'
  const key = UUID.v1()

  let mainEntry = null
  let tmpEntry = null
  let recordId = null
  let processKey = null
  let bpmRecordId = null
  let numberingId = null

  describe.only('Process Flow', () => { // eslint-disable-line
    it('Create New Record', (done) => { // eslint-disable-line
      mainEntry = JSON.parse(JSON.stringify(DataTemplate.new))
      mainEntry.data.key = key
      mainEntry.data.name = key

      agilite.BPM.postData(mainEntry)
        .then((response) => {
          expect(response).to.haveOwnProperty('data')
          expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)

          // Check 1st level properties
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

          // Check if provided values match
          expect(response.data).to.haveOwnProperty('data')
          expect(TypeDetect(response.data.data)).to.equal(EnumsTypeDetect.OBJECT)
          expect(response.data.data).to.haveOwnProperty('key')
          expect(TypeDetect(response.data.data.key)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.data.key).to.equal(key)
          expect(response.data.data).to.haveOwnProperty('name')
          expect(TypeDetect(response.data.data.name)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.data.name).to.equal(mainEntry.data.name)

          // Check if provided values exist and have defaults
          expect(response.data.data).to.haveOwnProperty('isActive')
          expect(TypeDetect(response.data.data.isActive)).to.equal(EnumsTypeDetect.BOOLEAN)
          expect(response.data.data.isActive).to.equal(true)

          expect(response.data.data).to.haveOwnProperty('description')
          expect(TypeDetect(response.data.data.description)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.data.description).to.equal(mainEntry.data.description)

          expect(response.data.data).to.haveOwnProperty('groupName')
          expect(TypeDetect(response.data.data.groupName)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.data.groupName).to.equal(Enums.STRING_EMPTY)

          expect(response.data.data).to.haveOwnProperty('appUrl')
          expect(TypeDetect(response.data.data.appUrl)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.data.appUrl).to.equal(Enums.STRING_EMPTY)

          expect(response.data.data).to.haveOwnProperty('referenceUrl')
          expect(TypeDetect(response.data.data.referenceUrl)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.data.referenceUrl).to.equal(Enums.STRING_EMPTY)

          expect(response.data.data).to.haveOwnProperty('appAdmin')
          expect(TypeDetect(response.data.data.appAdmin)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.data.appAdmin).to.equal(Enums.STRING_EMPTY)

          expect(response.data.data).to.haveOwnProperty('notes')
          expect(TypeDetect(response.data.data.notes)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.data.notes).to.equal(Enums.STRING_EMPTY)

          expect(response.data.data).to.haveOwnProperty('numberingId')
          expect(TypeDetect(response.data.data.numberingId)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.data.numberingId).to.not.equal(Enums.STRING_EMPTY)

          // Check for Arrays and objects
          expect(response.data.data).to.haveOwnProperty('solutions')
          expect(TypeDetect(response.data.data.solutions)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data.data).to.haveOwnProperty('keywords')
          expect(TypeDetect(response.data.data.keywords)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data.data).to.haveOwnProperty('iln')
          expect(TypeDetect(response.data.data.iln)).to.equal(EnumsTypeDetect.OBJECT)

          // Check iln Object properties
          expect(response.data.data.iln).to.haveOwnProperty('name')
          expect(TypeDetect(response.data.data.iln.name)).to.equal(EnumsTypeDetect.OBJECT)
          expect(response.data.data.iln.name).to.haveOwnProperty('en')
          expect(TypeDetect(response.data.data.iln.name.en)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.data.iln.name.en).to.equal(mainEntry.data.name)
          expect(response.data.data.iln).to.haveOwnProperty('description')
          expect(TypeDetect(response.data.data.iln.description)).to.equal(EnumsTypeDetect.OBJECT)
          expect(response.data.data.iln.description).to.haveOwnProperty('en')
          expect(TypeDetect(response.data.data.iln.description.en)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.data.iln.description.en).to.equal(mainEntry.data.description)

          expect(response.data.data).to.haveOwnProperty('processSteps')
          expect(TypeDetect(response.data.data.processSteps)).to.equal(EnumsTypeDetect.ARRAY)

          // Check processStep values
          for (const x in response.data.data.processSteps) {
            expect(response.data.data.processSteps[x]).to.haveOwnProperty('_id')
            expect(TypeDetect(response.data.data.processSteps[x]._id)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.data.processSteps[x]._id).to.equal(mainEntry.data.processSteps[x]._id)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('isNewEntry')
            expect(TypeDetect(response.data.data.processSteps[x].isNewEntry)).to.equal(EnumsTypeDetect.BOOLEAN)
            expect(response.data.data.processSteps[x].isNewEntry).to.equal(mainEntry.data.processSteps[x].isNewEntry)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('isActive')
            expect(TypeDetect(response.data.data.processSteps[x].isActive)).to.equal(EnumsTypeDetect.BOOLEAN)
            expect(response.data.data.processSteps[x].isActive).to.equal(mainEntry.data.processSteps[x].isActive)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('stepType')
            expect(TypeDetect(response.data.data.processSteps[x].stepType)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.data.processSteps[x].stepType).to.equal(mainEntry.data.processSteps[x].stepType)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('key')
            expect(TypeDetect(response.data.data.processSteps[x].key)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.data.processSteps[x].key).to.equal(mainEntry.data.processSteps[x].key)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('name')
            expect(TypeDetect(response.data.data.processSteps[x].name)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.data.processSteps[x].name).to.equal(mainEntry.data.processSteps[x].name)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('description')
            expect(TypeDetect(response.data.data.processSteps[x].description)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.data.processSteps[x].description).to.equal(mainEntry.data.processSteps[x].description)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('instructions')
            expect(TypeDetect(response.data.data.processSteps[x].instructions)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.data.processSteps[x].instructions).to.equal(mainEntry.data.processSteps[x].instructions)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('duration')
            expect(TypeDetect(response.data.data.processSteps[x].duration)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.data.processSteps[x].duration).to.equal(mainEntry.data.processSteps[x].duration)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('processStage')
            expect(TypeDetect(response.data.data.processSteps[x].processStage)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.data.processSteps[x].processStage).to.equal(mainEntry.data.processSteps[x].processStage)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('responsibility')
            expect(TypeDetect(response.data.data.processSteps[x].responsibility)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.data.processSteps[x].responsibility).to.equal(mainEntry.data.processSteps[x].responsibility)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('responsibleRole')
            expect(TypeDetect(response.data.data.processSteps[x].responsibleRole)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.data.processSteps[x].responsibleRole).to.equal(mainEntry.data.processSteps[x].responsibleRole)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('notes')
            expect(TypeDetect(response.data.data.processSteps[x].notes)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.data.processSteps[x].notes).to.equal(mainEntry.data.processSteps[x].notes)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('referenceUrl')
            expect(TypeDetect(response.data.data.processSteps[x].referenceUrl)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.data.processSteps[x].referenceUrl).to.equal(mainEntry.data.processSteps[x].referenceUrl)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('notificationTemplate')
            expect(TypeDetect(response.data.data.processSteps[x].notificationTemplate)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.data.processSteps[x].notificationTemplate).to.equal(mainEntry.data.processSteps[x].notificationTemplate)

            // Check Arrays and Objects
            expect(response.data.data.processSteps[x]).to.haveOwnProperty('roleLevels')
            expect(TypeDetect(response.data.data.processSteps[x].roleLevels)).to.equal(EnumsTypeDetect.ARRAY)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('visibleObjects')
            expect(TypeDetect(response.data.data.processSteps[x].visibleObjects)).to.equal(EnumsTypeDetect.ARRAY)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('keywords')
            expect(TypeDetect(response.data.data.processSteps[x].keywords)).to.equal(EnumsTypeDetect.ARRAY)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('eventStamp')
            expect(TypeDetect(response.data.data.processSteps[x].eventStamp)).to.equal(EnumsTypeDetect.ARRAY)

            // Check Event Stamp Values
            expect(TypeDetect(response.data.data.processSteps[x].eventStamp[0])).to.equal(EnumsTypeDetect.OBJECT)
            expect(response.data.data.processSteps[x].eventStamp[0]).to.haveOwnProperty('value')
            expect(TypeDetect(response.data.data.processSteps[x].eventStamp[0].value)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.data.processSteps[x].eventStamp[0].value).to.equal(mainEntry.data.processSteps[x].eventStamp[0].value)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('iln')
            expect(TypeDetect(response.data.data.processSteps[x].iln)).to.equal(EnumsTypeDetect.OBJECT)

            // Check Iln Object Values
            expect(response.data.data.processSteps[x].iln).to.haveOwnProperty('name')
            expect(TypeDetect(response.data.data.processSteps[x].iln.name)).to.equal(EnumsTypeDetect.OBJECT)
            expect(response.data.data.processSteps[x].iln.name).to.haveOwnProperty('en')
            expect(TypeDetect(response.data.data.processSteps[x].iln.name.en)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.data.processSteps[x].iln.name.en).to.equal(mainEntry.data.processSteps[x].name)
            expect(response.data.data.processSteps[x].iln).to.haveOwnProperty('description')
            expect(TypeDetect(response.data.data.processSteps[x].iln.description)).to.equal(EnumsTypeDetect.OBJECT)
            expect(response.data.data.processSteps[x].iln.description).to.haveOwnProperty('en')
            expect(TypeDetect(response.data.data.processSteps[x].iln.description.en)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.data.processSteps[x].iln.description.en).to.equal(mainEntry.data.processSteps[x].description)
            expect(response.data.data.processSteps[x].iln).to.haveOwnProperty('processStage')
            expect(TypeDetect(response.data.data.processSteps[x].iln.processStage)).to.equal(EnumsTypeDetect.OBJECT)
            expect(response.data.data.processSteps[x].iln.processStage).to.haveOwnProperty('en')
            expect(TypeDetect(response.data.data.processSteps[x].iln.processStage.en)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.data.processSteps[x].iln.processStage.en).to.equal(mainEntry.data.processSteps[x].processStage)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('stepOptions')
            expect(TypeDetect(response.data.data.processSteps[x].stepOptions)).to.equal(EnumsTypeDetect.ARRAY)

            // Check stepOptions values
            for (const y in response.data.data.processSteps[x].stepOptions) {
              expect(response.data.data.processSteps[x].stepOptions[y]).to.haveOwnProperty('_id')
              expect(TypeDetect(response.data.data.processSteps[x].stepOptions[y]._id)).to.equal(EnumsTypeDetect.STRING)
              expect(response.data.data.processSteps[x].stepOptions[y]._id).to.equal(mainEntry.data.processSteps[x].stepOptions[y]._id)

              expect(response.data.data.processSteps[x].stepOptions[y]).to.haveOwnProperty('isNewEntry')
              expect(TypeDetect(response.data.data.processSteps[x].stepOptions[y].isNewEntry)).to.equal(EnumsTypeDetect.BOOLEAN)
              expect(response.data.data.processSteps[x].stepOptions[y].isNewEntry).to.equal(mainEntry.data.processSteps[x].stepOptions[y].isNewEntry)

              expect(response.data.data.processSteps[x].stepOptions[y]).to.haveOwnProperty('isActive')
              expect(TypeDetect(response.data.data.processSteps[x].stepOptions[y].isActive)).to.equal(EnumsTypeDetect.BOOLEAN)
              expect(response.data.data.processSteps[x].stepOptions[y].isActive).to.equal(mainEntry.data.processSteps[x].stepOptions[y].isActive)

              expect(response.data.data.processSteps[x].stepOptions[y]).to.haveOwnProperty('key')
              expect(TypeDetect(response.data.data.processSteps[x].stepOptions[y].key)).to.equal(EnumsTypeDetect.STRING)
              expect(response.data.data.processSteps[x].stepOptions[y].key).to.equal(mainEntry.data.processSteps[x].stepOptions[y].key)

              expect(response.data.data.processSteps[x].stepOptions[y]).to.haveOwnProperty('name')
              expect(TypeDetect(response.data.data.processSteps[x].stepOptions[y].name)).to.equal(EnumsTypeDetect.STRING)
              expect(response.data.data.processSteps[x].stepOptions[y].name).to.equal(mainEntry.data.processSteps[x].stepOptions[y].name)

              expect(response.data.data.processSteps[x].stepOptions[y]).to.haveOwnProperty('description')
              expect(TypeDetect(response.data.data.processSteps[x].stepOptions[y].description)).to.equal(EnumsTypeDetect.STRING)
              expect(response.data.data.processSteps[x].stepOptions[y].description).to.equal(mainEntry.data.processSteps[x].stepOptions[y].description)

              expect(response.data.data.processSteps[x].stepOptions[y]).to.haveOwnProperty('nextStep')
              expect(TypeDetect(response.data.data.processSteps[x].stepOptions[y].nextStep)).to.equal(EnumsTypeDetect.STRING)
              expect(response.data.data.processSteps[x].stepOptions[y].nextStep).to.equal(mainEntry.data.processSteps[x].stepOptions[y].nextStep)

              expect(response.data.data.processSteps[x].stepOptions[y]).to.haveOwnProperty('notes')
              expect(TypeDetect(response.data.data.processSteps[x].stepOptions[y].notes)).to.equal(EnumsTypeDetect.STRING)
              expect(response.data.data.processSteps[x].stepOptions[y].notes).to.equal(mainEntry.data.processSteps[x].stepOptions[y].notes)

              // Check Arrays and Objects
              expect(response.data.data.processSteps[x].stepOptions[y]).to.haveOwnProperty('visibleObjects')
              expect(TypeDetect(response.data.data.processSteps[x].stepOptions[y].visibleObjects)).to.equal(EnumsTypeDetect.ARRAY)

              expect(response.data.data.processSteps[x].stepOptions[y]).to.haveOwnProperty('keywords')
              expect(TypeDetect(response.data.data.processSteps[x].stepOptions[y].keywords)).to.equal(EnumsTypeDetect.ARRAY)

              expect(response.data.data.processSteps[x].stepOptions[y]).to.haveOwnProperty('eventStamp')
              expect(TypeDetect(response.data.data.processSteps[x].stepOptions[y].eventStamp)).to.equal(EnumsTypeDetect.ARRAY)

              // Check Event Stamp values
              expect(TypeDetect(response.data.data.processSteps[x].stepOptions[y].eventStamp[0])).to.equal(EnumsTypeDetect.OBJECT)
              expect(response.data.data.processSteps[x].stepOptions[y].eventStamp[0]).to.haveOwnProperty('value')
              expect(TypeDetect(response.data.data.processSteps[x].stepOptions[y].eventStamp[0].value)).to.equal(EnumsTypeDetect.STRING)
              expect(response.data.data.processSteps[x].stepOptions[y].eventStamp[0].value).to.equal(mainEntry.data.processSteps[x].stepOptions[y].eventStamp[0].value)

              expect(response.data.data.processSteps[x].stepOptions[y].iln).to.haveOwnProperty('name')
              expect(TypeDetect(response.data.data.processSteps[x].stepOptions[y].iln.name)).to.equal(EnumsTypeDetect.OBJECT)
              expect(response.data.data.processSteps[x].stepOptions[y].iln.name).to.haveOwnProperty('en')
              expect(TypeDetect(response.data.data.processSteps[x].stepOptions[y].iln.name.en)).to.equal(EnumsTypeDetect.STRING)
              expect(response.data.data.processSteps[x].stepOptions[y].iln.name.en).to.equal(mainEntry.data.processSteps[x].stepOptions[y].name)
              expect(response.data.data.processSteps[x].stepOptions[y].iln).to.haveOwnProperty('description')
              expect(TypeDetect(response.data.data.processSteps[x].stepOptions[y].iln.description)).to.equal(EnumsTypeDetect.OBJECT)
              expect(response.data.data.processSteps[x].stepOptions[y].iln.description).to.haveOwnProperty('en')
              expect(TypeDetect(response.data.data.processSteps[x].stepOptions[y].iln.description.en)).to.equal(EnumsTypeDetect.STRING)
              expect(response.data.data.processSteps[x].stepOptions[y].iln.description.en).to.equal(mainEntry.data.processSteps[x].stepOptions[y].description)
            }
          }

          recordId = response.data._id
          numberingId = response.data.data.numberingId
        })
        .then(done, done)
    })

    it('Update Existing Record', (done) => { // eslint-disable-line
      mainEntry = JSON.parse(JSON.stringify(DataTemplate.modified))
      mainEntry.data.key = key
      mainEntry.data.name = 'PUT_' + key
      mainEntry.data.numberingId = numberingId
      mainEntry.data.iln.name.en = 'PUT_' + key

      agilite.BPM.putData(recordId, mainEntry)
        .then((response) => {
          // TODO: Ensure that all props are being checked - JM
          expect(response).to.haveOwnProperty('data')
          expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)

          // Check 1st level properties
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

          // Check if provided values match
          expect(response.data).to.haveOwnProperty('data')
          expect(TypeDetect(response.data.data)).to.equal(EnumsTypeDetect.OBJECT)
          expect(response.data.data).to.haveOwnProperty('key')
          expect(TypeDetect(response.data.data.key)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.data.key).to.equal(key)
          expect(response.data.data).to.haveOwnProperty('name')
          expect(TypeDetect(response.data.data.name)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.data.name).to.equal(mainEntry.data.name)

          // Check if provided values exist and have defaults
          expect(response.data.data).to.haveOwnProperty('isActive')
          expect(TypeDetect(response.data.data.isActive)).to.equal(EnumsTypeDetect.BOOLEAN)
          expect(response.data.data.isActive).to.equal(true)

          expect(response.data.data).to.haveOwnProperty('description')
          expect(TypeDetect(response.data.data.description)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.data.description).to.equal(mainEntry.data.description)

          expect(response.data.data).to.haveOwnProperty('groupName')
          expect(TypeDetect(response.data.data.groupName)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.data.groupName).to.equal(Enums.STRING_EMPTY)

          expect(response.data.data).to.haveOwnProperty('appUrl')
          expect(TypeDetect(response.data.data.appUrl)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.data.appUrl).to.equal(Enums.STRING_EMPTY)

          expect(response.data.data).to.haveOwnProperty('referenceUrl')
          expect(TypeDetect(response.data.data.referenceUrl)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.data.referenceUrl).to.equal(Enums.STRING_EMPTY)

          expect(response.data.data).to.haveOwnProperty('appAdmin')
          expect(TypeDetect(response.data.data.appAdmin)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.data.appAdmin).to.equal(Enums.STRING_EMPTY)

          expect(response.data.data).to.haveOwnProperty('notes')
          expect(TypeDetect(response.data.data.notes)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.data.notes).to.equal(Enums.STRING_EMPTY)

          expect(response.data.data).to.haveOwnProperty('numberingId')
          expect(TypeDetect(response.data.data.numberingId)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.data.numberingId).to.not.equal(Enums.STRING_EMPTY)

          // Check for Arrays and objects
          expect(response.data.data).to.haveOwnProperty('solutions')
          expect(TypeDetect(response.data.data.solutions)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data.data).to.haveOwnProperty('keywords')
          expect(TypeDetect(response.data.data.keywords)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data.data).to.haveOwnProperty('iln')
          expect(TypeDetect(response.data.data.iln)).to.equal(EnumsTypeDetect.OBJECT)

          // Check iln Object properties
          expect(response.data.data.iln).to.haveOwnProperty('name')
          expect(TypeDetect(response.data.data.iln.name)).to.equal(EnumsTypeDetect.OBJECT)
          expect(response.data.data.iln.name).to.haveOwnProperty('en')
          expect(TypeDetect(response.data.data.iln.name.en)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.data.iln.name.en).to.equal(mainEntry.data.name)

          expect(response.data.data).to.haveOwnProperty('processSteps')
          expect(TypeDetect(response.data.data.processSteps)).to.equal(EnumsTypeDetect.ARRAY)

          // Check processStep values
          for (const x in response.data.data.processSteps) {
            expect(response.data.data.processSteps[x]).to.haveOwnProperty('_id')
            expect(TypeDetect(response.data.data.processSteps[x]._id)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.data.processSteps[x]._id).to.equal(mainEntry.data.processSteps[x]._id)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('isNewEntry')
            expect(TypeDetect(response.data.data.processSteps[x].isNewEntry)).to.equal(EnumsTypeDetect.BOOLEAN)
            expect(response.data.data.processSteps[x].isNewEntry).to.equal(mainEntry.data.processSteps[x].isNewEntry)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('isActive')
            expect(TypeDetect(response.data.data.processSteps[x].isActive)).to.equal(EnumsTypeDetect.BOOLEAN)
            expect(response.data.data.processSteps[x].isActive).to.equal(mainEntry.data.processSteps[x].isActive)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('stepType')
            expect(TypeDetect(response.data.data.processSteps[x].stepType)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.data.processSteps[x].stepType).to.equal(mainEntry.data.processSteps[x].stepType)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('key')
            expect(TypeDetect(response.data.data.processSteps[x].key)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.data.processSteps[x].key).to.equal(mainEntry.data.processSteps[x].key)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('name')
            expect(TypeDetect(response.data.data.processSteps[x].name)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.data.processSteps[x].name).to.equal(mainEntry.data.processSteps[x].name)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('description')
            expect(TypeDetect(response.data.data.processSteps[x].description)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.data.processSteps[x].description).to.equal(mainEntry.data.processSteps[x].description)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('instructions')
            expect(TypeDetect(response.data.data.processSteps[x].instructions)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.data.processSteps[x].instructions).to.equal(mainEntry.data.processSteps[x].instructions)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('duration')
            expect(TypeDetect(response.data.data.processSteps[x].duration)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.data.processSteps[x].duration).to.equal(mainEntry.data.processSteps[x].duration)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('processStage')
            expect(TypeDetect(response.data.data.processSteps[x].processStage)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.data.processSteps[x].processStage).to.equal(mainEntry.data.processSteps[x].processStage)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('responsibility')
            expect(TypeDetect(response.data.data.processSteps[x].responsibility)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.data.processSteps[x].responsibility).to.equal(mainEntry.data.processSteps[x].responsibility)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('responsibleRole')
            expect(TypeDetect(response.data.data.processSteps[x].responsibleRole)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.data.processSteps[x].responsibleRole).to.equal(mainEntry.data.processSteps[x].responsibleRole)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('notes')
            expect(TypeDetect(response.data.data.processSteps[x].notes)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.data.processSteps[x].notes).to.equal(mainEntry.data.processSteps[x].notes)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('referenceUrl')
            expect(TypeDetect(response.data.data.processSteps[x].referenceUrl)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.data.processSteps[x].referenceUrl).to.equal(mainEntry.data.processSteps[x].referenceUrl)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('notificationTemplate')
            expect(TypeDetect(response.data.data.processSteps[x].notificationTemplate)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.data.processSteps[x].notificationTemplate).to.equal(mainEntry.data.processSteps[x].notificationTemplate)

            // Check Arrays and Objects
            expect(response.data.data.processSteps[x]).to.haveOwnProperty('roleLevels')
            expect(TypeDetect(response.data.data.processSteps[x].roleLevels)).to.equal(EnumsTypeDetect.ARRAY)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('visibleObjects')
            expect(TypeDetect(response.data.data.processSteps[x].visibleObjects)).to.equal(EnumsTypeDetect.ARRAY)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('keywords')
            expect(TypeDetect(response.data.data.processSteps[x].keywords)).to.equal(EnumsTypeDetect.ARRAY)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('eventStamp')
            expect(TypeDetect(response.data.data.processSteps[x].eventStamp)).to.equal(EnumsTypeDetect.ARRAY)

            // Check Event Stamp Values
            expect(TypeDetect(response.data.data.processSteps[x].eventStamp[0])).to.equal(EnumsTypeDetect.OBJECT)
            expect(response.data.data.processSteps[x].eventStamp[0]).to.haveOwnProperty('value')
            expect(TypeDetect(response.data.data.processSteps[x].eventStamp[0].value)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.data.processSteps[x].eventStamp[0].value).to.equal(mainEntry.data.processSteps[x].eventStamp[0].value)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('iln')
            expect(TypeDetect(response.data.data.processSteps[x].iln)).to.equal(EnumsTypeDetect.OBJECT)

            // Check Iln Object Values
            expect(response.data.data.processSteps[x].iln).to.haveOwnProperty('name')
            expect(TypeDetect(response.data.data.processSteps[x].iln.name)).to.equal(EnumsTypeDetect.OBJECT)
            expect(response.data.data.processSteps[x].iln.name).to.haveOwnProperty('en')
            expect(TypeDetect(response.data.data.processSteps[x].iln.name.en)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.data.processSteps[x].iln.name.en).to.equal(mainEntry.data.processSteps[x].name)
            expect(response.data.data.processSteps[x].iln).to.haveOwnProperty('description')
            expect(TypeDetect(response.data.data.processSteps[x].iln.description)).to.equal(EnumsTypeDetect.OBJECT)
            expect(response.data.data.processSteps[x].iln.description).to.haveOwnProperty('en')
            expect(TypeDetect(response.data.data.processSteps[x].iln.description.en)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.data.processSteps[x].iln.description.en).to.equal(mainEntry.data.processSteps[x].description)
            expect(response.data.data.processSteps[x].iln).to.haveOwnProperty('processStage')
            expect(TypeDetect(response.data.data.processSteps[x].iln.processStage)).to.equal(EnumsTypeDetect.OBJECT)
            expect(response.data.data.processSteps[x].iln.processStage).to.haveOwnProperty('en')
            expect(TypeDetect(response.data.data.processSteps[x].iln.processStage.en)).to.equal(EnumsTypeDetect.STRING)
            expect(response.data.data.processSteps[x].iln.processStage.en).to.equal(mainEntry.data.processSteps[x].processStage)

            expect(response.data.data.processSteps[x]).to.haveOwnProperty('stepOptions')
            expect(TypeDetect(response.data.data.processSteps[x].stepOptions)).to.equal(EnumsTypeDetect.ARRAY)

            // Check stepOptions values
            for (const y in response.data.data.processSteps[x].stepOptions) {
              expect(response.data.data.processSteps[x].stepOptions[y]).to.haveOwnProperty('_id')
              expect(TypeDetect(response.data.data.processSteps[x].stepOptions[y]._id)).to.equal(EnumsTypeDetect.STRING)
              expect(response.data.data.processSteps[x].stepOptions[y]._id).to.equal(mainEntry.data.processSteps[x].stepOptions[y]._id)

              expect(response.data.data.processSteps[x].stepOptions[y]).to.haveOwnProperty('isNewEntry')
              expect(TypeDetect(response.data.data.processSteps[x].stepOptions[y].isNewEntry)).to.equal(EnumsTypeDetect.BOOLEAN)
              expect(response.data.data.processSteps[x].stepOptions[y].isNewEntry).to.equal(mainEntry.data.processSteps[x].stepOptions[y].isNewEntry)

              expect(response.data.data.processSteps[x].stepOptions[y]).to.haveOwnProperty('isActive')
              expect(TypeDetect(response.data.data.processSteps[x].stepOptions[y].isActive)).to.equal(EnumsTypeDetect.BOOLEAN)
              expect(response.data.data.processSteps[x].stepOptions[y].isActive).to.equal(mainEntry.data.processSteps[x].stepOptions[y].isActive)

              expect(response.data.data.processSteps[x].stepOptions[y]).to.haveOwnProperty('key')
              expect(TypeDetect(response.data.data.processSteps[x].stepOptions[y].key)).to.equal(EnumsTypeDetect.STRING)
              expect(response.data.data.processSteps[x].stepOptions[y].key).to.equal(mainEntry.data.processSteps[x].stepOptions[y].key)

              expect(response.data.data.processSteps[x].stepOptions[y]).to.haveOwnProperty('name')
              expect(TypeDetect(response.data.data.processSteps[x].stepOptions[y].name)).to.equal(EnumsTypeDetect.STRING)
              expect(response.data.data.processSteps[x].stepOptions[y].name).to.equal(mainEntry.data.processSteps[x].stepOptions[y].name)

              expect(response.data.data.processSteps[x].stepOptions[y]).to.haveOwnProperty('description')
              expect(TypeDetect(response.data.data.processSteps[x].stepOptions[y].description)).to.equal(EnumsTypeDetect.STRING)
              expect(response.data.data.processSteps[x].stepOptions[y].description).to.equal(mainEntry.data.processSteps[x].stepOptions[y].description)

              expect(response.data.data.processSteps[x].stepOptions[y]).to.haveOwnProperty('nextStep')
              expect(TypeDetect(response.data.data.processSteps[x].stepOptions[y].nextStep)).to.equal(EnumsTypeDetect.STRING)
              expect(response.data.data.processSteps[x].stepOptions[y].nextStep).to.equal(mainEntry.data.processSteps[x].stepOptions[y].nextStep)

              expect(response.data.data.processSteps[x].stepOptions[y]).to.haveOwnProperty('notes')
              expect(TypeDetect(response.data.data.processSteps[x].stepOptions[y].notes)).to.equal(EnumsTypeDetect.STRING)
              expect(response.data.data.processSteps[x].stepOptions[y].notes).to.equal(mainEntry.data.processSteps[x].stepOptions[y].notes)

              // Check Arrays and Objects
              expect(response.data.data.processSteps[x].stepOptions[y]).to.haveOwnProperty('visibleObjects')
              expect(TypeDetect(response.data.data.processSteps[x].stepOptions[y].visibleObjects)).to.equal(EnumsTypeDetect.ARRAY)

              expect(response.data.data.processSteps[x].stepOptions[y]).to.haveOwnProperty('keywords')
              expect(TypeDetect(response.data.data.processSteps[x].stepOptions[y].keywords)).to.equal(EnumsTypeDetect.ARRAY)

              expect(response.data.data.processSteps[x].stepOptions[y]).to.haveOwnProperty('eventStamp')
              expect(TypeDetect(response.data.data.processSteps[x].stepOptions[y].eventStamp)).to.equal(EnumsTypeDetect.ARRAY)

              // Check Event Stamp values
              expect(TypeDetect(response.data.data.processSteps[x].stepOptions[y].eventStamp[0])).to.equal(EnumsTypeDetect.OBJECT)
              expect(response.data.data.processSteps[x].stepOptions[y].eventStamp[0]).to.haveOwnProperty('value')
              expect(TypeDetect(response.data.data.processSteps[x].stepOptions[y].eventStamp[0].value)).to.equal(EnumsTypeDetect.STRING)
              expect(response.data.data.processSteps[x].stepOptions[y].eventStamp[0].value).to.equal(mainEntry.data.processSteps[x].stepOptions[y].eventStamp[0].value)

              expect(response.data.data.processSteps[x].stepOptions[y].iln).to.haveOwnProperty('name')
              expect(TypeDetect(response.data.data.processSteps[x].stepOptions[y].iln.name)).to.equal(EnumsTypeDetect.OBJECT)
              expect(response.data.data.processSteps[x].stepOptions[y].iln.name).to.haveOwnProperty('en')
              expect(TypeDetect(response.data.data.processSteps[x].stepOptions[y].iln.name.en)).to.equal(EnumsTypeDetect.STRING)
              expect(response.data.data.processSteps[x].stepOptions[y].iln.name.en).to.equal(mainEntry.data.processSteps[x].stepOptions[y].name)
              expect(response.data.data.processSteps[x].stepOptions[y].iln).to.haveOwnProperty('description')
              expect(TypeDetect(response.data.data.processSteps[x].stepOptions[y].iln.description)).to.equal(EnumsTypeDetect.OBJECT)
              expect(response.data.data.processSteps[x].stepOptions[y].iln.description).to.haveOwnProperty('en')
              expect(TypeDetect(response.data.data.processSteps[x].stepOptions[y].iln.description.en)).to.equal(EnumsTypeDetect.STRING)
              expect(response.data.data.processSteps[x].stepOptions[y].iln.description.en).to.equal(mainEntry.data.processSteps[x].stepOptions[y].description)
            }
          }
        })
        .then(done, done)
    })

    // TODO: Fix from here downwards
    it('Register BPM Record', (done) => { // eslint-disable-line
      mainEntry = JSON.parse(JSON.stringify(DataTemplate.modified))
      mainEntry.data.key = key
      mainEntry.data.name = 'PUT_' + key
      mainEntry.data.numberingId = numberingId
      mainEntry.data.iln.name.en = 'PUT_' + key

      agilite.BPM.registerBPMRecord(key, 'user')
        .then((response) => {
          expect(response).to.haveOwnProperty('data')
          expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)

          // Check values
          expect(response.data).to.haveOwnProperty('_id')
          expect(TypeDetect(response.data._id)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data._id).to.equal(mainEntry.data.processSteps[0]._id)

          expect(response.data).to.haveOwnProperty('key')
          expect(TypeDetect(response.data.key)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.key).to.equal(mainEntry.data.processSteps[0].key)

          expect(response.data).to.haveOwnProperty('name')
          expect(TypeDetect(response.data.name)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.name).to.equal(mainEntry.data.processSteps[0].name)

          expect(response.data).to.haveOwnProperty('description')
          expect(TypeDetect(response.data.description)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.description).to.equal(mainEntry.data.processSteps[0].description)

          expect(response.data).to.haveOwnProperty('instructions')
          expect(TypeDetect(response.data.instructions)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.instructions).to.equal(mainEntry.data.processSteps[0].instructions)

          expect(response.data).to.haveOwnProperty('duration')
          expect(TypeDetect(response.data.duration)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.duration).to.equal(mainEntry.data.processSteps[0].duration)

          expect(response.data).to.haveOwnProperty('processStage')
          expect(TypeDetect(response.data.processStage)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.processStage).to.equal(mainEntry.data.processSteps[0].processStage)

          expect(response.data).to.haveOwnProperty('responsibleRole')
          expect(TypeDetect(response.data.responsibleRole)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.responsibleRole).to.equal(mainEntry.data.processSteps[0].responsibleRole)

          expect(response.data).to.haveOwnProperty('referenceUrl')
          expect(TypeDetect(response.data.referenceUrl)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.referenceUrl).to.equal(mainEntry.data.referenceUrl)

          expect(response.data).to.haveOwnProperty('notificationTemplate')
          expect(TypeDetect(response.data.notificationTemplate)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.notificationTemplate).to.equal(mainEntry.data.processSteps[0].referenceUrl)

          expect(response.data).to.haveOwnProperty('recordId')
          expect(TypeDetect(response.data.recordId)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.recordId).to.not.equal(Enums.STRING_EMPTY)

          expect(response.data).to.haveOwnProperty('recordRef')
          expect(TypeDetect(response.data.recordRef)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.recordRef).to.not.equal(Enums.STRING_EMPTY)

          expect(response.data).to.haveOwnProperty('processKey')
          expect(TypeDetect(response.data.processKey)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.processKey).to.not.equal(Enums.STRING_EMPTY)

          expect(response.data).to.haveOwnProperty('responsibleUsers')
          expect(TypeDetect(response.data.responsibleUsers)).to.equal(EnumsTypeDetect.ARRAY)
          expect(response.data.responsibleUsers[0]).to.equal('user')

          expect(response.data).to.haveOwnProperty('visibleObjects')
          expect(TypeDetect(response.data.visibleObjects)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data).to.haveOwnProperty('stepOptions')
          expect(TypeDetect(response.data.stepOptions)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data).to.haveOwnProperty('roles')
          expect(TypeDetect(response.data.roles)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data).to.haveOwnProperty('eventStampHistory')
          expect(TypeDetect(response.data.eventStampHistory)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data).to.haveOwnProperty('history')
          expect(TypeDetect(response.data.history)).to.equal(EnumsTypeDetect.ARRAY)

          // Check stepOptions values
          expect(response.data.stepOptions[0]).to.haveOwnProperty('_id')
          expect(TypeDetect(response.data.stepOptions[0]._id)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.stepOptions[0]._id).to.equal(mainEntry.data.processSteps[0].stepOptions[0]._id)

          expect(response.data.stepOptions[0]).to.haveOwnProperty('isNewEntry')
          expect(TypeDetect(response.data.stepOptions[0].isNewEntry)).to.equal(EnumsTypeDetect.BOOLEAN)
          expect(response.data.stepOptions[0].isNewEntry).to.equal(mainEntry.data.processSteps[0].stepOptions[0].isNewEntry)

          expect(response.data.stepOptions[0]).to.haveOwnProperty('isActive')
          expect(TypeDetect(response.data.stepOptions[0].isActive)).to.equal(EnumsTypeDetect.BOOLEAN)
          expect(response.data.stepOptions[0].isActive).to.equal(mainEntry.data.processSteps[0].stepOptions[0].isActive)

          expect(response.data.stepOptions[0]).to.haveOwnProperty('key')
          expect(TypeDetect(response.data.stepOptions[0].key)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.stepOptions[0].key).to.equal(mainEntry.data.processSteps[0].stepOptions[0].key)

          expect(response.data.stepOptions[0]).to.haveOwnProperty('name')
          expect(TypeDetect(response.data.stepOptions[0].name)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.stepOptions[0].name).to.equal(mainEntry.data.processSteps[0].stepOptions[0].name)

          expect(response.data.stepOptions[0]).to.haveOwnProperty('description')
          expect(TypeDetect(response.data.stepOptions[0].description)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.stepOptions[0].description).to.equal(mainEntry.data.processSteps[0].stepOptions[0].description)

          expect(response.data.stepOptions[0]).to.haveOwnProperty('eventStamp')
          expect(TypeDetect(response.data.stepOptions[0].eventStamp)).to.equal(EnumsTypeDetect.ARRAY)
          expect(TypeDetect(response.data.stepOptions[0].eventStamp[0])).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.stepOptions[0].eventStamp[0]).to.equal(mainEntry.data.processSteps[0].stepOptions[0].eventStamp[0].value)

          expect(response.data.stepOptions[0]).to.haveOwnProperty('nextStep')
          expect(TypeDetect(response.data.stepOptions[0].nextStep)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.stepOptions[0].nextStep).to.equal(mainEntry.data.processSteps[0].stepOptions[0].nextStep)

          expect(response.data.stepOptions[0]).to.haveOwnProperty('visibleObjects')
          expect(TypeDetect(response.data.stepOptions[0].visibleObjects)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data.stepOptions[0]).to.haveOwnProperty('notes')
          expect(TypeDetect(response.data.stepOptions[0].notes)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.stepOptions[0].notes).to.equal(mainEntry.data.processSteps[0].stepOptions[0].notes)

          expect(response.data.stepOptions[0]).to.haveOwnProperty('keywords')
          expect(TypeDetect(response.data.stepOptions[0].keywords)).to.equal(EnumsTypeDetect.ARRAY)

          // Check Roles Values
          expect(response.data.roles[0]).to.haveOwnProperty('name')
          expect(TypeDetect(response.data.roles[0].name)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.roles[0].name).to.equal(mainEntry.data.processSteps[0].responsibleRole)

          expect(response.data.roles[0]).to.haveOwnProperty('users')
          expect(TypeDetect(response.data.roles[0].users)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data.roles[0].users[0]).to.haveOwnProperty('email')
          expect(TypeDetect(response.data.roles[0].users[0].email)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.roles[0].users[0].email).to.equal('user')

          // Check Event Stamp History
          expect(response.data.eventStampHistory[0]).to.haveOwnProperty('eventName')
          expect(TypeDetect(response.data.eventStampHistory[0].eventName)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.eventStampHistory[0].eventName).to.equal(mainEntry.data.processSteps[0].eventStamp[0].value)

          expect(response.data.eventStampHistory[0]).to.haveOwnProperty('timeStamp')
          expect(TypeDetect(response.data.eventStampHistory[0].timeStamp)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.eventStampHistory[0].timeStamp).to.not.equal(Enums.STRING_EMPTY)

          // Check History
          expect(response.data.history[0]).to.haveOwnProperty('currentUser')
          expect(TypeDetect(response.data.history[0].currentUser)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.history[0].currentUser).to.equal('user')

          expect(response.data.history[0]).to.haveOwnProperty('currentRole')
          expect(TypeDetect(response.data.history[0].currentRole)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.history[0].currentRole).to.equal(mainEntry.data.processSteps[0].responsibleRole)

          expect(response.data.history[0]).to.haveOwnProperty('processStage')
          expect(TypeDetect(response.data.history[0].processStage)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.history[0].processStage).to.equal(mainEntry.data.processSteps[0].processStage)

          expect(response.data.history[0]).to.haveOwnProperty('submissionDate')
          expect(TypeDetect(response.data.history[0].submissionDate)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.history[0].submissionDate).to.not.equal(Enums.STRING_EMPTY)

          expect(response.data.history[0]).to.haveOwnProperty('optionSelected')
          expect(TypeDetect(response.data.history[0].optionSelected)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.history[0].optionSelected).to.equal('Create Document')

          expect(response.data.history[0]).to.haveOwnProperty('fromStep')
          expect(TypeDetect(response.data.history[0].fromStep)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.history[0].fromStep).to.equal('new')

          expect(response.data.history[0]).to.haveOwnProperty('fromStepName')
          expect(TypeDetect(response.data.history[0].fromStepName)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.history[0].fromStepName).to.equal('New')

          expect(response.data.history[0]).to.haveOwnProperty('toStep')
          expect(TypeDetect(response.data.history[0].toStep)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.history[0].toStep).to.equal(mainEntry.data.processSteps[0].key)

          expect(response.data.history[0]).to.haveOwnProperty('toStepName')
          expect(TypeDetect(response.data.history[0].toStepName)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.history[0].toStepName).to.equal(mainEntry.data.processSteps[0].name)

          expect(response.data.history[0]).to.haveOwnProperty('toProcessStage')
          expect(TypeDetect(response.data.history[0].toProcessStage)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.history[0].toProcessStage).to.equal(mainEntry.data.processSteps[0].processStage)

          expect(response.data.history[0]).to.haveOwnProperty('responsibleRole')
          expect(TypeDetect(response.data.history[0].responsibleRole)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.history[0].responsibleRole).to.equal(mainEntry.data.processSteps[0].responsibleRole)

          expect(response.data.history[0]).to.haveOwnProperty('comments')
          expect(TypeDetect(response.data.history[0].comments)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.history[0].comments).to.equal(Enums.STRING_EMPTY)

          expect(response.data.history[0]).to.haveOwnProperty('processKey')
          expect(TypeDetect(response.data.history[0].processKey)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.history[0].processKey).to.equal(response.data.processKey)

          expect(response.data.history[0]).to.haveOwnProperty('recordId')
          expect(TypeDetect(response.data.history[0].recordId)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.history[0].recordId).to.equal(response.data.recordId)

          expect(response.data.history[0]).to.haveOwnProperty('recordRef')
          expect(TypeDetect(response.data.history[0].recordRef)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.history[0].recordRef).to.equal(response.data.recordRef)

          expect(response.data.history[0]).to.haveOwnProperty('duration')
          expect(TypeDetect(response.data.history[0].duration)).to.equal(EnumsTypeDetect.NUMBER)
          expect(response.data.history[0].duration).to.equal(parseInt(mainEntry.data.processSteps[0].duration))

          expect(response.data.history[0]).to.haveOwnProperty('eventStamp')
          expect(TypeDetect(response.data.history[0].eventStamp)).to.equal(EnumsTypeDetect.ARRAY)
          expect(TypeDetect(response.data.history[0].eventStamp[0])).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.history[0].eventStamp[0]).to.equal(mainEntry.data.processSteps[0].eventStamp[0].value)

          expect(response.data.history[0]).to.haveOwnProperty('responsibleUsers')
          expect(TypeDetect(response.data.history[0].responsibleUsers)).to.equal(EnumsTypeDetect.ARRAY)
          expect(TypeDetect(response.data.history[0].responsibleUsers[0])).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.history[0].responsibleUsers[0]).to.equal('user')

          processKey = response.data.processKey
          bpmRecordId = response.data.recordId
        })
        .then(done, done)
    })

    it('Get Record State w ProcessKey', (done) => { // eslint-disable-line
      mainEntry = JSON.parse(JSON.stringify(DataTemplate.modified))
      mainEntry.data.key = key
      mainEntry.data.name = 'PUT_' + key
      mainEntry.data.numberingId = numberingId
      mainEntry.data.iln.name.en = 'PUT_' + key

      agilite.BPM.getRecordState([processKey])
        .then((response) => {
          expect(response).to.haveOwnProperty('data')
          expect(TypeDetect(response.data[0])).to.equal(EnumsTypeDetect.OBJECT)

          // Check values
          expect(response.data[0]).to.haveOwnProperty('_id')
          expect(TypeDetect(response.data[0]._id)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0]._id).to.equal(mainEntry.data.processSteps[0]._id)

          expect(response.data[0]).to.haveOwnProperty('key')
          expect(TypeDetect(response.data[0].key)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].key).to.equal(mainEntry.data.processSteps[0].key)

          expect(response.data[0]).to.haveOwnProperty('name')
          expect(TypeDetect(response.data[0].name)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].name).to.equal(mainEntry.data.processSteps[0].name)

          expect(response.data[0]).to.haveOwnProperty('description')
          expect(TypeDetect(response.data[0].description)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].description).to.equal(mainEntry.data.processSteps[0].description)

          expect(response.data[0]).to.haveOwnProperty('instructions')
          expect(TypeDetect(response.data[0].instructions)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].instructions).to.equal(mainEntry.data.processSteps[0].instructions)

          expect(response.data[0]).to.haveOwnProperty('duration')
          expect(TypeDetect(response.data[0].duration)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].duration).to.equal(mainEntry.data.processSteps[0].duration)

          expect(response.data[0]).to.haveOwnProperty('processStage')
          expect(TypeDetect(response.data[0].processStage)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].processStage).to.equal(mainEntry.data.processSteps[0].processStage)

          expect(response.data[0]).to.haveOwnProperty('responsibleRole')
          expect(TypeDetect(response.data[0].responsibleRole)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].responsibleRole).to.equal(mainEntry.data.processSteps[0].responsibleRole)

          expect(response.data[0]).to.haveOwnProperty('referenceUrl')
          expect(TypeDetect(response.data[0].referenceUrl)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].referenceUrl).to.equal(mainEntry.data.referenceUrl)

          expect(response.data[0]).to.haveOwnProperty('notificationTemplate')
          expect(TypeDetect(response.data[0].notificationTemplate)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].notificationTemplate).to.equal(mainEntry.data.processSteps[0].referenceUrl)

          expect(response.data[0]).to.haveOwnProperty('recordId')
          expect(TypeDetect(response.data[0].recordId)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].recordId).to.not.equal(Enums.STRING_EMPTY)

          expect(response.data[0]).to.haveOwnProperty('recordRef')
          expect(TypeDetect(response.data[0].recordRef)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].recordRef).to.not.equal(Enums.STRING_EMPTY)

          expect(response.data[0]).to.haveOwnProperty('processKey')
          expect(TypeDetect(response.data[0].processKey)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].processKey).to.not.equal(Enums.STRING_EMPTY)

          expect(response.data[0]).to.haveOwnProperty('responsibleUsers')
          expect(TypeDetect(response.data[0].responsibleUsers)).to.equal(EnumsTypeDetect.ARRAY)
          expect(response.data[0].responsibleUsers[0]).to.equal('user')

          expect(response.data[0]).to.haveOwnProperty('visibleObjects')
          expect(TypeDetect(response.data[0].visibleObjects)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data[0]).to.haveOwnProperty('stepOptions')
          expect(TypeDetect(response.data[0].stepOptions)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data[0]).to.haveOwnProperty('roles')
          expect(TypeDetect(response.data[0].roles)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data[0]).to.haveOwnProperty('eventStampHistory')
          expect(TypeDetect(response.data[0].eventStampHistory)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data[0]).to.haveOwnProperty('history')
          expect(TypeDetect(response.data[0].history)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data[0]).to.haveOwnProperty('keywords')
          expect(TypeDetect(response.data[0].keywords)).to.equal(EnumsTypeDetect.ARRAY)

          // Check stepOptions values
          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('_id')
          expect(TypeDetect(response.data[0].stepOptions[0]._id)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].stepOptions[0]._id).to.equal(mainEntry.data.processSteps[0].stepOptions[0]._id)

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('isNewEntry')
          expect(TypeDetect(response.data[0].stepOptions[0].isNewEntry)).to.equal(EnumsTypeDetect.BOOLEAN)
          expect(response.data[0].stepOptions[0].isNewEntry).to.equal(mainEntry.data.processSteps[0].stepOptions[0].isNewEntry)

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('isActive')
          expect(TypeDetect(response.data[0].stepOptions[0].isActive)).to.equal(EnumsTypeDetect.BOOLEAN)
          expect(response.data[0].stepOptions[0].isActive).to.equal(mainEntry.data.processSteps[0].stepOptions[0].isActive)

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('key')
          expect(TypeDetect(response.data[0].stepOptions[0].key)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].stepOptions[0].key).to.equal(mainEntry.data.processSteps[0].stepOptions[0].key)

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('name')
          expect(TypeDetect(response.data[0].stepOptions[0].name)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].stepOptions[0].name).to.equal(mainEntry.data.processSteps[0].stepOptions[0].name)

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('description')
          expect(TypeDetect(response.data[0].stepOptions[0].description)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].stepOptions[0].description).to.equal(mainEntry.data.processSteps[0].stepOptions[0].description)

          // expect(response.data[0].stepOptions[0]).to.haveOwnProperty('eventStamp')
          // expect(TypeDetect(response.data[0].stepOptions[0].eventStamp)).to.equal(EnumsTypeDetect.ARRAY)
          // expect(response.data[0].stepOptions[0].eventStamp[0]).to.equal(mainEntry.data.processSteps[0].stepOptions[0].eventStamp[0])

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('nextStep')
          expect(TypeDetect(response.data[0].stepOptions[0].nextStep)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].stepOptions[0].nextStep).to.equal(mainEntry.data.processSteps[0].stepOptions[0].nextStep)

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('visibleObjects')
          expect(TypeDetect(response.data[0].stepOptions[0].visibleObjects)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('notes')
          expect(TypeDetect(response.data[0].stepOptions[0].notes)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].stepOptions[0].notes).to.equal(mainEntry.data.processSteps[0].stepOptions[0].notes)

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('keywords')
          expect(TypeDetect(response.data[0].stepOptions[0].keywords)).to.equal(EnumsTypeDetect.ARRAY)

          // Check Roles Values
          expect(response.data[0].roles[0]).to.haveOwnProperty('name')
          expect(TypeDetect(response.data[0].roles[0].name)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].roles[0].name).to.equal(mainEntry.data.processSteps[0].responsibleRole)

          expect(response.data[0].roles[0]).to.haveOwnProperty('users')
          expect(TypeDetect(response.data[0].roles[0].users)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data[0].roles[0].users[0]).to.haveOwnProperty('email')
          expect(TypeDetect(response.data[0].roles[0].users[0].email)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].roles[0].users[0].email).to.equal('user')

          // Check Event Stamp History
          expect(response.data[0].eventStampHistory[0]).to.haveOwnProperty('eventName')
          expect(TypeDetect(response.data[0].eventStampHistory[0].eventName)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].eventStampHistory[0].eventName).to.equal(mainEntry.data.processSteps[0].eventStamp[0].value)

          expect(response.data[0].eventStampHistory[0]).to.haveOwnProperty('timeStamp')
          expect(TypeDetect(response.data[0].eventStampHistory[0].timeStamp)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].eventStampHistory[0].timeStamp).to.not.equal(Enums.STRING_EMPTY)

          // Check History
          expect(response.data[0].history[0]).to.haveOwnProperty('currentUser')
          expect(TypeDetect(response.data[0].history[0].currentUser)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].currentUser).to.equal('user')

          expect(response.data[0].history[0]).to.haveOwnProperty('currentRole')
          expect(TypeDetect(response.data[0].history[0].currentRole)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].currentRole).to.equal(mainEntry.data.processSteps[0].responsibleRole)

          expect(response.data[0].history[0]).to.haveOwnProperty('processStage')
          expect(TypeDetect(response.data[0].history[0].processStage)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].processStage).to.equal(mainEntry.data.processSteps[0].processStage)

          expect(response.data[0].history[0]).to.haveOwnProperty('submissionDate')
          expect(TypeDetect(response.data[0].history[0].submissionDate)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].submissionDate).to.not.equal(Enums.STRING_EMPTY)

          expect(response.data[0].history[0]).to.haveOwnProperty('optionSelected')
          expect(TypeDetect(response.data[0].history[0].optionSelected)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].optionSelected).to.equal('Create Document')

          expect(response.data[0].history[0]).to.haveOwnProperty('fromStep')
          expect(TypeDetect(response.data[0].history[0].fromStep)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].fromStep).to.equal('new')

          expect(response.data[0].history[0]).to.haveOwnProperty('fromStepName')
          expect(TypeDetect(response.data[0].history[0].fromStepName)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].fromStepName).to.equal('New')

          expect(response.data[0].history[0]).to.haveOwnProperty('toStep')
          expect(TypeDetect(response.data[0].history[0].toStep)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].toStep).to.equal(mainEntry.data.processSteps[0].key)

          expect(response.data[0].history[0]).to.haveOwnProperty('toStepName')
          expect(TypeDetect(response.data[0].history[0].toStepName)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].toStepName).to.equal(mainEntry.data.processSteps[0].name)

          expect(response.data[0].history[0]).to.haveOwnProperty('toProcessStage')
          expect(TypeDetect(response.data[0].history[0].toProcessStage)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].toProcessStage).to.equal(mainEntry.data.processSteps[0].processStage)

          expect(response.data[0].history[0]).to.haveOwnProperty('responsibleRole')
          expect(TypeDetect(response.data[0].history[0].responsibleRole)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].responsibleRole).to.equal(mainEntry.data.processSteps[0].responsibleRole)

          expect(response.data[0].history[0]).to.haveOwnProperty('comments')
          expect(TypeDetect(response.data[0].history[0].comments)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].comments).to.equal(Enums.STRING_EMPTY)

          expect(response.data[0].history[0]).to.haveOwnProperty('processKey')
          expect(TypeDetect(response.data[0].history[0].processKey)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].processKey).to.equal(response.data[0].processKey)

          expect(response.data[0].history[0]).to.haveOwnProperty('recordId')
          expect(TypeDetect(response.data[0].history[0].recordId)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].recordId).to.equal(response.data[0].recordId)

          expect(response.data[0].history[0]).to.haveOwnProperty('recordRef')
          expect(TypeDetect(response.data[0].history[0].recordRef)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].recordRef).to.equal(response.data[0].recordRef)

          expect(response.data[0].history[0]).to.haveOwnProperty('duration')
          expect(TypeDetect(response.data[0].history[0].duration)).to.equal(EnumsTypeDetect.NUMBER)
          expect(response.data[0].history[0].duration).to.equal(parseInt(mainEntry.data.processSteps[0].duration))

          expect(response.data[0].history[0]).to.haveOwnProperty('eventStamp')
          expect(TypeDetect(response.data[0].history[0].eventStamp)).to.equal(EnumsTypeDetect.ARRAY)
          expect(TypeDetect(response.data[0].history[0].eventStamp[0])).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].eventStamp[0]).to.equal(mainEntry.data.processSteps[0].eventStamp[0].value)

          expect(response.data[0].history[0]).to.haveOwnProperty('responsibleUsers')
          expect(TypeDetect(response.data[0].history[0].responsibleUsers)).to.equal(EnumsTypeDetect.ARRAY)
          expect(TypeDetect(response.data[0].history[0].responsibleUsers[0])).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].responsibleUsers[0]).to.equal('user')
        })
        .then(done, done)
    })

    it('Get Record State w Record Id', (done) => { // eslint-disable-line
      mainEntry = JSON.parse(JSON.stringify(DataTemplate.modified))
      mainEntry.data.key = key
      mainEntry.data.name = 'PUT_' + key
      mainEntry.data.numberingId = numberingId

      agilite.BPM.getRecordState(null, [bpmRecordId])
        .then((response) => {
          expect(response).to.haveOwnProperty('data')
          expect(TypeDetect(response.data[0])).to.equal(EnumsTypeDetect.OBJECT)

          // Check values
          expect(response.data[0]).to.haveOwnProperty('_id')
          expect(TypeDetect(response.data[0]._id)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0]._id).to.equal(mainEntry.data.processSteps[0]._id)

          expect(response.data[0]).to.haveOwnProperty('key')
          expect(TypeDetect(response.data[0].key)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].key).to.equal(mainEntry.data.processSteps[0].key)

          expect(response.data[0]).to.haveOwnProperty('name')
          expect(TypeDetect(response.data[0].name)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].name).to.equal(mainEntry.data.processSteps[0].name)

          expect(response.data[0]).to.haveOwnProperty('description')
          expect(TypeDetect(response.data[0].description)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].description).to.equal(mainEntry.data.processSteps[0].description)

          expect(response.data[0]).to.haveOwnProperty('instructions')
          expect(TypeDetect(response.data[0].instructions)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].instructions).to.equal(mainEntry.data.processSteps[0].instructions)

          expect(response.data[0]).to.haveOwnProperty('duration')
          expect(TypeDetect(response.data[0].duration)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].duration).to.equal(mainEntry.data.processSteps[0].duration)

          expect(response.data[0]).to.haveOwnProperty('processStage')
          expect(TypeDetect(response.data[0].processStage)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].processStage).to.equal(mainEntry.data.processSteps[0].processStage)

          expect(response.data[0]).to.haveOwnProperty('responsibleRole')
          expect(TypeDetect(response.data[0].responsibleRole)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].responsibleRole).to.equal(mainEntry.data.processSteps[0].responsibleRole)

          expect(response.data[0]).to.haveOwnProperty('referenceUrl')
          expect(TypeDetect(response.data[0].referenceUrl)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].referenceUrl).to.equal(mainEntry.data.referenceUrl)

          expect(response.data[0]).to.haveOwnProperty('notificationTemplate')
          expect(TypeDetect(response.data[0].notificationTemplate)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].notificationTemplate).to.equal(mainEntry.data.processSteps[0].referenceUrl)

          expect(response.data[0]).to.haveOwnProperty('recordId')
          expect(TypeDetect(response.data[0].recordId)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].recordId).to.not.equal(Enums.STRING_EMPTY)

          expect(response.data[0]).to.haveOwnProperty('recordRef')
          expect(TypeDetect(response.data[0].recordRef)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].recordRef).to.not.equal(Enums.STRING_EMPTY)

          expect(response.data[0]).to.haveOwnProperty('processKey')
          expect(TypeDetect(response.data[0].processKey)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].processKey).to.not.equal(Enums.STRING_EMPTY)

          expect(response.data[0]).to.haveOwnProperty('responsibleUsers')
          expect(TypeDetect(response.data[0].responsibleUsers)).to.equal(EnumsTypeDetect.ARRAY)
          expect(response.data[0].responsibleUsers[0]).to.equal('user')

          expect(response.data[0]).to.haveOwnProperty('visibleObjects')
          expect(TypeDetect(response.data[0].visibleObjects)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data[0]).to.haveOwnProperty('stepOptions')
          expect(TypeDetect(response.data[0].stepOptions)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data[0]).to.haveOwnProperty('roles')
          expect(TypeDetect(response.data[0].roles)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data[0]).to.haveOwnProperty('eventStampHistory')
          expect(TypeDetect(response.data[0].eventStampHistory)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data[0]).to.haveOwnProperty('history')
          expect(TypeDetect(response.data[0].history)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data[0]).to.haveOwnProperty('keywords')
          expect(TypeDetect(response.data[0].keywords)).to.equal(EnumsTypeDetect.ARRAY)

          // Check stepOptions values
          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('_id')
          expect(TypeDetect(response.data[0].stepOptions[0]._id)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].stepOptions[0]._id).to.equal(mainEntry.data.processSteps[0].stepOptions[0]._id)

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('isNewEntry')
          expect(TypeDetect(response.data[0].stepOptions[0].isNewEntry)).to.equal(EnumsTypeDetect.BOOLEAN)
          expect(response.data[0].stepOptions[0].isNewEntry).to.equal(mainEntry.data.processSteps[0].stepOptions[0].isNewEntry)

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('isActive')
          expect(TypeDetect(response.data[0].stepOptions[0].isActive)).to.equal(EnumsTypeDetect.BOOLEAN)
          expect(response.data[0].stepOptions[0].isActive).to.equal(mainEntry.data.processSteps[0].stepOptions[0].isActive)

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('key')
          expect(TypeDetect(response.data[0].stepOptions[0].key)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].stepOptions[0].key).to.equal(mainEntry.data.processSteps[0].stepOptions[0].key)

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('name')
          expect(TypeDetect(response.data[0].stepOptions[0].name)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].stepOptions[0].name).to.equal(mainEntry.data.processSteps[0].stepOptions[0].name)

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('description')
          expect(TypeDetect(response.data[0].stepOptions[0].description)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].stepOptions[0].description).to.equal(mainEntry.data.processSteps[0].stepOptions[0].description)

          // expect(response.data[0].stepOptions[0]).to.haveOwnProperty('eventStamp')
          // expect(TypeDetect(response.data[0].stepOptions[0].eventStamp)).to.equal(EnumsTypeDetect.ARRAY)
          // expect(response.data[0].stepOptions[0].eventStamp[0]).to.equal(mainEntry.data.processSteps[0].stepOptions[0].eventStamp[0])

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('nextStep')
          expect(TypeDetect(response.data[0].stepOptions[0].nextStep)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].stepOptions[0].nextStep).to.equal(mainEntry.data.processSteps[0].stepOptions[0].nextStep)

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('visibleObjects')
          expect(TypeDetect(response.data[0].stepOptions[0].visibleObjects)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('notes')
          expect(TypeDetect(response.data[0].stepOptions[0].notes)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].stepOptions[0].notes).to.equal(mainEntry.data.processSteps[0].stepOptions[0].notes)

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('keywords')
          expect(TypeDetect(response.data[0].stepOptions[0].keywords)).to.equal(EnumsTypeDetect.ARRAY)

          // Check Roles Values
          expect(response.data[0].roles[0]).to.haveOwnProperty('name')
          expect(TypeDetect(response.data[0].roles[0].name)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].roles[0].name).to.equal(mainEntry.data.processSteps[0].responsibleRole)

          expect(response.data[0].roles[0]).to.haveOwnProperty('users')
          expect(TypeDetect(response.data[0].roles[0].users)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data[0].roles[0].users[0]).to.haveOwnProperty('email')
          expect(TypeDetect(response.data[0].roles[0].users[0].email)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].roles[0].users[0].email).to.equal('user')

          // Check Event Stamp History
          expect(response.data[0].eventStampHistory[0]).to.haveOwnProperty('eventName')
          expect(TypeDetect(response.data[0].eventStampHistory[0].eventName)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].eventStampHistory[0].eventName).to.equal(mainEntry.data.processSteps[0].eventStamp[0].value)

          expect(response.data[0].eventStampHistory[0]).to.haveOwnProperty('timeStamp')
          expect(TypeDetect(response.data[0].eventStampHistory[0].timeStamp)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].eventStampHistory[0].timeStamp).to.not.equal(Enums.STRING_EMPTY)

          // Check History
          expect(response.data[0].history[0]).to.haveOwnProperty('currentUser')
          expect(TypeDetect(response.data[0].history[0].currentUser)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].currentUser).to.equal('user')

          expect(response.data[0].history[0]).to.haveOwnProperty('currentRole')
          expect(TypeDetect(response.data[0].history[0].currentRole)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].currentRole).to.equal(mainEntry.data.processSteps[0].responsibleRole)

          expect(response.data[0].history[0]).to.haveOwnProperty('processStage')
          expect(TypeDetect(response.data[0].history[0].processStage)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].processStage).to.equal(mainEntry.data.processSteps[0].processStage)

          expect(response.data[0].history[0]).to.haveOwnProperty('submissionDate')
          expect(TypeDetect(response.data[0].history[0].submissionDate)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].submissionDate).to.not.equal(Enums.STRING_EMPTY)

          expect(response.data[0].history[0]).to.haveOwnProperty('optionSelected')
          expect(TypeDetect(response.data[0].history[0].optionSelected)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].optionSelected).to.equal('Create Document')

          expect(response.data[0].history[0]).to.haveOwnProperty('fromStep')
          expect(TypeDetect(response.data[0].history[0].fromStep)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].fromStep).to.equal('new')

          expect(response.data[0].history[0]).to.haveOwnProperty('fromStepName')
          expect(TypeDetect(response.data[0].history[0].fromStepName)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].fromStepName).to.equal('New')

          expect(response.data[0].history[0]).to.haveOwnProperty('toStep')
          expect(TypeDetect(response.data[0].history[0].toStep)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].toStep).to.equal(mainEntry.data.processSteps[0].key)

          expect(response.data[0].history[0]).to.haveOwnProperty('toStepName')
          expect(TypeDetect(response.data[0].history[0].toStepName)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].toStepName).to.equal(mainEntry.data.processSteps[0].name)

          expect(response.data[0].history[0]).to.haveOwnProperty('toProcessStage')
          expect(TypeDetect(response.data[0].history[0].toProcessStage)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].toProcessStage).to.equal(mainEntry.data.processSteps[0].processStage)

          expect(response.data[0].history[0]).to.haveOwnProperty('responsibleRole')
          expect(TypeDetect(response.data[0].history[0].responsibleRole)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].responsibleRole).to.equal(mainEntry.data.processSteps[0].responsibleRole)

          expect(response.data[0].history[0]).to.haveOwnProperty('comments')
          expect(TypeDetect(response.data[0].history[0].comments)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].comments).to.equal(Enums.STRING_EMPTY)

          expect(response.data[0].history[0]).to.haveOwnProperty('processKey')
          expect(TypeDetect(response.data[0].history[0].processKey)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].processKey).to.equal(response.data[0].processKey)

          expect(response.data[0].history[0]).to.haveOwnProperty('recordId')
          expect(TypeDetect(response.data[0].history[0].recordId)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].recordId).to.equal(response.data[0].recordId)

          expect(response.data[0].history[0]).to.haveOwnProperty('recordRef')
          expect(TypeDetect(response.data[0].history[0].recordRef)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].recordRef).to.equal(response.data[0].recordRef)

          expect(response.data[0].history[0]).to.haveOwnProperty('duration')
          expect(TypeDetect(response.data[0].history[0].duration)).to.equal(EnumsTypeDetect.NUMBER)
          expect(response.data[0].history[0].duration).to.equal(parseInt(mainEntry.data.processSteps[0].duration))

          expect(response.data[0].history[0]).to.haveOwnProperty('eventStamp')
          expect(TypeDetect(response.data[0].history[0].eventStamp)).to.equal(EnumsTypeDetect.ARRAY)
          expect(TypeDetect(response.data[0].history[0].eventStamp[0])).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].eventStamp[0]).to.equal(mainEntry.data.processSteps[0].eventStamp[0].value)

          expect(response.data[0].history[0]).to.haveOwnProperty('responsibleUsers')
          expect(TypeDetect(response.data[0].history[0].responsibleUsers)).to.equal(EnumsTypeDetect.ARRAY)
          expect(TypeDetect(response.data[0].history[0].responsibleUsers[0])).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].responsibleUsers[0]).to.equal('user')
        })
        .then(done, done)
    })

    it('Execute BPM Record', (done) => { // eslint-disable-line
      mainEntry = JSON.parse(JSON.stringify(DataTemplate.modified))
      mainEntry.data.key = key
      mainEntry.data.name = 'PUT_' + key
      mainEntry.data.numberingId = numberingId
      mainEntry.data.iln.name.en = 'PUT_' + key

      agilite.BPM.execute(processKey, bpmRecordId, 'submit', 'user')
        .then((response) => {
          expect(response).to.haveOwnProperty('data')
          expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)

          // Check values
          expect(response.data).to.haveOwnProperty('_id')
          expect(TypeDetect(response.data._id)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data._id).to.equal(Enums.STRING_EMPTY)

          expect(response.data).to.haveOwnProperty('isNewEntry')
          expect(TypeDetect(response.data.isNewEntry)).to.equal(EnumsTypeDetect.BOOLEAN)
          expect(response.data.isNewEntry).to.equal(true)

          expect(response.data).to.haveOwnProperty('isActive')
          expect(TypeDetect(response.data.isActive)).to.equal(EnumsTypeDetect.BOOLEAN)
          expect(response.data.isActive).to.equal(true)

          expect(response.data).to.haveOwnProperty('isNewEntry')
          expect(TypeDetect(response.data.isNewEntry)).to.equal(EnumsTypeDetect.BOOLEAN)
          expect(response.data.isNewEntry).to.equal(true)

          expect(response.data).to.haveOwnProperty('key')
          expect(TypeDetect(response.data.key)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.key).to.equal(Enums.STRING_EMPTY)

          expect(response.data).to.haveOwnProperty('name')
          expect(TypeDetect(response.data.name)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.name).to.equal(Enums.STRING_EMPTY)

          expect(response.data).to.haveOwnProperty('description')
          expect(TypeDetect(response.data.description)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.description).to.equal(Enums.STRING_EMPTY)

          expect(response.data).to.haveOwnProperty('instructions')
          expect(TypeDetect(response.data.instructions)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.instructions).to.equal(Enums.STRING_EMPTY)

          expect(response.data).to.haveOwnProperty('duration')
          expect(TypeDetect(response.data.duration)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.duration).to.equal(Enums.STRING_EMPTY)

          expect(response.data).to.haveOwnProperty('processStage')
          expect(TypeDetect(response.data.processStage)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.processStage).to.equal(Enums.STRING_EMPTY)

          expect(response.data).to.haveOwnProperty('responsibility')
          expect(TypeDetect(response.data.responsibility)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.responsibility).to.equal(Enums.STRING_EMPTY)

          expect(response.data).to.haveOwnProperty('responsibleRole')
          expect(TypeDetect(response.data.responsibleRole)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.responsibleRole).to.equal(Enums.STRING_EMPTY)

          expect(response.data).to.haveOwnProperty('notes')
          expect(TypeDetect(response.data.notes)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.notes).to.equal(Enums.STRING_EMPTY)

          expect(response.data).to.haveOwnProperty('referenceUrl')
          expect(TypeDetect(response.data.referenceUrl)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.referenceUrl).to.equal(mainEntry.data.referenceUrl)

          expect(response.data).to.haveOwnProperty('notificationTemplate')
          expect(TypeDetect(response.data.notificationTemplate)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.notificationTemplate).to.equal(mainEntry.data.processSteps[0].referenceUrl)

          expect(response.data).to.haveOwnProperty('submittedIntoStep')
          expect(TypeDetect(response.data.submittedIntoStep)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.submittedIntoStep).to.not.equal(Enums.STRING_EMPTY)

          expect(response.data).to.haveOwnProperty('targetTimeDuration')
          expect(TypeDetect(response.data.targetTimeDuration)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.targetTimeDuration).to.not.equal(Enums.STRING_EMPTY)

          expect(response.data).to.haveOwnProperty('processKey')
          expect(TypeDetect(response.data.processKey)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data.processKey).to.not.equal(Enums.STRING_EMPTY)

          expect(response.data).to.haveOwnProperty('responsibleUsers')
          expect(TypeDetect(response.data.responsibleUsers)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data).to.haveOwnProperty('visibleObjects')
          expect(TypeDetect(response.data.visibleObjects)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data).to.haveOwnProperty('stepOptions')
          expect(TypeDetect(response.data.stepOptions)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data).to.haveOwnProperty('roleLevels')
          expect(TypeDetect(response.data.roleLevels)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data).to.haveOwnProperty('eventStamp')
          expect(TypeDetect(response.data.eventStamp)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data).to.haveOwnProperty('keywords')
          expect(TypeDetect(response.data.keywords)).to.equal(EnumsTypeDetect.ARRAY)
        })
        .then(done, done)
    })

    it('Get Record State w ProcessKey', (done) => { // eslint-disable-line
      mainEntry = JSON.parse(JSON.stringify(DataTemplate.modified))
      mainEntry.data.key = key
      mainEntry.data.name = 'PUT_' + key
      mainEntry.data.numberingId = numberingId
      mainEntry.data.iln.name.en = 'PUT_' + key

      agilite.BPM.getRecordState([processKey])
        .then((response) => {
          expect(response).to.haveOwnProperty('data')
          expect(TypeDetect(response.data[0])).to.equal(EnumsTypeDetect.OBJECT)

          // Check values
          expect(response.data[0]).to.haveOwnProperty('_id')
          expect(TypeDetect(response.data[0]._id)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0]._id).to.equal(mainEntry.data.processSteps[0]._id)

          expect(response.data[0]).to.haveOwnProperty('key')
          expect(TypeDetect(response.data[0].key)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].key).to.equal(mainEntry.data.processSteps[0].key)

          expect(response.data[0]).to.haveOwnProperty('name')
          expect(TypeDetect(response.data[0].name)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].name).to.equal(mainEntry.data.processSteps[0].name)

          expect(response.data[0]).to.haveOwnProperty('description')
          expect(TypeDetect(response.data[0].description)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].description).to.equal(mainEntry.data.processSteps[0].description)

          expect(response.data[0]).to.haveOwnProperty('instructions')
          expect(TypeDetect(response.data[0].instructions)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].instructions).to.equal(mainEntry.data.processSteps[0].instructions)

          expect(response.data[0]).to.haveOwnProperty('duration')
          expect(TypeDetect(response.data[0].duration)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].duration).to.equal(mainEntry.data.processSteps[0].duration)

          expect(response.data[0]).to.haveOwnProperty('processStage')
          expect(TypeDetect(response.data[0].processStage)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].processStage).to.equal(mainEntry.data.processSteps[0].processStage)

          expect(response.data[0]).to.haveOwnProperty('responsibleRole')
          expect(TypeDetect(response.data[0].responsibleRole)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].responsibleRole).to.equal(mainEntry.data.processSteps[0].responsibleRole)

          expect(response.data[0]).to.haveOwnProperty('referenceUrl')
          expect(TypeDetect(response.data[0].referenceUrl)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].referenceUrl).to.equal(mainEntry.data.referenceUrl)

          expect(response.data[0]).to.haveOwnProperty('notificationTemplate')
          expect(TypeDetect(response.data[0].notificationTemplate)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].notificationTemplate).to.equal(mainEntry.data.processSteps[0].referenceUrl)

          expect(response.data[0]).to.haveOwnProperty('recordId')
          expect(TypeDetect(response.data[0].recordId)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].recordId).to.not.equal(Enums.STRING_EMPTY)

          expect(response.data[0]).to.haveOwnProperty('recordRef')
          expect(TypeDetect(response.data[0].recordRef)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].recordRef).to.not.equal(Enums.STRING_EMPTY)

          expect(response.data[0]).to.haveOwnProperty('processKey')
          expect(TypeDetect(response.data[0].processKey)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].processKey).to.not.equal(Enums.STRING_EMPTY)

          expect(response.data[0]).to.haveOwnProperty('responsibleUsers')
          expect(TypeDetect(response.data[0].responsibleUsers)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data[0]).to.haveOwnProperty('visibleObjects')
          expect(TypeDetect(response.data[0].visibleObjects)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data[0]).to.haveOwnProperty('stepOptions')
          expect(TypeDetect(response.data[0].stepOptions)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data[0]).to.haveOwnProperty('roles')
          expect(TypeDetect(response.data[0].roles)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data[0]).to.haveOwnProperty('eventStampHistory')
          expect(TypeDetect(response.data[0].eventStampHistory)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data[0]).to.haveOwnProperty('history')
          expect(TypeDetect(response.data[0].history)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data[0]).to.haveOwnProperty('keywords')
          expect(TypeDetect(response.data[0].keywords)).to.equal(EnumsTypeDetect.ARRAY)

          // Check stepOptions values
          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('_id')
          expect(TypeDetect(response.data[0].stepOptions[0]._id)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].stepOptions[0]._id).to.equal(mainEntry.data.processSteps[0].stepOptions[0]._id)

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('isNewEntry')
          expect(TypeDetect(response.data[0].stepOptions[0].isNewEntry)).to.equal(EnumsTypeDetect.BOOLEAN)
          expect(response.data[0].stepOptions[0].isNewEntry).to.equal(mainEntry.data.processSteps[0].stepOptions[0].isNewEntry)

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('isActive')
          expect(TypeDetect(response.data[0].stepOptions[0].isActive)).to.equal(EnumsTypeDetect.BOOLEAN)
          expect(response.data[0].stepOptions[0].isActive).to.equal(mainEntry.data.processSteps[0].stepOptions[0].isActive)

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('key')
          expect(TypeDetect(response.data[0].stepOptions[0].key)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].stepOptions[0].key).to.equal(mainEntry.data.processSteps[0].stepOptions[0].key)

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('name')
          expect(TypeDetect(response.data[0].stepOptions[0].name)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].stepOptions[0].name).to.equal(mainEntry.data.processSteps[0].stepOptions[0].name)

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('description')
          expect(TypeDetect(response.data[0].stepOptions[0].description)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].stepOptions[0].description).to.equal(mainEntry.data.processSteps[0].stepOptions[0].description)

          // expect(response.data[0].stepOptions[0]).to.haveOwnProperty('eventStamp')
          // expect(TypeDetect(response.data[0].stepOptions[0].eventStamp)).to.equal(EnumsTypeDetect.ARRAY)
          // expect(response.data[0].stepOptions[0].eventStamp[0]).to.equal(mainEntry.data.processSteps[0].stepOptions[0].eventStamp[0])

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('nextStep')
          expect(TypeDetect(response.data[0].stepOptions[0].nextStep)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].stepOptions[0].nextStep).to.equal(mainEntry.data.processSteps[0].stepOptions[0].nextStep)

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('visibleObjects')
          expect(TypeDetect(response.data[0].stepOptions[0].visibleObjects)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('notes')
          expect(TypeDetect(response.data[0].stepOptions[0].notes)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].stepOptions[0].notes).to.equal(mainEntry.data.processSteps[0].stepOptions[0].notes)

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('keywords')
          expect(TypeDetect(response.data[0].stepOptions[0].keywords)).to.equal(EnumsTypeDetect.ARRAY)

          // Check Roles Values
          expect(response.data[0].roles[0]).to.haveOwnProperty('name')
          expect(TypeDetect(response.data[0].roles[0].name)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].roles[0].name).to.equal(mainEntry.data.processSteps[0].responsibleRole)

          expect(response.data[0].roles[0]).to.haveOwnProperty('users')
          expect(TypeDetect(response.data[0].roles[0].users)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data[0].roles[0].users[0]).to.haveOwnProperty('email')
          expect(TypeDetect(response.data[0].roles[0].users[0].email)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].roles[0].users[0].email).to.equal('user')

          expect(response.data[0].roles[1]).to.haveOwnProperty('name')
          expect(TypeDetect(response.data[0].roles[1].name)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].roles[1].name).to.equal(Enums.STRING_EMPTY)

          expect(response.data[0].roles[1]).to.haveOwnProperty('users')
          expect(TypeDetect(response.data[0].roles[1].users)).to.equal(EnumsTypeDetect.ARRAY)

          // Check Event Stamp History
          expect(response.data[0].eventStampHistory[0]).to.haveOwnProperty('eventName')
          expect(TypeDetect(response.data[0].eventStampHistory[0].eventName)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].eventStampHistory[0].eventName).to.equal(mainEntry.data.processSteps[0].eventStamp[0].value)

          expect(response.data[0].eventStampHistory[0]).to.haveOwnProperty('timeStamp')
          expect(TypeDetect(response.data[0].eventStampHistory[0].timeStamp)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].eventStampHistory[0].timeStamp).to.not.equal(Enums.STRING_EMPTY)

          expect(response.data[0].eventStampHistory[1]).to.haveOwnProperty('eventName')
          expect(TypeDetect(response.data[0].eventStampHistory[1].eventName)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].eventStampHistory[1].eventName).to.equal('DateSubmitted')

          expect(response.data[0].eventStampHistory[1]).to.haveOwnProperty('timeStamp')
          expect(TypeDetect(response.data[0].eventStampHistory[1].timeStamp)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].eventStampHistory[1].timeStamp).to.not.equal(Enums.STRING_EMPTY)

          // Check History
          expect(response.data[0].history[0]).to.haveOwnProperty('currentUser')
          expect(TypeDetect(response.data[0].history[0].currentUser)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].currentUser).to.equal('user')

          expect(response.data[0].history[0]).to.haveOwnProperty('currentRole')
          expect(TypeDetect(response.data[0].history[0].currentRole)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].currentRole).to.equal(mainEntry.data.processSteps[0].responsibleRole)

          expect(response.data[0].history[0]).to.haveOwnProperty('processStage')
          expect(TypeDetect(response.data[0].history[0].processStage)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].processStage).to.equal(mainEntry.data.processSteps[0].processStage)

          expect(response.data[0].history[0]).to.haveOwnProperty('submissionDate')
          expect(TypeDetect(response.data[0].history[0].submissionDate)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].submissionDate).to.not.equal(Enums.STRING_EMPTY)

          expect(response.data[0].history[0]).to.haveOwnProperty('optionSelected')
          expect(TypeDetect(response.data[0].history[0].optionSelected)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].optionSelected).to.equal('Create Document')

          expect(response.data[0].history[0]).to.haveOwnProperty('fromStep')
          expect(TypeDetect(response.data[0].history[0].fromStep)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].fromStep).to.equal('new')

          expect(response.data[0].history[0]).to.haveOwnProperty('fromStepName')
          expect(TypeDetect(response.data[0].history[0].fromStepName)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].fromStepName).to.equal('New')

          expect(response.data[0].history[0]).to.haveOwnProperty('toStep')
          expect(TypeDetect(response.data[0].history[0].toStep)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].toStep).to.equal(mainEntry.data.processSteps[0].key)

          expect(response.data[0].history[0]).to.haveOwnProperty('toStepName')
          expect(TypeDetect(response.data[0].history[0].toStepName)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].toStepName).to.equal(mainEntry.data.processSteps[0].name)

          expect(response.data[0].history[0]).to.haveOwnProperty('toProcessStage')
          expect(TypeDetect(response.data[0].history[0].toProcessStage)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].toProcessStage).to.equal(mainEntry.data.processSteps[0].processStage)

          expect(response.data[0].history[0]).to.haveOwnProperty('responsibleRole')
          expect(TypeDetect(response.data[0].history[0].responsibleRole)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].responsibleRole).to.equal(mainEntry.data.processSteps[0].responsibleRole)

          expect(response.data[0].history[0]).to.haveOwnProperty('comments')
          expect(TypeDetect(response.data[0].history[0].comments)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].comments).to.equal(Enums.STRING_EMPTY)

          expect(response.data[0].history[0]).to.haveOwnProperty('processKey')
          expect(TypeDetect(response.data[0].history[0].processKey)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].processKey).to.equal(response.data[0].processKey)

          expect(response.data[0].history[0]).to.haveOwnProperty('recordId')
          expect(TypeDetect(response.data[0].history[0].recordId)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].recordId).to.equal(response.data[0].recordId)

          expect(response.data[0].history[0]).to.haveOwnProperty('recordRef')
          expect(TypeDetect(response.data[0].history[0].recordRef)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].recordRef).to.equal(response.data[0].recordRef)

          expect(response.data[0].history[0]).to.haveOwnProperty('duration')
          expect(TypeDetect(response.data[0].history[0].duration)).to.equal(EnumsTypeDetect.NUMBER)
          expect(response.data[0].history[0].duration).to.equal(parseInt(mainEntry.data.processSteps[0].duration))

          expect(response.data[0].history[0]).to.haveOwnProperty('eventStamp')
          expect(TypeDetect(response.data[0].history[0].eventStamp)).to.equal(EnumsTypeDetect.ARRAY)
          expect(TypeDetect(response.data[0].history[0].eventStamp[0])).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].eventStamp[0]).to.equal(mainEntry.data.processSteps[0].eventStamp[0].value)

          expect(response.data[0].history[0]).to.haveOwnProperty('responsibleUsers')
          expect(TypeDetect(response.data[0].history[0].responsibleUsers)).to.equal(EnumsTypeDetect.ARRAY)
          expect(TypeDetect(response.data[0].history[0].responsibleUsers[0])).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].responsibleUsers[0]).to.equal('user')

          expect(response.data[0].history[1]).to.haveOwnProperty('currentUser')
          expect(TypeDetect(response.data[0].history[1].currentUser)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[1].currentUser).to.equal('user')

          expect(response.data[0].history[1]).to.haveOwnProperty('currentRole')
          expect(TypeDetect(response.data[0].history[1].currentRole)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[1].currentRole).to.equal(mainEntry.data.processSteps[0].responsibleRole)

          expect(response.data[0].history[1]).to.haveOwnProperty('processStage')
          expect(TypeDetect(response.data[0].history[1].processStage)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[1].processStage).to.equal(mainEntry.data.processSteps[0].processStage)

          expect(response.data[0].history[1]).to.haveOwnProperty('submissionDate')
          expect(TypeDetect(response.data[0].history[1].submissionDate)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[1].submissionDate).to.not.equal(Enums.STRING_EMPTY)

          expect(response.data[0].history[1]).to.haveOwnProperty('optionSelected')
          expect(TypeDetect(response.data[0].history[1].optionSelected)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[1].optionSelected).to.equal(mainEntry.data.processSteps[0].stepOptions[0].key)

          expect(response.data[0].history[1]).to.haveOwnProperty('fromStep')
          expect(TypeDetect(response.data[0].history[1].fromStep)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[1].fromStep).to.equal(mainEntry.data.processSteps[0].key)

          expect(response.data[0].history[1]).to.haveOwnProperty('fromStepName')
          expect(TypeDetect(response.data[0].history[1].fromStepName)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[1].fromStepName).to.equal(mainEntry.data.processSteps[0].name)

          expect(response.data[0].history[1]).to.haveOwnProperty('toStep')
          expect(TypeDetect(response.data[0].history[1].toStep)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[1].toStep).to.equal(Enums.STRING_EMPTY)

          expect(response.data[0].history[1]).to.haveOwnProperty('toStepName')
          expect(TypeDetect(response.data[0].history[1].toStepName)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[1].toStepName).to.equal(Enums.STRING_EMPTY)

          expect(response.data[0].history[1]).to.haveOwnProperty('toProcessStage')
          expect(TypeDetect(response.data[0].history[1].toProcessStage)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[1].toProcessStage).to.equal(Enums.STRING_EMPTY)

          expect(response.data[0].history[1]).to.haveOwnProperty('responsibleRole')
          expect(TypeDetect(response.data[0].history[1].responsibleRole)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[1].responsibleRole).to.equal(Enums.STRING_EMPTY)

          expect(response.data[0].history[1]).to.haveOwnProperty('comments')
          expect(TypeDetect(response.data[0].history[1].comments)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[1].comments).to.equal(Enums.STRING_EMPTY)

          expect(response.data[0].history[1]).to.haveOwnProperty('processKey')
          expect(TypeDetect(response.data[0].history[1].processKey)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[1].processKey).to.equal(response.data[0].processKey)

          expect(response.data[0].history[1]).to.haveOwnProperty('recordId')
          expect(TypeDetect(response.data[0].history[1].recordId)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[1].recordId).to.equal(response.data[0].recordId)

          expect(response.data[0].history[1]).to.haveOwnProperty('recordRef')
          expect(TypeDetect(response.data[0].history[1].recordRef)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[1].recordRef).to.equal(response.data[0].recordRef)

          expect(response.data[0].history[1]).to.haveOwnProperty('duration')
          expect(TypeDetect(response.data[0].history[1].duration)).to.equal(EnumsTypeDetect.NUMBER)
          expect(response.data[0].history[1].duration).to.equal(parseInt(mainEntry.data.processSteps[0].duration))

          expect(response.data[0].history[1]).to.haveOwnProperty('eventStamp')
          expect(TypeDetect(response.data[0].history[1].eventStamp)).to.equal(EnumsTypeDetect.ARRAY)
          expect(TypeDetect(response.data[0].history[1].eventStamp[0])).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[1].eventStamp[0]).to.equal('DateSubmitted')

          expect(response.data[0].history[1]).to.haveOwnProperty('responsibleUsers')
          expect(TypeDetect(response.data[0].history[1].responsibleUsers)).to.equal(EnumsTypeDetect.ARRAY)
        })
        .then(done, done)
    })

    it('Get Record State w Record Id', (done) => { // eslint-disable-line
      mainEntry = JSON.parse(JSON.stringify(DataTemplate.modified))
      mainEntry.data.key = key
      mainEntry.data.name = 'PUT_' + key
      mainEntry.data.numberingId = numberingId
      mainEntry.data.iln.name.en = 'PUT_' + key

      agilite.BPM.getRecordState(null, [bpmRecordId])
        .then((response) => {
          expect(response).to.haveOwnProperty('data')
          expect(TypeDetect(response.data[0])).to.equal(EnumsTypeDetect.OBJECT)

          // Check values
          expect(response.data[0]).to.haveOwnProperty('_id')
          expect(TypeDetect(response.data[0]._id)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0]._id).to.equal(mainEntry.data.processSteps[0]._id)

          expect(response.data[0]).to.haveOwnProperty('key')
          expect(TypeDetect(response.data[0].key)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].key).to.equal(mainEntry.data.processSteps[0].key)

          expect(response.data[0]).to.haveOwnProperty('name')
          expect(TypeDetect(response.data[0].name)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].name).to.equal(mainEntry.data.processSteps[0].name)

          expect(response.data[0]).to.haveOwnProperty('description')
          expect(TypeDetect(response.data[0].description)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].description).to.equal(mainEntry.data.processSteps[0].description)

          expect(response.data[0]).to.haveOwnProperty('instructions')
          expect(TypeDetect(response.data[0].instructions)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].instructions).to.equal(mainEntry.data.processSteps[0].instructions)

          expect(response.data[0]).to.haveOwnProperty('duration')
          expect(TypeDetect(response.data[0].duration)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].duration).to.equal(mainEntry.data.processSteps[0].duration)

          expect(response.data[0]).to.haveOwnProperty('processStage')
          expect(TypeDetect(response.data[0].processStage)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].processStage).to.equal(mainEntry.data.processSteps[0].processStage)

          expect(response.data[0]).to.haveOwnProperty('responsibleRole')
          expect(TypeDetect(response.data[0].responsibleRole)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].responsibleRole).to.equal(mainEntry.data.processSteps[0].responsibleRole)

          expect(response.data[0]).to.haveOwnProperty('referenceUrl')
          expect(TypeDetect(response.data[0].referenceUrl)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].referenceUrl).to.equal(mainEntry.data.referenceUrl)

          expect(response.data[0]).to.haveOwnProperty('notificationTemplate')
          expect(TypeDetect(response.data[0].notificationTemplate)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].notificationTemplate).to.equal(mainEntry.data.processSteps[0].referenceUrl)

          expect(response.data[0]).to.haveOwnProperty('recordId')
          expect(TypeDetect(response.data[0].recordId)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].recordId).to.not.equal(Enums.STRING_EMPTY)

          expect(response.data[0]).to.haveOwnProperty('recordRef')
          expect(TypeDetect(response.data[0].recordRef)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].recordRef).to.not.equal(Enums.STRING_EMPTY)

          expect(response.data[0]).to.haveOwnProperty('processKey')
          expect(TypeDetect(response.data[0].processKey)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].processKey).to.not.equal(Enums.STRING_EMPTY)

          expect(response.data[0]).to.haveOwnProperty('responsibleUsers')
          expect(TypeDetect(response.data[0].responsibleUsers)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data[0]).to.haveOwnProperty('visibleObjects')
          expect(TypeDetect(response.data[0].visibleObjects)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data[0]).to.haveOwnProperty('stepOptions')
          expect(TypeDetect(response.data[0].stepOptions)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data[0]).to.haveOwnProperty('roles')
          expect(TypeDetect(response.data[0].roles)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data[0]).to.haveOwnProperty('eventStampHistory')
          expect(TypeDetect(response.data[0].eventStampHistory)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data[0]).to.haveOwnProperty('history')
          expect(TypeDetect(response.data[0].history)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data[0]).to.haveOwnProperty('keywords')
          expect(TypeDetect(response.data[0].keywords)).to.equal(EnumsTypeDetect.ARRAY)

          // Check stepOptions values
          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('_id')
          expect(TypeDetect(response.data[0].stepOptions[0]._id)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].stepOptions[0]._id).to.equal(mainEntry.data.processSteps[0].stepOptions[0]._id)

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('isNewEntry')
          expect(TypeDetect(response.data[0].stepOptions[0].isNewEntry)).to.equal(EnumsTypeDetect.BOOLEAN)
          expect(response.data[0].stepOptions[0].isNewEntry).to.equal(mainEntry.data.processSteps[0].stepOptions[0].isNewEntry)

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('isActive')
          expect(TypeDetect(response.data[0].stepOptions[0].isActive)).to.equal(EnumsTypeDetect.BOOLEAN)
          expect(response.data[0].stepOptions[0].isActive).to.equal(mainEntry.data.processSteps[0].stepOptions[0].isActive)

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('key')
          expect(TypeDetect(response.data[0].stepOptions[0].key)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].stepOptions[0].key).to.equal(mainEntry.data.processSteps[0].stepOptions[0].key)

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('name')
          expect(TypeDetect(response.data[0].stepOptions[0].name)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].stepOptions[0].name).to.equal(mainEntry.data.processSteps[0].stepOptions[0].name)

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('description')
          expect(TypeDetect(response.data[0].stepOptions[0].description)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].stepOptions[0].description).to.equal(mainEntry.data.processSteps[0].stepOptions[0].description)

          // expect(response.data[0].stepOptions[0]).to.haveOwnProperty('eventStamp')
          // expect(TypeDetect(response.data[0].stepOptions[0].eventStamp)).to.equal(EnumsTypeDetect.ARRAY)
          // expect(response.data[0].stepOptions[0].eventStamp[0]).to.equal(mainEntry.data.processSteps[0].stepOptions[0].eventStamp[0])

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('nextStep')
          expect(TypeDetect(response.data[0].stepOptions[0].nextStep)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].stepOptions[0].nextStep).to.equal(mainEntry.data.processSteps[0].stepOptions[0].nextStep)

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('visibleObjects')
          expect(TypeDetect(response.data[0].stepOptions[0].visibleObjects)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('notes')
          expect(TypeDetect(response.data[0].stepOptions[0].notes)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].stepOptions[0].notes).to.equal(mainEntry.data.processSteps[0].stepOptions[0].notes)

          expect(response.data[0].stepOptions[0]).to.haveOwnProperty('keywords')
          expect(TypeDetect(response.data[0].stepOptions[0].keywords)).to.equal(EnumsTypeDetect.ARRAY)

          // Check Roles Values
          expect(response.data[0].roles[0]).to.haveOwnProperty('name')
          expect(TypeDetect(response.data[0].roles[0].name)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].roles[0].name).to.equal(mainEntry.data.processSteps[0].responsibleRole)

          expect(response.data[0].roles[0]).to.haveOwnProperty('users')
          expect(TypeDetect(response.data[0].roles[0].users)).to.equal(EnumsTypeDetect.ARRAY)

          expect(response.data[0].roles[0].users[0]).to.haveOwnProperty('email')
          expect(TypeDetect(response.data[0].roles[0].users[0].email)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].roles[0].users[0].email).to.equal('user')

          expect(response.data[0].roles[1]).to.haveOwnProperty('name')
          expect(TypeDetect(response.data[0].roles[1].name)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].roles[1].name).to.equal(Enums.STRING_EMPTY)

          expect(response.data[0].roles[1]).to.haveOwnProperty('users')
          expect(TypeDetect(response.data[0].roles[1].users)).to.equal(EnumsTypeDetect.ARRAY)

          // Check Event Stamp History
          expect(response.data[0].eventStampHistory[0]).to.haveOwnProperty('eventName')
          expect(TypeDetect(response.data[0].eventStampHistory[0].eventName)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].eventStampHistory[0].eventName).to.equal(mainEntry.data.processSteps[0].eventStamp[0].value)

          expect(response.data[0].eventStampHistory[0]).to.haveOwnProperty('timeStamp')
          expect(TypeDetect(response.data[0].eventStampHistory[0].timeStamp)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].eventStampHistory[0].timeStamp).to.not.equal(Enums.STRING_EMPTY)

          expect(response.data[0].eventStampHistory[1]).to.haveOwnProperty('eventName')
          expect(TypeDetect(response.data[0].eventStampHistory[1].eventName)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].eventStampHistory[1].eventName).to.equal('DateSubmitted')

          expect(response.data[0].eventStampHistory[1]).to.haveOwnProperty('timeStamp')
          expect(TypeDetect(response.data[0].eventStampHistory[1].timeStamp)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].eventStampHistory[1].timeStamp).to.not.equal(Enums.STRING_EMPTY)

          // Check History
          expect(response.data[0].history[0]).to.haveOwnProperty('currentUser')
          expect(TypeDetect(response.data[0].history[0].currentUser)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].currentUser).to.equal('user')

          expect(response.data[0].history[0]).to.haveOwnProperty('currentRole')
          expect(TypeDetect(response.data[0].history[0].currentRole)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].currentRole).to.equal(mainEntry.data.processSteps[0].responsibleRole)

          expect(response.data[0].history[0]).to.haveOwnProperty('processStage')
          expect(TypeDetect(response.data[0].history[0].processStage)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].processStage).to.equal(mainEntry.data.processSteps[0].processStage)

          expect(response.data[0].history[0]).to.haveOwnProperty('submissionDate')
          expect(TypeDetect(response.data[0].history[0].submissionDate)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].submissionDate).to.not.equal(Enums.STRING_EMPTY)

          expect(response.data[0].history[0]).to.haveOwnProperty('optionSelected')
          expect(TypeDetect(response.data[0].history[0].optionSelected)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].optionSelected).to.equal('Create Document')

          expect(response.data[0].history[0]).to.haveOwnProperty('fromStep')
          expect(TypeDetect(response.data[0].history[0].fromStep)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].fromStep).to.equal('new')

          expect(response.data[0].history[0]).to.haveOwnProperty('fromStepName')
          expect(TypeDetect(response.data[0].history[0].fromStepName)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].fromStepName).to.equal('New')

          expect(response.data[0].history[0]).to.haveOwnProperty('toStep')
          expect(TypeDetect(response.data[0].history[0].toStep)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].toStep).to.equal(mainEntry.data.processSteps[0].key)

          expect(response.data[0].history[0]).to.haveOwnProperty('toStepName')
          expect(TypeDetect(response.data[0].history[0].toStepName)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].toStepName).to.equal(mainEntry.data.processSteps[0].name)

          expect(response.data[0].history[0]).to.haveOwnProperty('toProcessStage')
          expect(TypeDetect(response.data[0].history[0].toProcessStage)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].toProcessStage).to.equal(mainEntry.data.processSteps[0].processStage)

          expect(response.data[0].history[0]).to.haveOwnProperty('responsibleRole')
          expect(TypeDetect(response.data[0].history[0].responsibleRole)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].responsibleRole).to.equal(mainEntry.data.processSteps[0].responsibleRole)

          expect(response.data[0].history[0]).to.haveOwnProperty('comments')
          expect(TypeDetect(response.data[0].history[0].comments)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].comments).to.equal(Enums.STRING_EMPTY)

          expect(response.data[0].history[0]).to.haveOwnProperty('processKey')
          expect(TypeDetect(response.data[0].history[0].processKey)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].processKey).to.equal(response.data[0].processKey)

          expect(response.data[0].history[0]).to.haveOwnProperty('recordId')
          expect(TypeDetect(response.data[0].history[0].recordId)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].recordId).to.equal(response.data[0].recordId)

          expect(response.data[0].history[0]).to.haveOwnProperty('recordRef')
          expect(TypeDetect(response.data[0].history[0].recordRef)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].recordRef).to.equal(response.data[0].recordRef)

          expect(response.data[0].history[0]).to.haveOwnProperty('duration')
          expect(TypeDetect(response.data[0].history[0].duration)).to.equal(EnumsTypeDetect.NUMBER)
          expect(response.data[0].history[0].duration).to.equal(parseInt(mainEntry.data.processSteps[0].duration))

          expect(response.data[0].history[0]).to.haveOwnProperty('eventStamp')
          expect(TypeDetect(response.data[0].history[0].eventStamp)).to.equal(EnumsTypeDetect.ARRAY)
          expect(TypeDetect(response.data[0].history[0].eventStamp[0])).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].eventStamp[0]).to.equal(mainEntry.data.processSteps[0].eventStamp[0].value)

          expect(response.data[0].history[0]).to.haveOwnProperty('responsibleUsers')
          expect(TypeDetect(response.data[0].history[0].responsibleUsers)).to.equal(EnumsTypeDetect.ARRAY)
          expect(TypeDetect(response.data[0].history[0].responsibleUsers[0])).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[0].responsibleUsers[0]).to.equal('user')

          expect(response.data[0].history[1]).to.haveOwnProperty('currentUser')
          expect(TypeDetect(response.data[0].history[1].currentUser)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[1].currentUser).to.equal('user')

          expect(response.data[0].history[1]).to.haveOwnProperty('currentRole')
          expect(TypeDetect(response.data[0].history[1].currentRole)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[1].currentRole).to.equal(mainEntry.data.processSteps[0].responsibleRole)

          expect(response.data[0].history[1]).to.haveOwnProperty('processStage')
          expect(TypeDetect(response.data[0].history[1].processStage)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[1].processStage).to.equal(mainEntry.data.processSteps[0].processStage)

          expect(response.data[0].history[1]).to.haveOwnProperty('submissionDate')
          expect(TypeDetect(response.data[0].history[1].submissionDate)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[1].submissionDate).to.not.equal(Enums.STRING_EMPTY)

          expect(response.data[0].history[1]).to.haveOwnProperty('optionSelected')
          expect(TypeDetect(response.data[0].history[1].optionSelected)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[1].optionSelected).to.equal(mainEntry.data.processSteps[0].stepOptions[0].key)

          expect(response.data[0].history[1]).to.haveOwnProperty('fromStep')
          expect(TypeDetect(response.data[0].history[1].fromStep)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[1].fromStep).to.equal(mainEntry.data.processSteps[0].key)

          expect(response.data[0].history[1]).to.haveOwnProperty('fromStepName')
          expect(TypeDetect(response.data[0].history[1].fromStepName)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[1].fromStepName).to.equal(mainEntry.data.processSteps[0].name)

          expect(response.data[0].history[1]).to.haveOwnProperty('toStep')
          expect(TypeDetect(response.data[0].history[1].toStep)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[1].toStep).to.equal(Enums.STRING_EMPTY)

          expect(response.data[0].history[1]).to.haveOwnProperty('toStepName')
          expect(TypeDetect(response.data[0].history[1].toStepName)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[1].toStepName).to.equal(Enums.STRING_EMPTY)

          expect(response.data[0].history[1]).to.haveOwnProperty('toProcessStage')
          expect(TypeDetect(response.data[0].history[1].toProcessStage)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[1].toProcessStage).to.equal(Enums.STRING_EMPTY)

          expect(response.data[0].history[1]).to.haveOwnProperty('responsibleRole')
          expect(TypeDetect(response.data[0].history[1].responsibleRole)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[1].responsibleRole).to.equal(Enums.STRING_EMPTY)

          expect(response.data[0].history[1]).to.haveOwnProperty('comments')
          expect(TypeDetect(response.data[0].history[1].comments)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[1].comments).to.equal(Enums.STRING_EMPTY)

          expect(response.data[0].history[1]).to.haveOwnProperty('processKey')
          expect(TypeDetect(response.data[0].history[1].processKey)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[1].processKey).to.equal(response.data[0].processKey)

          expect(response.data[0].history[1]).to.haveOwnProperty('recordId')
          expect(TypeDetect(response.data[0].history[1].recordId)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[1].recordId).to.equal(response.data[0].recordId)

          expect(response.data[0].history[1]).to.haveOwnProperty('recordRef')
          expect(TypeDetect(response.data[0].history[1].recordRef)).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[1].recordRef).to.equal(response.data[0].recordRef)

          expect(response.data[0].history[1]).to.haveOwnProperty('duration')
          expect(TypeDetect(response.data[0].history[1].duration)).to.equal(EnumsTypeDetect.NUMBER)
          expect(response.data[0].history[1].duration).to.equal(parseInt(mainEntry.data.processSteps[0].duration))

          expect(response.data[0].history[1]).to.haveOwnProperty('eventStamp')
          expect(TypeDetect(response.data[0].history[1].eventStamp)).to.equal(EnumsTypeDetect.ARRAY)
          expect(TypeDetect(response.data[0].history[1].eventStamp[0])).to.equal(EnumsTypeDetect.STRING)
          expect(response.data[0].history[1].eventStamp[0]).to.equal('DateSubmitted')

          expect(response.data[0].history[1]).to.haveOwnProperty('responsibleUsers')
          expect(TypeDetect(response.data[0].history[1].responsibleUsers)).to.equal(EnumsTypeDetect.ARRAY)
        })
        .then(done, done)
    })

    it('Delete BPM Profile', (done) => { // eslint-disable-line
      agilite.BPM.deleteData(recordId)
        .then((response) => {
          expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
          expect(JSON.stringify(response.data)).to.equal('{}')
        })
        .then(done, done)
    })
  })

  describe.skip('Old Logic, need to refactor this', () => { // eslint-disable-line
    describe('Get Data', () => { // eslint-disable-line
      describe('Negative Tests', () => { // eslint-disable-line 
      })

      describe('Positive Test', () => { // eslint-disable-line
        it('Slim Result - Find Record By Id- Success', (done) => { // eslint-disable-line
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

    describe('Update Existing Record', () => { // eslint-disable-line
      describe('Negative Tests', () => { // eslint-disable-line
        it('No Params (Negative)', (done) => { // eslint-disable-line
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

        it('No Data Param (Negative)', (done) => { // eslint-disable-line
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

        it('Empty Object Data Param (Negative)', (done) => { // eslint-disable-line
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

        it('No Profile Key (Negative)', (done) => { // eslint-disable-line
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

        it('No Profile Name (Negative)', (done) => { // eslint-disable-line
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

      describe('Positive Test', () => { // eslint-disable-line

      })
    })

    describe('Register BPM Record', () => { // eslint-disable-line
      describe('Negative Test', () => { // eslint-disable-line 
      })

      describe('Positive Test', () => { // eslint-disable-line
        it('Success', (done) => { // eslint-disable-line
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

    describe('Execute', () => { // eslint-disable-line
      describe('Negative Tests', () => { // eslint-disable-line
      })

      describe('Positive Test', () => { // eslint-disable-line
        it('Success', (done) => { // eslint-disable-line
          agilite.BPM.execute(processKey, bpmRecordId, 'submit', 'user')
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

    describe('Get Record State', () => { // eslint-disable-line
      describe('Negative Tests', () => { // eslint-disable-line
        it('No Params (Negative)', (done) => { // eslint-disable-line
          agilite.BPM.getRecordState()
            .catch((err) => {
              expect(err).to.haveOwnProperty('response')
              expect(err.response.status).to.equal(400)
              expect(err.response).to.haveOwnProperty('data')
              expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

              // Check if errorMessage exists and contains correct error message
              expect(err.response.data).to.haveOwnProperty('errorMessage')
              expect(err.response.data.errorMessage).to.equal('At least one header property of \'process-keys\', \'bpm-record-ids\', \'step-names\') or (\'responsible-users\', \'relevant-users\') needs to be provided')
            })
            .then(done, done)
        })
      })

      describe('Positive Tests', () => { // eslint-disable-line
        it('ProcessKey - Success', (done) => { // eslint-disable-line
          agilite.BPM.getRecordState([processKey])
            .then((response) => {
              expect(response).to.haveOwnProperty('data')
              expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.ARRAY)
              expect(response.data.length).to.not.equal(0)
            })
            .then(done, done)
        })

        it('BPM Record Id - Success', (done) => { // eslint-disable-line
          agilite.BPM.getRecordState(null, [bpmRecordId])
            .then((response) => {
              expect(response).to.haveOwnProperty('data')
              expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.ARRAY)
              expect(response.data.length).to.not.equal(0)
            })
            .then(done, done)
        })

        it('Exclude History & Step Options & Visible Objects - Success', (done) => { // eslint-disable-line
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

    describe('Get By Profile Key', () => { // eslint-disable-line
      describe('Negative Tests', () => { // eslint-disable-line
        it('No Param (Negative)', (done) => { // eslint-disable-line
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

        it('Invalid Param (Negative)', (done) => { // eslint-disable-line
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

      describe('Positive Test', () => { // eslint-disable-line
        it('Success', (done) => { // eslint-disable-line
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

    describe('Assign Role', () => { // eslint-disable-line
      describe('Negative Tests', () => { // eslint-disable-line
        it('No Params (Negative)', (done) => { // eslint-disable-line
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

        it('No BPM Record Id (Negative)', (done) => { // eslint-disable-line
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

        it('No Current User (Negative)', (done) => { // eslint-disable-line
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

        it('No Responsible Users (Negative)', (done) => { // eslint-disable-line
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

      describe('Positive Test', () => { // eslint-disable-line
        it('Success', (done) => { // eslint-disable-line
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

    describe('Clear History Data', () => { // eslint-disable-line
      describe('Negative Tests', () => { // eslint-disable-line
        it('No Param (Negative)', (done) => { // eslint-disable-line
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

      describe('Positive Test', () => { // eslint-disable-line
        it('Clear History Data - Success', (done) => { // eslint-disable-line
          agilite.BPM.clearHistoryData(key)
            .then((response) => {
              expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
            })
            .then(done, done)
        })
      })
    })

    describe('Get Assigned Roles', () => { // eslint-disable-line
      describe('Negative Tests', () => { // eslint-disable-line
        it('No Params (Negative)', (done) => { // eslint-disable-line
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

        it('No BPM Record Id (Negative)', (done) => { // eslint-disable-line
          agilite.BPM.getAssignedRoles(invalidValue)
            .then((response) => {
              expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.ARRAY)
              expect(JSON.stringify(response.data)).to.equal('[]')
            })
            .then(done, done)
        })
      })

      describe('Positive Test', () => { // eslint-disable-line
        it('Success', (done) => { // eslint-disable-line
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

    describe('Get Active Steps', () => { // eslint-disable-line
      describe('Negative Tests', () => { // eslint-disable-line
        it('No Param (Negative)', (done) => { // eslint-disable-line
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

      describe('Positive Test', () => { // eslint-disable-line
        it('Success', (done) => { // eslint-disable-line
          agilite.BPM.getActiveSteps(key)
            .then((response) => {
              expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.ARRAY)
              expect(response.data.lenght).to.not.equal(0)
            })
            .then(done, done)
        })
      })
    })

    describe('Get Active Users', () => { // eslint-disable-line
      describe('Negative Tests', () => { // eslint-disable-line
        it('No Param (Negative)', (done) => { // eslint-disable-line
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

      describe('Positive Test', () => { // eslint-disable-line
        it('Success', (done) => { // eslint-disable-line
          agilite.BPM.getActiveUsers(key)
            .then((response) => {
              expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.ARRAY)
              expect(response.data.length).to.not.equal(0)
            })
            .then(done, done)
        })
      })
    })

    describe('Delete BPM Stubs', () => { // eslint-disable-line
      describe('Negative Tests', () => { // eslint-disable-line
        it('No Params', (done) => { // eslint-disable-line
          agilite.BPM.deleteBPMStubs()
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

        it('No BPM Record Ids', (done) => { // eslint-disable-line
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

      describe('Positive Test', () => { // eslint-disable-line
        it('Success', (done) => { // eslint-disable-line
          agilite.BPM.deleteBPMStubs(key, recordId)
            .then((response) => {
              expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
              expect(JSON.stringify(response.data)).to.equal('{}')
            })
            .then(done, done)
        })
      })
    })

    describe('Delete Record', () => { // eslint-disable-line
      describe('Negative Tests', () => { // eslint-disable-line 
        it('No Record Id (Negative)', (done) => { // eslint-disable-line
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

        it.skip('Invalid Record Id (Negative)', (done) => { // eslint-disable-line
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

      describe('Positive Test', () => { // eslint-disable-line
        it('Success', (done) => { // eslint-disable-line
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
})
