'use strict'

const TypeDetect = require('agilite-utils/type-detect')
const EnumsTypeDetect = require('agilite-utils/enums-type-detect')
const expect = require('chai').expect

exports.init = (moduleKey, hasCRUDOperations, model) => {
  return new Promise((resolve, reject) => {
    (async () => {
      const result = []
      let tmpData = null

      try {
        // Generate Tests if includes CRUD Operations
        if (hasCRUDOperations) {
          tmpData = await _testsCRUDNegativeCreateRecord(moduleKey)
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
  it(test.title, (done) => { // eslint-disable-line
    switch (test.type) {
      case 'crud':
        agilite.executeCRUDRequest(test.moduleKey, test.method, test.data, test.headers)
          .catch(err => {
            expect(err).to.haveOwnProperty('response')
            expect(err.response.status).to.equal(400)
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

// PRIVATE FUNCTIONS
const _testsCRUDNegativeCreateRecord = (moduleKey) => {
  return new Promise((resolve, reject) => {
    const result = []

    let method = null
    let type = null
    let data = null
    let errMsg = null
    let title = null

    try {
      // Generate generic negative tests for creating a new record
      method = 'post'
      type = 'crud'
      errMsg = 'No \'data\' property found in JSON Body'

      // First we post undefined data
      title = 'Create Record - Undefined Data (Negative)'
      result.push({ title, type, method, moduleKey })

      // Next, we post null data
      title = 'Create Record - Null Data (Negative)'
      data = null
      result.push({ title, type, method, moduleKey, data })

      // Next, we post empty object
      title = 'Create Record - Empty Data (Negative)'
      data = {}
      result.push({ title, type, method, moduleKey, data, errMsg })

      // Return Tests
      resolve(result)
    } catch (e) {
      reject(e)
    }
  })
}
