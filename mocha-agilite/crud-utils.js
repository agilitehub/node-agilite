'use strict'

const EnumsTypeDetect = require('agilite-utils/enums-type-detect')

const MainCon = require('./controller')
const Enums = require('./enums')

// EXPORTS
exports.testsNegativeCreateRecord = (moduleKey, model) => {
  return new Promise((resolve, reject) => {
    (async () => {
      const result = []

      let requiredFound = false
      let method = null
      let type = null
      let data = null
      let errMsg = null
      let title = null
      let record = null

      try {
        // Generate generic negative tests for creating a new record
        method = Enums.requestTypes.POST
        type = Enums.testTypes.CREATE_POST_NEGATIVE
        errMsg = 'No \'data\' property found in JSON Body'

        title = 'Create Record - Undefined Body Content (Negative)'
        result.push({ title, type, method, moduleKey, errMsg })

        title = 'Create Record - Null Body Content (Negative)'
        data = null
        result.push({ title, type, method, moduleKey, data, errMsg })

        title = 'Create Record - Empty Body Content (Negative)'
        data = {}
        result.push({ title, type, method, moduleKey, data, errMsg })

        title = 'Create Record - Null Data Prop (Negative)'
        data = { data: null }
        result.push({ title, type, method, moduleKey, data, errMsg })

        // Next, we create tests based on required fields
        do {
          data = {}
          record = await _createSampleRecordNegative(data, model.properties.data.properties)
          requiredFound = record.requiredFound

          if (requiredFound) {
            data = { data: record.data }
            result.push({ title: record.title, type, method, moduleKey, data, errMsg: record.errMsg })
          }
        } while (requiredFound)

        // Return Tests
        resolve(result)
      } catch (e) {
        reject(e)
      }
    })()
  })
}

// PRIVATE FUNCTIONS
const _createSampleRecordNegative = (data, model) => {
  return new Promise((resolve, reject) => {
    const result = { requiredFound: false }

    try {
      // Create test based on required fields
      for (const prop in model) {
        if (model[prop].required) {
          if (!MainCon.getRequiredField(`${prop}_${Enums.values.UNDEFINED}`)) {
            result.title = `Create Record - Undefined '${prop}' Prop (Negative)`
            result.errMsg = `Invalid request body. '${prop}' property required`
            result.requiredFound = true
            MainCon.setRequiredField(`${prop}_${Enums.values.UNDEFINED}`)
            break
          } else if (!MainCon.getRequiredField(`${prop}_${model[prop].type}`)) {
            result.title = `Create Record - Invalid '${prop}' Prop (Negative)`
            result.errMsg = `Invalid request body. '${prop}' property required`
            result.requiredFound = true
            MainCon.setRequiredField(`${prop}_${model[prop].type}`)

            // Set prop to the opposite value based on type
            switch (model[prop].type) {
              case EnumsTypeDetect.STRING:
                data[prop] = 12345
                break
              case EnumsTypeDetect.BOOLEAN:
                data[prop] = 'test'
                break
              case EnumsTypeDetect.NUMBER:
                data[prop] = []
                break
            }

            break
          } else {
            // Set prop to the value based on type
            switch (model[prop].type) {
              case EnumsTypeDetect.STRING:
                data[prop] = 'test'
                break
              case EnumsTypeDetect.BOOLEAN:
                data[prop] = true
                break
              case EnumsTypeDetect.NUMBER:
                data[prop] = 12345
                break
            }
          }
        }
      }

      result.data = data

      resolve(result)
    } catch (e) {
      reject(e)
    }
  })
}
