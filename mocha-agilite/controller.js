'use strict'

const expect = require('chai').expect
const TypeDetect = require('agilite-utils/type-detect')
const EnumsTypeDetect = require('agilite-utils/enums-type-detect')
const CrudUtils = require('./crud-utils')
const Enums = require('./enums')

// GLOBALS
const requiredFields = {}
const memoryStore = {}

// EXPORTS
exports.init = (moduleKey, hasCRUDOperations, model) => {
  return new Promise((resolve, reject) => {
    (async () => {
      const result = []
      let tmpData = null

      try {
        // Generate Tests if includes CRUD Operations
        if (hasCRUDOperations) {
          tmpData = await CrudUtils.testsNegativeCreateRecord(moduleKey, model)
          result.push(...tmpData)

          // Return Tests
          resolve(result)
        }
      } catch (e) {
        reject(e)
      }
    })()
  })
}

exports.execute = (test, agilite) => {
  it(`-- AUTO: ${test.title}`, (done) => { // eslint-disable-line
    switch (test.type) {
      case Enums.testTypes.CREATE_POST_NEGATIVE:
        agilite.executeCRUDRequest(test.moduleKey, test.method, test.data, test.headers)
          .catch(err => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(Enums.statusCodes.ERROR)
            expect(err.response).to.haveOwnProperty('data')
            expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)
            expect(err.response.data).to.haveOwnProperty('additionalMessages')
            expect(TypeDetect(err.response.data.additionalMessages)).to.equal(EnumsTypeDetect.ARRAY)

            // Check if errorMessage exists and contains correct error message
            expect(err.response.data).to.haveOwnProperty('errorMessage')
            expect(TypeDetect(err.response.data.errorMessage)).to.equal(EnumsTypeDetect.STRING)
            expect(err.response.data.errorMessage).to.equal(test.errMsg)
          })
          .then(done, done)
        break
      default: // Execution APIs
    }
  })
}

exports.getMemoryStore = (key) => {
  return memoryStore[key]
}

exports.setMemoryStore = (key, value) => {
  memoryStore[key] = value
}

exports.getRequiredField = (key) => {
  return requiredFields[key]
}

exports.setRequiredField = (key) => {
  requiredFields[key] = true
}
