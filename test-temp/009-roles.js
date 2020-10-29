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

describe('Agilit-e Roles \n', () => {
  const groupName = UUID.v1()
  const invalidValue = 'invalid_value'

  let mainEntry = null
  let tmpEntry = null
  let recordId = null
  let name = UUID.v1()

  describe('Create New Record', () => {
    describe('Negative Tests', () => {
      it('No Params (Negative)', (done) => {
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

      it('Empty Object (Negative)', (done) => {
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

      it('No Role Name (Negative)', (done) => {
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyDataObject))

        agilite.Roles.postData(mainEntry)
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
    })
  })

  describe('Get Data', () => {
    describe('Negative Tests', () => {
    })

    describe('Positive Test', () => {
      it('Slim Result - Find Record By Id - Success', (done) => {
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
    })
  })

  describe('Update Existing Record', () => {
    describe('Negative Tests', () => {
      it('No Params (Negative)', (done) => {
        agilite.Roles.putData()
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

      it('Empty Object Data Param (Negative)', (done) => {
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

      it('No Profile Key (Negative)', (done) => {
        mainEntry = JSON.parse(JSON.stringify(DataTemplate.emptyDataObject))

        agilite.Roles.putData(recordId, mainEntry)
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
    })
  })

  describe('Get Role', () => {
    describe('Negative Tests', () => {
      it('No Params (Negative)', (done) => {
        agilite.Roles.getRole()
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Validation Failed. \'role-names\' Header parameter required')
          })
          .then(done, done)
      })
    })

    describe('Positive Test', () => {
      it('Null Conditional Levels & Data - Success', (done) => {
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
    })
  })

  describe('Change Conditional Levels', () => {
    describe('Negative Tests', () => {
      it('No Params (Negative)', (done) => {
        agilite.Roles.changeConditionalLevels()
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
    })

    describe('Positive Tests', () => {
      it('No Conditional Levels - Success', (done) => {
        agilite.Roles.changeConditionalLevels(recordId, [])
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
          })
          .then(done, done)
      })

      it('Success', (done) => {
        agilite.Roles.changeConditionalLevels(recordId, DataTemplate.modified.data.levels)
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
          })
          .then(done, done)
      })
    })
  })

  describe('Reassign Responsible User', () => {
    describe('Negative Tests', () => {
      it('No Params (Negative)', (done) => {
        agilite.Roles.reAssignResponsibleUser()
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

      it('No Responsible User (Negative)', (done) => {
        agilite.Roles.reAssignResponsibleUser(recordId)
          .catch((err) => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(err.response.data.errorMessage).to.equal('Validation Failed. \'responsible-user\' Header parameter required')
          })
          .then(done, done)
      })
    })

    describe('Positive Test', () => {
      it('Reassign Responsible User - Success', (done) => {
        agilite.Roles.reAssignResponsibleUser(recordId, DataTemplate.new.data.responsibleUser[0])
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
          })
          .then(done, done)
      })
    })
  })

  describe('Delete Record', () => {
    describe('Negative Tests', () => {
      it('No Record Id (Negative)', (done) => {
        agilite.Roles.deleteData()
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

      it('Invalid Record Id (Negative)', (done) => {
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
    })

    describe('Positive Test', () => {
      it('Success', (done) => {
        agilite.Roles.deleteData(recordId)
          .then((response) => {
            expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
            expect(JSON.stringify(response.data)).to.equal('{}')
          })
          .then(done, done)
      })
    })
  })
})
