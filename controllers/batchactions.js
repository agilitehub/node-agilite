'use strict'

const Enums = require('../utils/enums')
const Utils = require('../utils/utils.js')

class BatchActions {
  constructor (config) {
    this.apiServerUrl = null
    this.apiKey = null
    this.teamId = null

    if (config) {
      this.apiServerUrl = config.apiServerUrl
      this.apiKey = config.apiKey
      this.teamId = config.teamId
    }
  }

  postData (data = {}) {
    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_BATCH_ACTIONS, Enums.METHOD_POST, data)
  }

  getData (profileKeys = [], recordIds = [], slimResult = true) {
    const headers = {}

    headers[Enums.HEADER_PROFILE_KEYS] = profileKeys.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_RECORD_IDS] = recordIds.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_SLIM_RESULT] = slimResult

    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_BATCH_ACTIONS, Enums.METHOD_GET, null, headers)
  }

  putData (recordId = '', data = {}) {
    const headers = {}
    headers[Enums.HEADER_RECORD_ID] = recordId

    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_BATCH_ACTIONS, Enums.METHOD_PUT, data, headers)
  }

  deleteData (recordId = '') {
    const headers = {}
    headers[Enums.HEADER_RECORD_ID] = recordId

    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_BATCH_ACTIONS, Enums.METHOD_DELETE, null, headers)
  }

  execute (profileKey = '', data = {}) {
    const config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BATCH_ACTIONS}/execute`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    config.headers[Enums.HEADER_CONTENT_TYPE] = Enums.HEADER_APPLICATION_JSON

    if (profileKey !== undefined && profileKey !== null) {
      config.headers[Enums.HEADER_PROFILE_KEY] = profileKey
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utils.executeRequest(config)
  }
}

module.exports = BatchActions