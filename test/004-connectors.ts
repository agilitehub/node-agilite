'use strict'

import {config} from 'dotenv'
config()

import TypeDetect from 'type-detect'
import UUID from 'uuid'
import {expect} from 'chai'
import * as Enums from '../utils/enums'
import Agilite from '../dist/controllers/agilite'
import EnumsTypeDetect from '../dist/utils/enums-type-detect'
import DataTemplate from '../dist/data-templates/connectors'

const agilite = new Agilite({
  apiServerUrl: process.env.API_SERVER_URL,
  apiKey: process.env.API_KEY
})

describe('Agilit-e Connectors', () => {
  let mainEntry = null
  let tmpEntry = null
  let recordId = null
  let key = UUID.v1()
  let routeId = UUID.v1()
  let error = null
  let connectionTypes = ["1", "6", "10", "11", "12"]
  let connectionTypeLabels = ["webAPI", "imap", "mongodb", "ftp", "connectionData"]
  let tmpValue = null

  it('Create New Invalid Record - Empty Body Object', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyObject))

    agilite.Connectors.postData(mainEntry)
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

    agilite.Connectors.postData(mainEntry)
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

    agilite.Connectors.postData(mainEntry)
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

  it('Create New Invalid Record - No Connection Type', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.new))
    mainEntry.data.key = key
    mainEntry.data.name = key
    mainEntry.data.routes[0]._id = routeId

    // Remove Connection Type
    delete mainEntry.data.connectionType

    agilite.Connectors.postData(mainEntry)
      .then((response) => {})
      .catch((err) => {
        error = err.response.data

        expect(TypeDetect(error)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(error).to.haveOwnProperty('statusCode')
        expect(error.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct error message
        expect(error).to.haveOwnProperty('errorMessage')
        expect(error.errorMessage).to.equal("Please provide a valid 'connectionType'")

        // Check if additionalMessages exists and is blank array
        expect(error).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(error.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  connectionTypeLabels.map((entry, index) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.new))
    mainEntry.data.key = key
    mainEntry.data.name = key
    mainEntry.data.routes[0]._id = routeId

    it(`Create New Invalid Record - No ${entry} Object`, (done) => {
      delete mainEntry.data[entry]
      mainEntry.data.connectionType = connectionTypes[index]

      agilite.Connectors.postData(mainEntry)
        .then((response) => {})
        .catch((err) => {
          error = err.response.data
  
          expect(TypeDetect(error)).to.equal(EnumsTypeDetect.OBJECT)
  
          // Check if statusCode exists and contains correct value
          expect(error).to.haveOwnProperty('statusCode')
          expect(error.statusCode).to.equal(400)
  
          // Check if errorMessage exists and contains correct error message
          expect(error).to.haveOwnProperty('errorMessage')
          expect(error.errorMessage).to.equal(`Please provide a valid '${entry}' property in the data object`)
  
          // Check if additionalMessages exists and is blank array
          expect(error).to.haveOwnProperty('additionalMessages')
          expect(TypeDetect(error.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
        })
        .then(done, done)
    })
  })

  it('Create New Record', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.new))
    mainEntry.data.key = key
    mainEntry.data.name = key
    mainEntry.data.routes[0]._id = routeId

    agilite.Connectors.postData(mainEntry)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Compare values to confirm that data passed is the same as the data returned
        expect(response.data.data.key).to.equal(key)
        expect(response.data.data.name).to.equal(key)
        expect(response.data.data.routes[0]._id).to.equal(routeId)

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

    agilite.Connectors.getData()
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

    agilite.Connectors.putData(recordId, mainEntry)
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

    agilite.Connectors.putData(recordId, mainEntry)
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

    agilite.Connectors.putData(recordId, mainEntry)
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

  it('Update Record - No Connection Type', (done) => {
    expect(recordId).to.not.equal(null)

    mainEntry = JSON.parse(JSON.stringify(DataTemplate.new))
    mainEntry.data.key = key
    mainEntry.data.name = key
    mainEntry.data.routes[0]._id = routeId

    // Remove Connection Type
    delete mainEntry.data.connectionType

    agilite.Connectors.putData(recordId, mainEntry)
      .then((response) => {})
      .catch((err) => {
        error = err.response.data

        expect(TypeDetect(error)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(error).to.haveOwnProperty('statusCode')
        expect(error.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct error message
        expect(error).to.haveOwnProperty('errorMessage')
        expect(error.errorMessage).to.equal("Please provide a valid 'connectionType'")

        // Check if additionalMessages exists and is blank array
        expect(error).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(error.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  connectionTypeLabels.map((entry, index) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.new))
    mainEntry.data.key = key
    mainEntry.data.name = key
    mainEntry.data.routes[0]._id = routeId

    it(`Update Record - No ${entry} Object`, (done) => {
      delete mainEntry.data[entry]
      mainEntry.data.connectionType = connectionTypes[index]
      expect(recordId).to.not.equal(null)

      agilite.Connectors.putData(recordId, mainEntry)
        .then((response) => {})
        .catch((err) => {
          error = err.response.data
  
          expect(TypeDetect(error)).to.equal(EnumsTypeDetect.OBJECT)
  
          // Check if statusCode exists and contains correct value
          expect(error).to.haveOwnProperty('statusCode')
          expect(error.statusCode).to.equal(400)
  
          // Check if errorMessage exists and contains correct error message
          expect(error).to.haveOwnProperty('errorMessage')
          expect(error.errorMessage).to.equal(`Please provide a valid '${entry}' property in the data object`)
  
          // Check if additionalMessages exists and is blank array
          expect(error).to.haveOwnProperty('additionalMessages')
          expect(TypeDetect(error.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
        })
        .then(done, done)
    })
  })

  it('Update Record', (done) => {
    expect(recordId).to.not.equal(null)
    key = 'PUT_' + key

    mainEntry = JSON.parse(JSON.stringify(DataTemplate.modified))
    mainEntry.data.key = key
    mainEntry.data.name = key

    agilite.Connectors.putData(recordId, mainEntry)
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

  it('Execute - No Profile Key', (done) => {
    expect(key).to.not.equal(null)

    agilite.Connectors.execute(undefined, 'ping')
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

  it('Execute - No Route Key', (done) => {
    expect(key).to.not.equal(null)

    agilite.Connectors.execute(key, undefined)
      .then((response) => {})
      .catch((err) => {
        error = err.response.data

        expect(TypeDetect(error)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(error).to.haveOwnProperty('statusCode')
        expect(error.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct error message
        expect(error).to.haveOwnProperty('errorMessage')
        expect(error.errorMessage).to.equal("No Route Key was specified in the 'route-key' header parameter")

        // Check if additionalMessages exists and is blank array
        expect(error).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(error.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Execute', (done) => {
    expect(key).to.not.equal(null)

    agilite.Connectors.execute(key, 'ping')
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)
        expect(response.data).to.equal('Greetings from Agilit-e')
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Delete Record - No Record ID', (done) => {
    agilite.Connectors.deleteData()
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
    agilite.Connectors.deleteData("test")
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

    agilite.Connectors.deleteData(recordId)
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
