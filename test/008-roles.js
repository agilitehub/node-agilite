'use strict'

require('dotenv').config()
const UUID = require('uuid')
const TypeDetect = require('type-detect')
const expect = require('chai').expect
const Agilite = require('../controllers/agilite')
const Enums = require('../utils/enums')
const DataTemplate = require('../data-templates/roles')

const agilite = new Agilite({
  apiServerUrl: process.env.API_SERVER_URL,
  apiKey: process.env.API_KEY
})

describe('Agilit-e Roles', () => {
  let mainEntry = null
  let tmpEntry = null
  let recordId = null
  let key = UUID.v1()
  let groupName = UUID.v1()
  let processKey = UUID.v1()
  let bpmRecordId = UUID.v1()
  let roleName = UUID.v1()

  it('Create New Record', (done) => {
    mainEntry = JSON.parse(JSON.stringify(DataTemplate.new))
    mainEntry.data.name = key

    agilite.Roles.postData(mainEntry)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_OBJECT_PROPER)

        // Check if Optional Fields exists
        expect(response.data.data).to.haveOwnProperty('isActive')
        expect(response.data.data).to.haveOwnProperty('isHidden')
        expect(response.data.data).to.haveOwnProperty('description')
        expect(response.data.data).to.haveOwnProperty('groupName')
        expect(response.data.data).to.haveOwnProperty('surrogateUser')
        expect(response.data.data).to.haveOwnProperty('levels')

        // Compare Values to confirm that data passed is the same as the data returned
        expect(response.data.data.name).to.equal(mainEntry.data.name)
        expect(response.data.data.responsibleUser.length).to.equal(1)

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

    agilite.Roles.getData()
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
    key = 'PUT_' + key

    mainEntry = JSON.parse(JSON.stringify(DataTemplate.modified1))
    mainEntry.data.name = key
    mainEntry.data.groupName = groupName

    agilite.Roles.putData(recordId, mainEntry)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_OBJECT_PROPER)

        // Check if GroupName exists and contains passed value
        expect(response.data.data).to.haveOwnProperty('groupName')
        expect(response.data.data.groupName).to.equal(mainEntry.data.groupName)
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Delete Record', (done) => {
    expect(recordId).to.not.equal(null)

    agilite.Roles.deleteData(recordId)
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_OBJECT_PROPER)
        expect(JSON.stringify(response.data)).to.equal('{}')
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Assign Role', (done) => {
    agilite.Roles.assignRole(processKey, bpmRecordId, roleName, 'roles.current@acme.com', ['roles.resp1@acme.com', 'roles.resp2@acme.com'])
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_OBJECT_PROPER)
        expect(response.data).to.haveOwnProperty('hasChanged')
        expect(response.data).to.haveOwnProperty('id')

        // Store Record Id to be used later
        recordId = response.data.id

      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Get Assigned Roles', (done) => {
    agilite.Roles.getAssignedRoles(processKey, bpmRecordId, [roleName])
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_ARRAY_PROPER)
        expect(response.data.length).to.be.equal(1)

        tmpEntry = response.data[0]
        expect(tmpEntry).to.haveOwnProperty('name')
        expect(tmpEntry).to.haveOwnProperty('users')
        expect(tmpEntry.users.length).to.be.equal(2)
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Get Role', (done) => {
    agilite.Roles.getRole([roleName], [processKey, bpmRecordId])
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_OBJECT_PROPER)

        expect(response.data).to.haveOwnProperty('roleIds')
        expect(response.data.roleIds.length).to.be.equal(1)
        expect(response.data).to.haveOwnProperty('responsibleUsers')
        expect(response.data.responsibleUsers.length).to.be.equal(2)
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Change Conditional Levels', (done) => {
    agilite.Roles.changeConditionalLevels(recordId, [bpmRecordId])
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_OBJECT_PROPER)
        expect(JSON.stringify(response.data)).to.be.equal('{}')
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Re-Assign Responsible Person', (done) => {
    agilite.Roles.reAssignResponsibleUser(recordId, 'roles.resp3@acme.com')
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_OBJECT_PROPER)
        expect(JSON.stringify(response.data)).to.be.equal('{}')
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Get Role 2', (done) => {
    agilite.Roles.getRole([roleName], [bpmRecordId])
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(Enums.VALUE_OBJECT_PROPER)

        expect(response.data).to.haveOwnProperty('roleIds')
        expect(response.data.roleIds.length).to.be.equal(1)
        expect(response.data).to.haveOwnProperty('responsibleUsers')
        expect(response.data.responsibleUsers.length).to.be.equal(1)
        expect(response.data.responsibleUsers[0]).to.be.equal('roles.resp3@acme.com')
      })
      //  .catch((err) => {
      //      console.log(err.response.data)
      //  })
      .then(done, done)
  })

  it('Delete Assigned Role Record', (done) => {
    expect(recordId).to.not.equal(null)

    agilite.Roles.deleteData(recordId)
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
