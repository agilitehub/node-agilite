'use strict'

import {config} from 'dotenv'
config()

import TypeDetect from 'type-detect'
import UUID from 'uuid'
import {expect} from 'chai'
import * as Enums from '../utils/enums'
import Agilite from '../dist/controllers/agilite'
import EnumsTypeDetect from '../dist/utils/enums-type-detect'
import DataTemplate from '../dist/data-templates/keywords'

const agilite = new Agilite({
  apiServerUrl: process.env.API_SERVER_URL,
  apiKey: process.env.API_KEY
})

describe('Agilit-e Keywords', () => {
  let mainEntry: any = null
  let tmpEntry: any = null
  let recordId: any = null
  let key: any = UUID.v1()
  let groupName: any = UUID.v1()

  it('Create New Invalid Record - Empty Body Object', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyObject))

    agilite.Keywords.postData(mainEntry)
      .catch((err) => {
        if (err.response) {
          err = err.response.data
        } else if (err.message) {
          err = err.message
        }

        expect(TypeDetect(err)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(err).to.haveOwnProperty('statusCode')
        expect(err.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct err message
        expect(err).to.haveOwnProperty('errorMessage')
        expect(err.errorMessage).to.equal("No 'data' property found in JSON Body")

        // Check if additionalMessages exists and is blank array
        expect(err).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(err.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Create New Invalid Record - No Key', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyDataObject))

    agilite.Keywords.postData(mainEntry)
      .catch((err) => {
        if (err.response) {
          err = err.response.data
        } else if (err.message) {
          err = err.message
        }

        expect(TypeDetect(err)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(err).to.haveOwnProperty('statusCode')
        expect(err.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct err message
        expect(err).to.haveOwnProperty('errorMessage')
        expect(err.errorMessage).to.equal("Please provide a valid Profile 'key'")

        // Check if additionalMessages exists and is blank array
        expect(err).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(err.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Create New Invalid Record - No/Empty Values', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyValues))
    mainEntry.data.key = key

    agilite.Keywords.postData(mainEntry)
      .catch((err) => {
        if (err.response) {
          err = err.response.data
        } else if (err.message) {
          err = err.message
        }

        expect(TypeDetect(err)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(err).to.haveOwnProperty('statusCode')
        expect(err.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct err message
        expect(err).to.haveOwnProperty('errorMessage')
        expect(err.errorMessage).to.equal("At least 1 'values' JSON entry is required")

        // Check if additionalMessages exists and is blank array
        expect(err).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(err.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Create New Invalid Record - Invalid Values Array Entry', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.invalidValues.invalidObject))
    mainEntry.data.key = key

    agilite.Keywords.postData(mainEntry)
      .catch((err) => {
        if (err.response) {
          err = err.response.data
        } else if (err.message) {
          err = err.message
        }

        expect(TypeDetect(err)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(err).to.haveOwnProperty('statusCode')
        expect(err.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct err message
        expect(err).to.haveOwnProperty('errorMessage')
        expect(err.errorMessage).to.equal("Please provide a valid 'label' property in the 'values' entry")

        // Check if additionalMessages exists and is blank array
        expect(err).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(err.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Create New Invalid Record - Invalid Label Property', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.invalidValues.invalidLabel))
    mainEntry.data.key = key

    agilite.Keywords.postData(mainEntry)
      .then((response) => {})
      .catch((err) => {
        if (err.response) {
          err = err.response.data
        } else if (err.message) {
          err = err.message
        }

        expect(TypeDetect(err)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(err).to.haveOwnProperty('statusCode')
        expect(err.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct err message
        expect(err).to.haveOwnProperty('errorMessage')
        expect(err.errorMessage).to.equal("Please provide a valid 'label' property in the 'values' entry")

        // Check if additionalMessages exists and is blank array
        expect(err).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(err.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Create New Invalid Record - Invalid Value Property', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.invalidValues.invalidValue))
    mainEntry.data.key = key

    agilite.Keywords.postData(mainEntry)
      .then((response) => {})
      .catch((err) => {
        if (err.response) {
          err = err.response.data
        } else if (err.message) {
          err = err.message
        }

        expect(TypeDetect(err)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(err).to.haveOwnProperty('statusCode')
        expect(err.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct err message
        expect(err).to.haveOwnProperty('errorMessage')
        expect(err.errorMessage).to.equal("Please provide a valid 'value' property in the 'values' entry")

        // Check if additionalMessages exists and is blank array
        expect(err).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(err.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
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
      .catch((err) => {
        if (err.response) {
          err = err.response.data
        } else if (err.message) {
          err = err.message
        }

        expect(TypeDetect(err)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(err).to.haveOwnProperty('statusCode')
        expect(err.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct err message
        expect(err).to.haveOwnProperty('errorMessage')
        expect(err.errorMessage).to.equal("No 'data' property found in JSON Body")

        // Check if additionalMessages exists and is blank array
        expect(err).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(err.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Update Record - No Key', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyDataObject))

    agilite.Keywords.putData(recordId, mainEntry)
      .catch((err) => {
        if (err.response) {
          err = err.response.data
        } else if (err.message) {
          err = err.message
        }

        expect(TypeDetect(err)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(err).to.haveOwnProperty('statusCode')
        expect(err.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct err message
        expect(err).to.haveOwnProperty('errorMessage')
        expect(err.errorMessage).to.equal("Please provide a valid Profile 'key'")

        // Check if additionalMessages exists and is blank array
        expect(err).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(err.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Update Record - No/Empty Values', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyValues))
    mainEntry.data.key = key

    agilite.Keywords.putData(recordId, mainEntry)
      .catch((err) => {
        if (err.response) {
          err = err.response.data
        } else if (err.message) {
          err = err.message
        }

        expect(TypeDetect(err)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(err).to.haveOwnProperty('statusCode')
        expect(err.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct err message
        expect(err).to.haveOwnProperty('errorMessage')
        expect(err.errorMessage).to.equal("At least 1 'values' JSON entry is required")

        // Check if additionalMessages exists and is blank array
        expect(err).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(err.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Update Record - Invalid Values Array Entry', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.invalidValues.invalidObject))
    mainEntry.data.key = key

    agilite.Keywords.putData(recordId, mainEntry)
      .then((response) => {})
      .catch((err) => {
        if (err.response) {
          err = err.response.data
        } else if (err.message) {
          err = err.message
        }

        expect(TypeDetect(err)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(err).to.haveOwnProperty('statusCode')
        expect(err.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct err message
        expect(err).to.haveOwnProperty('errorMessage')
        expect(err.errorMessage).to.equal("Please provide a valid 'label' property in the 'values' entry")

        // Check if additionalMessages exists and is blank array
        expect(err).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(err.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Update Record - Invalid Label Property', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.invalidValues.invalidLabel))
    mainEntry.data.key = key

    agilite.Keywords.putData(recordId, mainEntry)
      .catch((err) => {
        if (err.response) {
          err = err.response.data
        } else if (err.message) {
          err = err.message
        }

        expect(TypeDetect(err)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(err).to.haveOwnProperty('statusCode')
        expect(err.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct err message
        expect(err).to.haveOwnProperty('errorMessage')
        expect(err.errorMessage).to.equal("Please provide a valid 'label' property in the 'values' entry")

        // Check if additionalMessages exists and is blank array
        expect(err).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(err.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Update Record - Invalid Value Property', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.invalidValues.invalidValue))
    mainEntry.data.key = key

    agilite.Keywords.putData(recordId, mainEntry)
      .catch((err) => {
        if (err.response) {
          err = err.response.data
        } else if (err.message) {
          err = err.message
        }

        expect(TypeDetect(err)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(err).to.haveOwnProperty('statusCode')
        expect(err.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct err message
        expect(err).to.haveOwnProperty('errorMessage')
        expect(err.errorMessage).to.equal("Please provide a valid 'value' property in the 'values' entry")

        // Check if additionalMessages exists and is blank array
        expect(err).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(err.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Update Record - No Record ID', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.modified))
    mainEntry.data.key = key

    agilite.Keywords.putData(undefined, mainEntry)
      .catch((err) => {
        if (err.response) {
          err = err.response.data
        } else if (err.message) {
          err = err.message
        }

        expect(TypeDetect(err)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(err).to.haveOwnProperty('statusCode')
        expect(err.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct err message
        expect(err).to.haveOwnProperty('errorMessage')
        expect(err.errorMessage).to.equal("No Id was specified in the 'record-id' header parameter")

        // Check if additionalMessages exists and is blank array
        expect(err).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(err.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Update Record - Non-existant Record ID', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.modified))
    mainEntry.data.key = key

    agilite.Keywords.putData("test", mainEntry)
      .then((response) => {})
      .catch((err) => {
        if (err.response) {
          err = err.response.data
        } else if (err.message) {
          err = err.message
        }

        expect(TypeDetect(err)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(err).to.haveOwnProperty('statusCode')
        expect(err.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct err message
        expect(err).to.haveOwnProperty('errorMessage')
        expect(err.errorMessage).to.equal("Record with id: 'test' cannot be found")

        // Check if additionalMessages exists and is blank array
        expect(err).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(err.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
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
      .catch((err) => {
        if (err.response) {
          err = err.response.data
        } else if (err.message) {
          err = err.message
        }

        expect(TypeDetect(err)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(err).to.haveOwnProperty('statusCode')
        expect(err.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct err message
        expect(err).to.haveOwnProperty('errorMessage')
        expect(err.errorMessage).to.equal("No Profile Key was specified in the 'profile-key' header parameter")

        // Check if additionalMessages exists and is blank array
        expect(err).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(err.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Get By Profile Key - Non-existant Profile Key', (done) => {
    agilite.Keywords.getByProfileKey("non-existant")
      .catch((err) => {
        if (err.response) {
          err = err.response.data
        } else if (err.message) {
          err = err.message
        }

        expect(TypeDetect(err)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(err).to.haveOwnProperty('statusCode')
        expect(err.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct err message
        expect(err).to.haveOwnProperty('errorMessage')
        expect(err.errorMessage).to.equal("Active Keyword Profile cannot be found - non-existant")

        // Check if additionalMessages exists and is blank array
        expect(err).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(err.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
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
      .catch((err) => {
        if (err.response) {
          err = err.response.data
        } else if (err.message) {
          err = err.message
        }

        expect(TypeDetect(err)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(err).to.haveOwnProperty('statusCode')
        expect(err.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct err message
        expect(err).to.haveOwnProperty('errorMessage')
        expect(err.errorMessage).to.equal("No value was specified in the 'group-name' header parameter")

        // Check if additionalMessages exists and is blank array
        expect(err).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(err.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Get Profile Keys by Group - Non-existant Group Name', (done) => {
    agilite.Keywords.getProfileKeysByGroup("non-existant")
      .catch((err) => {
        if (err.response) {
          err = err.response.data
        } else if (err.message) {
          err = err.message
        }

        expect(TypeDetect(err)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(err).to.haveOwnProperty('statusCode')
        expect(err.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct err message
        expect(err).to.haveOwnProperty('errorMessage')
        expect(err.errorMessage).to.equal("Active Keyword Profiles cannot be found for Group - non-existant")

        // Check if additionalMessages exists and is blank array
        expect(err).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(err.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
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
      .catch((err) => {
        if (err.response) {
          err = err.response.data
        } else if (err.message) {
          err = err.message
        }

        expect(TypeDetect(err)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(err).to.haveOwnProperty('statusCode')
        expect(err.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct err message
        expect(err).to.haveOwnProperty('errorMessage')
        expect(err.errorMessage).to.equal("No Value Key was specified in the 'value-key' header parameter")

        // Check if additionalMessages exists and is blank array
        expect(err).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(err.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Get Label By Value - Non-existant Value', (done) => {
    agilite.Keywords.getLabelByValue(key, "non-existant")
      .catch((err) => {
        if (err.response) {
          err = err.response.data
        } else if (err.message) {
          err = err.message
        }

        expect(TypeDetect(err)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(err).to.haveOwnProperty('statusCode')
        expect(err.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct err message
        expect(err).to.haveOwnProperty('errorMessage')
        expect(err.errorMessage).to.equal("Value Entry cannot be found - non-existant")

        // Check if additionalMessages exists and is blank array
        expect(err).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(err.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
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
      .catch((err) => {
        if (err.response) {
          err = err.response.data
        } else if (err.message) {
          err = err.message
        }

        expect(TypeDetect(err)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(err).to.haveOwnProperty('statusCode')
        expect(err.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct err message
        expect(err).to.haveOwnProperty('errorMessage')
        expect(err.errorMessage).to.equal("No Label Key was specified in the 'label-key' header parameter")

        // Check if additionalMessages exists and is blank array
        expect(err).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(err.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Get Value By Label - Non-existant Label', (done) => {
    agilite.Keywords.getValueByLabel(key, "non-existant")
      .catch((err) => {
        if (err.response) {
          err = err.response.data
        } else if (err.message) {
          err = err.message
        }

        expect(TypeDetect(err)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(err).to.haveOwnProperty('statusCode')
        expect(err.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct err message
        expect(err).to.haveOwnProperty('errorMessage')
        expect(err.errorMessage).to.equal("Label Entry cannot be found - non-existant")

        // Check if additionalMessages exists and is blank array
        expect(err).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(err.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
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
      .catch((err) => {
        if (err.response) {
          err = err.response.data
        } else if (err.message) {
          err = err.message
        }

        expect(TypeDetect(err)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(err).to.haveOwnProperty('statusCode')
        expect(err.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct err message
        expect(err).to.haveOwnProperty('errorMessage')
        expect(err.errorMessage).to.equal("No Id was specified in the 'record-id' header parameter")

        // Check if additionalMessages exists and is blank array
        expect(err).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(err.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Delete Record - Non-existant Record ID', (done) => {
    agilite.Keywords.deleteData("test")
      .catch((err) => {
        if (err.response) {
          err = err.response.data
        } else if (err.message) {
          err = err.message
        }

        expect(TypeDetect(err)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if statusCode exists and contains correct value
        expect(err).to.haveOwnProperty('statusCode')
        expect(err.statusCode).to.equal(400)

        // Check if errorMessage exists and contains correct err message
        expect(err).to.haveOwnProperty('errorMessage')
        expect(err.errorMessage).to.equal("Record with id: 'test' cannot be found")

        // Check if additionalMessages exists and is blank array
        expect(err).to.haveOwnProperty('additionalMessages')
        expect(TypeDetect(err.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)
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
