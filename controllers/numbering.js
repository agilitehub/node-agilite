'use strict'

const Enums = require('../utils/enums')
const Utils = require('../utils/utils.js')

class Numbering {
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
    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_NUMBERING, Enums.METHOD_POST, data)
  }

  getData (profileKeys = [], recordIds = [], slimResult = true) {
    let headers = {}

    headers[Enums.HEADER_PROFILE_KEYS] = profileKeys.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_RECORD_IDS] = recordIds.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_SLIM_RESULT] = slimResult

    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_NUMBERING, Enums.METHOD_GET, null, headers)
  }

  putData (recordId = '', data = {}) {
    let headers = {}
    headers[Enums.HEADER_RECORD_ID] = recordId

    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_NUMBERING, Enums.METHOD_PUT, data, headers)
  }

  deleteData (recordId = '') {
    let headers = {}
    headers[Enums.HEADER_RECORD_ID] = recordId

    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_NUMBERING, Enums.METHOD_DELETE, null, headers)
  }

  generate (profileKey = '', outputFormat = '', data = {}) {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_NUMBERING}/generate`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    config.headers[Enums.HEADER_CONTENT_TYPE] = Enums.HEADER_APPLICATION_JSON
    config.headers[Enums.HEADER_API_KEY] = this.apiKey

    config.headers[Enums.HEADER_PROFILE_KEY] = profileKey
    config.headers[Enums.HEADER_OUTPUT_FORMAT] = outputFormat

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utils.executeRequest(config)
  }

  resetCounters (recordId = '') {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_NUMBERING}/resetCounters`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    config.headers[Enums.HEADER_API_KEY] = this.apiKey
    config.headers[Enums.HEADER_RECORD_ID] = recordId

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utils.executeRequest(config)
  }
}

module.exports = Numbering
