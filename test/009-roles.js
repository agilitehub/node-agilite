'use strict'

require('agilite-utils/dotenv').config()
const UUID = require('agilite-utils/uuid')
const TypeDetect = require('agilite-utils/type-detect')
const expect = require('chai').expect
const Agilite = require('../controllers/agilite')
const EnumsTypeDetect = require('agilite-utils/enums-type-detect')
const Enums = require('../utils/enums')
const DataTemplate = require('../data-templates/roles')

const agilite = new Agilite({
  apiServerUrl: process.env.API_SERVER_URL,
  apiKey: process.env.API_KEY
})

describe('Agilit-e Roles', () => {
  const groupName = UUID.v1()
  const invalidValue = 'invalid_value'

  let mainEntry = null
  let tmpEntry = null
  let recordId = null
  let name = UUID.v1()

  it('Create New Record - No Params (Negative)', (done) => {
    agilite.Roles.postData()
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

    agilite.Roles.postData(mainEntry)
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

  it('Create New Record - No Role Name (Negative)', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyDataObject))

    agilite.Roles.postData(mainEntry)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('Please provide a Role \'name\'')
      })
      .then(done, done)
  })

  it('Create New Record - Success', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.new))
    mainEntry.data.name = name

    agilite.Roles.postData(mainEntry)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if provided values match
        expect(response.data.data).to.haveOwnProperty('name')
        expect(response.data.data.name).to.equal(name)

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

  it('Get Data - Slim Result - Find Record By Id - Success', (done) => {
    agilite.Roles.getData()
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
    agilite.Roles.putData()
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

  it('Update Existing Record - No Data Param (Negative)', (done) => {
    agilite.Roles.putData(recordId)
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

  it('Update Existing Record - Empty Object Data Param (Negative)', (done) => {
    agilite.Roles.putData(recordId, {})
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

    agilite.Roles.putData(recordId, mainEntry)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('Please provide a Role \'name\'')
      })
      .then(done, done)
  })

  it('Update Existing Record - Success', (done) => {
    name = 'PUT_' + name
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.modified1))
    mainEntry.data.name = name
    mainEntry.data.groupName = groupName

    agilite.Roles.putData(recordId, mainEntry)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if provided values match
        expect(response.data.data).to.haveOwnProperty('name')
        expect(response.data.data.name).to.equal(name)
        expect(response.data.data).to.haveOwnProperty('groupName')
        expect(response.data.data.groupName).to.equal(groupName)
        expect(response.data.data).to.haveOwnProperty('responsibleUser')
        expect(response.data.data.responsibleUser[0]).to.equal(DataTemplate.modified1.data.responsibleUser[0])
        expect(response.data.data).to.haveOwnProperty('surrogateUser')
        expect(response.data.data.surrogateUser).to.equal(DataTemplate.modified1.data.surrogateUser)
        expect(response.data.data).to.haveOwnProperty('levels')
        expect(response.data.data.levels[0]).to.equal(DataTemplate.modified1.data.levels[0])

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

  it('Get Role - No Params (Negative)', (done) => {
    agilite.Roles.getRole()
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal(`No Role Name(s) were specified in the 'role-names' header parameter`)
      })
      .then(done, done)
  })

  it('Get Role - Null Conditional Levels & Data - Success', (done) => {
    agilite.Roles.getRole([name], null, null)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
        expect(response.data).to.haveOwnProperty('roleIds')
        expect(TypeDetect(response.data.roleIds)).to.equal(EnumsTypeDetect.ARRAY)
        expect(response.data).to.haveOwnProperty('responsibleUsers')
        expect(TypeDetect(response.data.responsibleUsers)).to.equal(EnumsTypeDetect.ARRAY)
      })
      .then(done, done)
  })

  it('Assign Role - No Params (Negative)', (done) => {
    agilite.Roles.assignRole()
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal(`No BPM Process Key was specified in the 'process-key' header parameter`)
      })
      .then(done, done)
  })

  it('Assign Role - No BPM Record Id (Negative)', (done) => {
    agilite.Roles.assignRole(invalidValue)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal(`No Id was specified in the 'bpm-record-id' header parameter`)
      })
      .then(done, done)
  })

  it('Assign Role - No Current User (Negative)', (done) => {
    agilite.Roles.assignRole(invalidValue, invalidValue)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal(`No Current User was specified in the 'current-user' header parameter`)
      })
      .then(done, done)
  })

  it('Assign Role - No Responsible Users (Negative)', (done) => {
    agilite.Roles.assignRole(invalidValue, invalidValue, null, invalidValue)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal(`No Responsible Users were specified in the 'responsible-users' header parameter`)
      })
      .then(done, done)
  })

  it('Assign Role - Success', (done) => {
    agilite.Roles.assignRole(invalidValue, invalidValue, name, name, DataTemplate.new.data.responsibleUser)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
        expect(response.data).to.haveOwnProperty('hasChanged')
        expect(TypeDetect(response.data.hasChanged)).to.equal(EnumsTypeDetect.BOOLEAN)
        expect(response.data).to.haveOwnProperty('id')
        expect(TypeDetect(response.data.id)).to.equal(EnumsTypeDetect.STRING)
      })
      .then(done, done)
  })

  it('Get Assigned Roles - No Params (Negative)', (done) => {
    agilite.Roles.getAssignedRoles()
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal(`No BPM Process Key was specified in the 'process-key' header parameter`)
      })
      .then(done, done)
  })

  it('Get Assigned Roles - No BPM Record Id (Negative)', (done) => {
    agilite.Roles.getAssignedRoles(invalidValue)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal(`No Id was specified in the 'bpm-record-id' header parameter`)
      })
      .then(done, done)
  })

  it('Get Assigned Roles - Success', (done) => {
    agilite.Roles.getAssignedRoles(invalidValue, invalidValue)
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

  it('Change Conditional Levels - No Params (Negative)', (done) => {
    agilite.Roles.changeConditionalLevels()
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal(`No Id was specified in the 'record-id' header parameter`)
      })
      .then(done, done)
  })

  it('Change Conditional Levels - No Conditional Levels - Success', (done) => {
    agilite.Roles.changeConditionalLevels(recordId)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
      })
      .then(done, done)
  })

  it('Change Conditional Levels - Success', (done) => {
    agilite.Roles.changeConditionalLevels(recordId, DataTemplate.new.data.responsibleUser)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
      })
      .then(done, done)
  })

  it('Reassign Responsible User - No Params (Negative)', (done) => {
    agilite.Roles.reAssignResponsibleUser()
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal(`No User was specified in the 'responsible-user' header parameter`)
      })
      .then(done, done)
  })

  it('Reassign Responsible User - No Responsible User (Negative)', (done) => {
    agilite.Roles.reAssignResponsibleUser(recordId)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal(`No User was specified in the 'responsible-user' header parameter`)
      })
      .then(done, done)
  })

  it('Reassign Responsible User - Success', (done) => {
    agilite.Roles.reAssignResponsibleUser(recordId, DataTemplate.new.data.responsibleUser[0])
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
      })
      .then(done, done)
  })

  it('Delete Record - No Record Id (Negative)', (done) => {
    agilite.Roles.deleteData()
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
    agilite.Roles.deleteData(invalidValue)
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
    agilite.Roles.deleteData(recordId)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
        expect(JSON.stringify(response.data)).to.equal('{}')
      })
      .then(done, done)
  })
})
