'use strict'

require('dotenv').config()
const UUID = require('uuid')
const TypeDetect = require('type-detect')
const expect = require('chai').expect
const Agilite = require('../controllers/agilite')
const EnumsTypeDetect = require('../utils/enums-type-detect')
const DataTemplate = require('../data-templates/datamappings')

const agilite = new Agilite({
  apiServerUrl: process.env.API_SERVER_URL,
  apiKey: process.env.API_KEY
})

describe('Agilit-e Data Mappings', () => {
  let mainEntry = null
  let tmpEntry = null
  let recordId = null
  let key = UUID.v1()
  let error = null

  it('Create New Invalid Record - Empty Body Object', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyObject))

    agilite.DataMappings.postData(mainEntry)
      .then((response) => {})
      .catch((err) => {
        error = err.response.data

        expect(TypeDetect(error)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(error).to.haveOwnProperty('statusCode')
        expect(error.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct error message
        expect(error).to.haveOwnProperty('errorMessage')
        expect(error.errorMessage).to.equal("No 'data' property found in JSON Body")

        // Check if additionalMessages exists and is blank array
        expect(error).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(error.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Create New Invalid Record - No Key', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyDataObject))

    agilite.DataMappings.postData(mainEntry)
      .then((response) => {})
      .catch((err) => {
        error = err.response.data

        expect(TypeDetect(error)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(error).to.haveOwnProperty('statusCode')
        expect(error.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct error message
        expect(error).to.haveOwnProperty('errorMessage')
        expect(error.errorMessage).to.equal("Please provide a valid Profile 'key'")

        // Check if additionalMessages exists and is blank array
        expect(error).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(error.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Create New Invalid Record - No Name', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.dataObject))
    mainEntry.data.key = key

    agilite.DataMappings.postData(mainEntry)
      .then((response) => {})
      .catch((err) => {
        error = err.response.data

        expect(TypeDetect(error)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(error).to.haveOwnProperty('statusCode')
        expect(error.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct error message
        expect(error).to.haveOwnProperty('errorMessage')
        expect(error.errorMessage).to.equal("Please provide a valid Profile 'name'")

        // Check if additionalMessages exists and is blank array
        expect(error).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(error.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Create New Invalid Record - No Source Type', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.new))
    mainEntry.data.key = key
    mainEntry.data.name = key

    delete mainEntry.data.sourceType

    agilite.DataMappings.postData(mainEntry)
      .then((response) => {})
      .catch((err) => {
        error = err.response.data

        expect(TypeDetect(error)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(error).to.haveOwnProperty('statusCode')
        expect(error.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct error message
        expect(error).to.haveOwnProperty('errorMessage')
        expect(error.errorMessage).to.equal("Please provide a valid 'sourceType'")

        // Check if additionalMessages exists and is blank array
        expect(error).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(error.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })
  it('Create New Invalid Record - No Destination Type', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.new))
    mainEntry.data.key = key
    mainEntry.data.name = key

    delete mainEntry.data.destinationType

    agilite.DataMappings.postData(mainEntry)
      .then((response) => {})
      .catch((err) => {
        error = err.response.data

        expect(TypeDetect(error)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(error).to.haveOwnProperty('statusCode')
        expect(error.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct error message
        expect(error).to.haveOwnProperty('errorMessage')
        expect(error.errorMessage).to.equal("Please provide a valid 'destinationType'")

        // Check if additionalMessages exists and is blank array
        expect(error).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(error.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Create New Record', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.new))
    mainEntry.data.key = key
    mainEntry.data.name = key

    agilite.DataMappings.postData(mainEntry)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Compare values to confirm that data passed is the same as the data returned
        expect(response.data.data.key).to.equal(key)
        expect(response.data.data.name).to.equal(key)

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

    agilite.DataMappings.getData()
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.ARRAY)
        expect(response.data.length).to.be.greaterThan(0)

        for (let x in response.data) {
          tmpEntry = response.data[x]

          if (tmpEntry._id === recordId) {
            // Check for certain properties to exisst
            expect(tmpEntry).to.haveOwnProperty('data')

            // Check if the returned object is a Slim Result
            // TODO: expect(tmpEntry.createdBy).to.equal(undefined)
          }
        }
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Update Record - Empty Body Object', (done) => {
    expect(recordId).to.not.equal(null)

    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyObject))

    agilite.DataMappings.putData(recordId, mainEntry)
      .then((response) => {})
      .catch((err) => {
        error = err.response.data

        expect(TypeDetect(error)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(error).to.haveOwnProperty('statusCode')
        expect(error.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct error message
        expect(error).to.haveOwnProperty('errorMessage')
        expect(error.errorMessage).to.equal("No 'data' property found in JSON Body")

        // Check if additionalMessages exists and is blank array
        expect(error).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(error.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Update Record - No Key', (done) => {
    expect(recordId).to.not.equal(null)

    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyDataObject))

    agilite.DataMappings.putData(recordId, mainEntry)
      .then((response) => {})
      .catch((err) => {
        error = err.response.data

        expect(TypeDetect(error)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(error).to.haveOwnProperty('statusCode')
        expect(error.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct error message
        expect(error).to.haveOwnProperty('errorMessage')
        expect(error.errorMessage).to.equal("Please provide a valid Profile 'key'")

        // Check if additionalMessages exists and is blank array
        expect(error).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(error.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Update Record - No Name', (done) => {
    expect(recordId).to.not.equal(null)

    mainEntry = JSON.parse(JSON.stringify(DataTemplate.dataObject))
    mainEntry.data.key = key

    agilite.DataMappings.putData(recordId, mainEntry)
      .then((response) => {})
      .catch((err) => {
        error = err.response.data

        expect(TypeDetect(error)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(error).to.haveOwnProperty('statusCode')
        expect(error.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct error message
        expect(error).to.haveOwnProperty('errorMessage')
        expect(error.errorMessage).to.equal("Please provide a valid Profile 'name'")

        // Check if additionalMessages exists and is blank array
        expect(error).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(error.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Update Record - No Source Type', (done) => {
    expect(recordId).to.not.equal(null)

    mainEntry = JSON.parse(JSON.stringify(DataTemplate.new))
    mainEntry.data.key = key
    mainEntry.data.name = key

    delete mainEntry.data.sourceType

    agilite.DataMappings.putData(recordId, mainEntry)
      .then((response) => {})
      .catch((err) => {
        error = err.response.data

        expect(TypeDetect(error)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(error).to.haveOwnProperty('statusCode')
        expect(error.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct error message
        expect(error).to.haveOwnProperty('errorMessage')
        expect(error.errorMessage).to.equal("Please provide a valid 'sourceType'")

        // Check if additionalMessages exists and is blank array
        expect(error).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(error.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Update Record - No Destination Type', (done) => {
    expect(recordId).to.not.equal(null)

    mainEntry = JSON.parse(JSON.stringify(DataTemplate.new))
    mainEntry.data.key = key
    mainEntry.data.name = key

    delete mainEntry.data.destinationType

    agilite.DataMappings.putData(recordId, mainEntry)
      .then((response) => {})
      .catch((err) => {
        error = err.response.data

        expect(TypeDetect(error)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(error).to.haveOwnProperty('statusCode')
        expect(error.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct error message
        expect(error).to.haveOwnProperty('errorMessage')
        expect(error.errorMessage).to.equal("Please provide a valid 'destinationType'")

        // Check if additionalMessages exists and is blank array
        expect(error).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(error.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Update Record - No Record ID', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyObject))

    agilite.DataMappings.putData(undefined, mainEntry)
      .then((response) => {})
      .catch((err) => {
        error = err.response.data

        expect(TypeDetect(error)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(error).to.haveOwnProperty('statusCode')
        expect(error.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct error message
        expect(error).to.haveOwnProperty('errorMessage')
        expect(error.errorMessage).to.equal("No Id was specified in the 'record-id' header parameter")

        // Check if additionalMessages exists and is blank array
        expect(error).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(error.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Update Record', (done) => {
    expect(recordId).to.not.equal(null)
    key = 'PUT_' + key

    mainEntry = JSON.parse(JSON.stringify(DataTemplate.modified))
    mainEntry.data.key = key
    mainEntry.data.name = key

    agilite.DataMappings.putData(recordId, mainEntry)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Compare Values object to confirm that data passed is the same as the data returned
        expect(response.data.data.key).to.equal(key)
        expect(response.data.data.name).to.equal(key)
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Execute - No Key', (done) => {
    agilite.DataMappings.execute()
      .then((response) => {})
      .catch((err) => {
        error = err.response.data

        expect(TypeDetect(error)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(error).to.haveOwnProperty('statusCode')
        expect(error.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct error message
        expect(error).to.haveOwnProperty('errorMessage')
        expect(error.errorMessage).to.equal("No Profile Key was specified in the 'profile-key' header parameter")

        // Check if additionalMessages exists and is blank array
        expect(error).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(error.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Execute', (done) => {
    expect(key).to.not.equal(null)

    agilite.DataMappings.execute(key)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Delete Record - No Record ID', (done) => {
    agilite.DataMappings.deleteData()
      .then((response) => {})
      .catch((err) => {
        error = err.response.data

        expect(TypeDetect(error)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(error).to.haveOwnProperty('statusCode')
        expect(error.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct error message
        expect(error).to.haveOwnProperty('errorMessage')
        expect(error.errorMessage).to.equal("No Id was specified in the 'record-id' header parameter")

        // Check if additionalMessages exists and is blank array
        expect(error).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(error.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Delete Record - Non-existant Record ID', (done) => {
    agilite.DataMappings.deleteData("test")
      .then((response) => {})
      .catch((err) => {
        error = err.response.data

        expect(TypeDetect(error)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(error).to.haveOwnProperty('statusCode')
        expect(error.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct error message
        expect(error).to.haveOwnProperty('errorMessage')
        expect(error.errorMessage).to.equal("Record with id: 'test' cannot be found")

        // Check if additionalMessages exists and is blank array
        expect(error).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(error.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Delete Record', (done) => {
    expect(recordId).to.not.equal(null)

    agilite.DataMappings.deleteData(recordId)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
        expect(JSON.stringify(response.data)).to.equal('{}')
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })
})
