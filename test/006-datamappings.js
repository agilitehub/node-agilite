'use strict'

require('dotenv').config()
const UUID = require('uuid')
const TypeDetect = require('type-detect')
const expect = require('chai').expect
const Agilite = require('../controllers/agilite')
const EnumsTypeDetect = require('../utils/enums-type-detect')
const Enums = require('../utils/enums')
const DataTemplate = require('../data-templates/datamappings')

const agilite = new Agilite({
  apiServerUrl: process.env.API_SERVER_URL,
  apiKey: process.env.API_KEY
})

describe('Agilit-e Data Mapping', () => {
  const groupName = UUID.v1()
  const invalidValue = 'invalid_value'

  let mainEntry = null
  let tmpEntry = null
  let recordId = null
  let key = UUID.v1()
  console.log(key)

  it('Create New Record - No Params (Negative)', (done) => {
    agilite.DataMappings.postData()
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

    agilite.DataMappings.postData(mainEntry)
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

    agilite.DataMappings.postData(mainEntry)
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

  it('Create New Record - No Profile Name (Negative)', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyDataObject))
    mainEntry.data.key = key

    agilite.DataMappings.postData(mainEntry)
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

  it('Create New Record - No Source Type (Negative)', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyDataObject))
    mainEntry.data.key = key
    mainEntry.data.name = key

    agilite.DataMappings.postData(mainEntry)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('Please provide a valid \'sourceType\'')
      })
      .then(done, done)
  })

  it('Create New Record - No Destination Type (Negative)', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyDataObject))
    mainEntry.data.key = key
    mainEntry.data.name = key
    mainEntry.data.sourceType = '1'

    agilite.DataMappings.postData(mainEntry)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('Please provide a valid \'destinationType\'')
      })
      .then(done, done)
  })

  it('Create New Record - Invalid Source Type (Negative)', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyDataObject))
    mainEntry.data.key = key
    mainEntry.data.name = key
    mainEntry.data.sourceType = '3'
    mainEntry.data.destinationType = '2'

    agilite.DataMappings.postData(mainEntry)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('Please provide a valid \'sourceType\' value e.g \'1\' - JSON')
      })
      .then(done, done)
  })

  it('Create New Record - Invalid Destnation Type (Negative)', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyDataObject))
    mainEntry.data.key = key
    mainEntry.data.name = key
    mainEntry.data.sourceType = '2'
    mainEntry.data.destinationType = '3'

    agilite.DataMappings.postData(mainEntry)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('Please provide a valid \'destinationType\' value e.g \'1\' - JSON')
      })
      .then(done, done)
  })

  it('Create New Record - Success', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.new))
    mainEntry.data.key = key
    mainEntry.data.name = key
    mainEntry.data.sourceType = '1'
    mainEntry.data.destinationType = '1'

    agilite.DataMappings.postData(mainEntry)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if provided values match
        expect(response.data.data).to.haveOwnProperty('key')
        expect(response.data.data.key).to.equal(key)
        expect(response.data.data).to.haveOwnProperty('name')
        expect(response.data.data.name).to.equal(key)
        expect(response.data.data).to.haveOwnProperty('sourceType')
        expect(response.data.data.sourceType).to.equal('1')
        expect(response.data.data).to.haveOwnProperty('destinationType')
        expect(response.data.data.destinationType).to.equal('1')

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

        // Store Record Id to be used later
        recordId = response.data._id
      })
      .then(done, done)
  })

  it('Get Data - Slim Result - Find Record By Id - Success', (done) => {
    agilite.DataMappings.getData()
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
    agilite.DataMappings.putData()
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

  it('Update Existing Record - Empty Object (Negative)', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyObject))

    agilite.DataMappings.putData(recordId, mainEntry)
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

    agilite.DataMappings.putData(recordId, mainEntry)
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

  it('Update Existing Record - No Profile Name (Negative)', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyDataObject))
    mainEntry.data.key = key

    agilite.DataMappings.putData(recordId, mainEntry)
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

  it('Update Existing Record - No Source Type (Negative)', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyDataObject))
    mainEntry.data.key = key
    mainEntry.data.name = key

    agilite.DataMappings.putData(recordId, mainEntry)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('Please provide a valid \'sourceType\'')
      })
      .then(done, done)
  })

  it('Update Existing Record - No Destination Type (Negative)', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyDataObject))
    mainEntry.data.key = key
    mainEntry.data.name = key
    mainEntry.data.sourceType = '1'

    agilite.DataMappings.putData(recordId, mainEntry)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('Please provide a valid \'destinationType\'')
      })
      .then(done, done)
  })

  it('Update Existing Record - Invalid Source Type (Negative)', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyDataObject))
    mainEntry.data.key = key
    mainEntry.data.name = key
    mainEntry.data.sourceType = '3'
    mainEntry.data.destinationType = '2'

    agilite.DataMappings.putData(recordId, mainEntry)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('Please provide a valid \'sourceType\' value e.g \'1\' - JSON')
      })
      .then(done, done)
  })

  it('Update Existing Record - Invalid Destnation Type (Negative)', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyDataObject))
    mainEntry.data.key = key
    mainEntry.data.name = key
    mainEntry.data.sourceType = '2'
    mainEntry.data.destinationType = '3'

    agilite.DataMappings.putData(recordId, mainEntry)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('Please provide a valid \'destinationType\' value e.g \'1\' - JSON')
      })
      .then(done, done)
  })

  it('Update Existing Record - Success', (done) => { // TODO: This will need fileIds for Excel
    key = 'PUT_' + key
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.modified))
    mainEntry.data.key = key
    mainEntry.data.name = key
    mainEntry.data.sourceType = '1'
    mainEntry.data.destinationType = '1'

    agilite.DataMappings.putData(recordId, mainEntry)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if provided values match
        expect(response.data.data).to.haveOwnProperty('key')
        expect(response.data.data.key).to.equal(key)
        expect(response.data.data).to.haveOwnProperty('name')
        expect(response.data.data.name).to.equal(key)
        expect(response.data.data).to.haveOwnProperty('sourceType')
        expect(response.data.data.sourceType).to.equal('1')
        expect(response.data.data).to.haveOwnProperty('destinationType')
        expect(response.data.data.destinationType).to.equal('1')

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
        expect(response.data.data.groupName).to.equal(DataTemplate.modified.data.groupName)
      })
      .then(done, done)
  })

  it('Execute - No Params (Negative)', (done) => {
    agilite.DataMappings.execute()
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

  it('Execute - No Data (Negative)', (done) => {
    agilite.DataMappings.execute(key, null)
      .then((response) => {
        expect(TypeDetect(response)).to.equal(EnumsTypeDetect.OBJECT)
        expect(response).to.haveOwnProperty('status')
        expect(TypeDetect(response.status)).to.equal(EnumsTypeDetect.NUMBER)
        expect(response.status).to.equal(200)
        expect(response).to.haveOwnProperty('data')
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)

        expect(response.data).to.haveOwnProperty('desParam1')
        expect(TypeDetect(response.data.desParam1)).to.equal(EnumsTypeDetect.STRING)
        expect(response.data.desParam1).to.equal('')
        expect(response.data).to.haveOwnProperty('desParam2')
        expect(TypeDetect(response.data.desParam2)).to.equal(EnumsTypeDetect.STRING)
        expect(response.data.desParam2).to.equal('')
      })
      .then(done, done)
  })

  it.skip('Execute - Success', (done) => { // TODO: Add response validation
    agilite.DataMappings.execute(key, {})
      .then((response) => {
        expect(TypeDetect(response)).to.equal(EnumsTypeDetect.OBJECT)
        expect(response).to.haveOwnProperty('status')
        expect(TypeDetect(response.status)).to.equal(EnumsTypeDetect.NUMBER)
        expect(response.status).to.equal(200)
        expect(response).to.haveOwnProperty('data')
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)

        expect(response.data).to.haveOwnProperty('desParam1')
        expect(TypeDetect(response.data.desParam1)).to.equal(EnumsTypeDetect.STRING)
        expect(response.data.desParam1).to.equal('')
        expect(response.data).to.haveOwnProperty('desParam2')
        expect(TypeDetect(response.data.desParam2)).to.equal(EnumsTypeDetect.STRING)
        expect(response.data.desParam2).to.equal('')
      })
      .then(done, done)
  })

  it('Delete Record - No Record Id (Negative)', (done) => {
    agilite.DataMappings.deleteData()
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
    agilite.DataMappings.deleteData(invalidValue)
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
    agilite.DataMappings.deleteData(recordId)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
        expect(JSON.stringify(response.data)).to.equal('{}')
      })
      .then(done, done)
  })
})
