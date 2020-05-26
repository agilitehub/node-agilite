'use strict'

const Enums = require('../utils/enums')
const Utils = require('../utils/utils.js')

class AdminSolutions {
  constructor (config) {
    this.apiServerUrl = null
    this.apiKey = null
    this.teamId = null

    this.outputFormat = {
      JSON: Enums.VALUE_JSON_LOWER,
      STRING: Enums.VALUE_STRING_LOWER
    }

    if (config) {
      this.apiServerUrl = config.apiServerUrl
      this.apiKey = config.apiKey
      this.teamId = config.teamId
    }
  }

  postData (data = {}) {
    const headers = {}

    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_ADMIN_SOLUTIONS, Enums.METHOD_POST, data, headers)
  }

  getData () {
    const headers = {}

    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_ADMIN_SOLUTIONS, Enums.METHOD_GET, null, headers)
  }

  putData (recordId = '', data = {}) {
    const headers = {}

    headers[Enums.HEADER_RECORD_ID] = recordId

    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_ADMIN_SOLUTIONS, Enums.METHOD_PUT, data, headers)
  }

  deleteData (recordId = '') {
    const headers = {}

    headers[Enums.HEADER_RECORD_ID] = recordId

    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_ADMIN_SOLUTIONS, Enums.METHOD_DELETE, null, headers)
  }
}

module.exports = AdminSolutions
