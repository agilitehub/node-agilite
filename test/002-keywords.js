'use strict'

require('dotenv').config()
const UUID = require('uuid')
const TypeDetect = require('type-detect')
const expect = require('chai').expect
const Agilite = require('../controllers/agilite')
const EnumsTypeDetect = require('../utils/enums-type-detect')
const Enums = require('../utils/enums')
const DataTemplate = require('../data-templates/keywords')

const agilite = new Agilite({
  apiServerUrl: process.env.API_SERVER_URL,
  apiKey: process.env.API_KEY
})

describe('Agilit-e Keywords', () => {
  let mainEntry = null
  let tmpEntry = null
  let recordId = null
  let key = UUID.v1()
  let groupName = UUID.v1()
  let error = null

  it('Create New Invalid Record - Empty Body Object', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyObject))

    agilite.Keywords.postData(mainEntry)
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

    agilite.Keywords.postData(mainEntry)
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

  it('Create New Invalid Record - No/Empty Values', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyValues))
    mainEntry.data.key = key

    agilite.Keywords.postData(mainEntry)
      .then((response) => {})
      .catch((err) => {
        error = err.response.data

        expect(TypeDetect(error)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(error).to.haveOwnProperty('statusCode')
        expect(error.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct error message
        expect(error).to.haveOwnProperty('errorMessage')
        expect(error.errorMessage).to.equal("At least 1 'values' JSON entry is required")

        // Check if additionalMessages exists and is blank array
        expect(error).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(error.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Create New Invalid Record - Invalid Values Array Entry', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.invalidValues.invalidObject))
    mainEntry.data.key = key

    agilite.Keywords.postData(mainEntry)
      .then((response) => {})
      .catch((err) => {
        error = err.response.data

        expect(TypeDetect(error)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(error).to.haveOwnProperty('statusCode')
        expect(error.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct error message
        expect(error).to.haveOwnProperty('errorMessage')
        expect(error.errorMessage).to.equal("Please provide a valid 'label' property in the 'values' entry")

        // Check if additionalMessages exists and is blank array
        expect(error).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(error.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Create New Invalid Record - Invalid Label Property', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.invalidValues.invalidLabel))
    mainEntry.data.key = key

    agilite.Keywords.postData(mainEntry)
      .then((response) => {})
      .catch((err) => {
        error = err.response.data

        expect(TypeDetect(error)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(error).to.haveOwnProperty('statusCode')
        expect(error.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct error message
        expect(error).to.haveOwnProperty('errorMessage')
        expect(error.errorMessage).to.equal("Please provide a valid 'label' property in the 'values' entry")

        // Check if additionalMessages exists and is blank array
        expect(error).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(error.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Create New Invalid Record - Invalid Value Property', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.invalidValues.invalidValue))
    mainEntry.data.key = key

    agilite.Keywords.postData(mainEntry)
      .then((response) => {})
      .catch((err) => {
        error = err.response.data

        expect(TypeDetect(error)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(error).to.haveOwnProperty('statusCode')
        expect(error.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct error message
        expect(error).to.haveOwnProperty('errorMessage')
        expect(error.errorMessage).to.equal("Please provide a valid 'value' property in the 'values' entry")

        // Check if additionalMessages exists and is blank array
        expect(error).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(error.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Create New Valid Record', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.new))
    mainEntry.data.key = key

    agilite.Keywords.postData(mainEntry)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if GroupName exists and is blank
        expect(response.data.data).to.haveOwnProperty('groupName')
        expect(response.data.data.groupName).to.equal(Enums.STRING_EMPTY)

        // Compare Values object to confirm that data passed is the same as the data returned
        expect(JSON.stringify(response.data.data.values)).to.equal(JSON.stringify(mainEntry.data.values))

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

    agilite.Keywords.getData()
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.ARRAY)
        expect(response.data.length).to.be.greaterThan(0)

        for (let x in response.data) {
          tmpEntry = response.data[x]

          if (tmpEntry._id === recordId) {
            // Check that data and values objects exist
            expect(tmpEntry).to.haveOwnProperty('data')
            expect(tmpEntry.data).to.haveOwnProperty('values')

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

  it('Update Record - Empty Body Object', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyObject))

    agilite.Keywords.putData(recordId, mainEntry)
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
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyDataObject))

    agilite.Keywords.putData(recordId, mainEntry)
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

  it('Update Record - No/Empty Values', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyValues))
    mainEntry.data.key = key

    agilite.Keywords.putData(recordId, mainEntry)
      .then((response) => {})
      .catch((err) => {
        error = err.response.data

        expect(TypeDetect(error)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(error).to.haveOwnProperty('statusCode')
        expect(error.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct error message
        expect(error).to.haveOwnProperty('errorMessage')
        expect(error.errorMessage).to.equal("At least 1 'values' JSON entry is required")

        // Check if additionalMessages exists and is blank array
        expect(error).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(error.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Update Record - Invalid Values Array Entry', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.invalidValues.invalidObject))
    mainEntry.data.key = key

    agilite.Keywords.putData(recordId, mainEntry)
      .then((response) => {})
      .catch((err) => {
        error = err.response.data

        expect(TypeDetect(error)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(error).to.haveOwnProperty('statusCode')
        expect(error.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct error message
        expect(error).to.haveOwnProperty('errorMessage')
        expect(error.errorMessage).to.equal("Please provide a valid 'label' property in the 'values' entry")

        // Check if additionalMessages exists and is blank array
        expect(error).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(error.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Update Record - Invalid Label Property', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.invalidValues.invalidLabel))
    mainEntry.data.key = key

    agilite.Keywords.putData(recordId, mainEntry)
      .then((response) => {})
      .catch((err) => {
        error = err.response.data

        expect(TypeDetect(error)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(error).to.haveOwnProperty('statusCode')
        expect(error.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct error message
        expect(error).to.haveOwnProperty('errorMessage')
        expect(error.errorMessage).to.equal("Please provide a valid 'label' property in the 'values' entry")

        // Check if additionalMessages exists and is blank array
        expect(error).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(error.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Update Record - Invalid Value Property', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.invalidValues.invalidValue))
    mainEntry.data.key = key

    agilite.Keywords.putData(recordId, mainEntry)
      .then((response) => {})
      .catch((err) => {
        error = err.response.data

        expect(TypeDetect(error)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(error).to.haveOwnProperty('statusCode')
        expect(error.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct error message
        expect(error).to.haveOwnProperty('errorMessage')
        expect(error.errorMessage).to.equal("Please provide a valid 'value' property in the 'values' entry")

        // Check if additionalMessages exists and is blank array
        expect(error).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(error.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Update Record - No Record ID', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.modified))
    mainEntry.data.key = key

    agilite.Keywords.putData(undefined, mainEntry)
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

  it('Update Record - Non-existant Record ID', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.modified))
    mainEntry.data.key = key

    agilite.Keywords.putData("test", mainEntry)
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

  it('Update Record', (done) => {
    expect(recordId).to.not.equal(null)
    key = 'PUT_' + key

    mainEntry = JSON.parse(JSON.stringify(DataTemplate.modified))
    mainEntry.data.key = key
    mainEntry.data.groupName = groupName

    agilite.Keywords.putData(recordId, mainEntry)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if GroupName exists and contains passed value
        expect(response.data.data).to.haveOwnProperty('groupName')
        expect(response.data.data.groupName).to.equal(mainEntry.data.groupName)

        // Compare Values object to confirm that data passed is the same as the data returned
        expect(JSON.stringify(response.data.data.values)).to.equal(JSON.stringify(mainEntry.data.values))
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Get By Profile Key - No Profile Key', (done) => {
    agilite.Keywords.getByProfileKey(undefined)
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

  it('Get By Profile Key - Non-existant Profile Key', (done) => {
    agilite.Keywords.getByProfileKey("non-existant")
      .then((response) => {})
      .catch((err) => {
        error = err.response.data

        expect(TypeDetect(error)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(error).to.haveOwnProperty('statusCode')
        expect(error.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct error message
        expect(error).to.haveOwnProperty('errorMessage')
        expect(error.errorMessage).to.equal("Active Keyword Profile cannot be found - non-existant")

        // Check if additionalMessages exists and is blank array
        expect(error).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(error.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Get By Profile Key', (done) => {
    expect(key).to.not.equal(null)

    agilite.Keywords.getByProfileKey(key)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.ARRAY)
        expect(response.data.length).to.be.greaterThan(0)
        expect(JSON.stringify(response.data)).to.equal(JSON.stringify(mainEntry.data.values))

        // Get first entry and check if there is a label and value property
        tmpEntry = response.data[0]
        expect(tmpEntry).to.haveOwnProperty('label')
        expect(tmpEntry).to.haveOwnProperty('value')
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Get Profile Keys by Group - No Group Name', (done) => {
    agilite.Keywords.getProfileKeysByGroup(undefined)
      .then((response) => {})
      .catch((err) => {
        error = err.response.data

        expect(TypeDetect(error)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(error).to.haveOwnProperty('statusCode')
        expect(error.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct error message
        expect(error).to.haveOwnProperty('errorMessage')
        expect(error.errorMessage).to.equal("No value was specified in the 'group-name' header parameter")

        // Check if additionalMessages exists and is blank array
        expect(error).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(error.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Get Profile Keys by Group - Non-existant Group Name', (done) => {
    agilite.Keywords.getProfileKeysByGroup("non-existant")
      .then((response) => {})
      .catch((err) => {
        error = err.response.data

        expect(TypeDetect(error)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(error).to.haveOwnProperty('statusCode')
        expect(error.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct error message
        expect(error).to.haveOwnProperty('errorMessage')
        expect(error.errorMessage).to.equal("Active Keyword Profiles cannot be found for Group - non-existant")

        // Check if additionalMessages exists and is blank array
        expect(error).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(error.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Get Profile Keys by Group', (done) => {
    expect(groupName).to.not.equal(null)

    agilite.Keywords.getProfileKeysByGroup(groupName)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.ARRAY)
        expect(response.data.length).to.be.greaterThan(0)
        expect(JSON.stringify(response.data)).to.equal(JSON.stringify([key]))
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Get Label By Value - No Value', (done) => {
    agilite.Keywords.getLabelByValue(key, undefined)
      .then((response) => {})
      .catch((err) => {
        error = err.response.data

        expect(TypeDetect(error)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(error).to.haveOwnProperty('statusCode')
        expect(error.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct error message
        expect(error).to.haveOwnProperty('errorMessage')
        expect(error.errorMessage).to.equal("No Value Key was specified in the 'value-key' header parameter")

        // Check if additionalMessages exists and is blank array
        expect(error).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(error.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Get Label By Value - Non-existant Value', (done) => {
    agilite.Keywords.getLabelByValue(key, "non-existant")
      .then((response) => {})
      .catch((err) => {
        error = err.response.data

        expect(TypeDetect(error)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(error).to.haveOwnProperty('statusCode')
        expect(error.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct error message
        expect(error).to.haveOwnProperty('errorMessage')
        expect(error.errorMessage).to.equal("Value Entry cannot be found - non-existant")

        // Check if additionalMessages exists and is blank array
        expect(error).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(error.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Get Label By Value', (done) => {
    agilite.Keywords.getLabelByValue(key, mainEntry.data.values[0].value)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)
        expect(response.data).to.equal(mainEntry.data.values[0].label)
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Get Value By Label - No Label', (done) => {
    agilite.Keywords.getValueByLabel(key, undefined)
      .then((response) => {})
      .catch((err) => {
        error = err.response.data

        expect(TypeDetect(error)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(error).to.haveOwnProperty('statusCode')
        expect(error.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct error message
        expect(error).to.haveOwnProperty('errorMessage')
        expect(error.errorMessage).to.equal("No Label Key was specified in the 'label-key' header parameter")

        // Check if additionalMessages exists and is blank array
        expect(error).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(error.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Get Value By Label - Non-existant Label', (done) => {
    agilite.Keywords.getValueByLabel(key, "non-existant")
      .then((response) => {})
      .catch((err) => {
        error = err.response.data

        expect(TypeDetect(error)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(error).to.haveOwnProperty('statusCode')
        expect(error.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct error message
        expect(error).to.haveOwnProperty('errorMessage')
        expect(error.errorMessage).to.equal("Label Entry cannot be found - non-existant")

        // Check if additionalMessages exists and is blank array
        expect(error).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(error.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Get Value By Label', (done) => {
    agilite.Keywords.getValueByLabel(key, mainEntry.data.values[0].label)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)
        expect(response.data).to.equal(mainEntry.data.values[0].value)
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Delete Record - No Record ID', (done) => {
    agilite.Keywords.deleteData()
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
    agilite.Keywords.deleteData("test")
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

    agilite.Keywords.deleteData(recordId)
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
