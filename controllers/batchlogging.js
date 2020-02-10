'use strict'

const Enums = require('../utils/enums')
const Utils = require('../utils/utils.js')

class BatchLogging {
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

  postData (data = {}, logProcessId = null) {
    let headers = {}

    if (logProcessId !== undefined && logProcessId !== null) {
      headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    }

    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_BATCH_LOGGING, Enums.METHOD_POST, data, headers)
  }

  getData (profileKeys = [], recordIds = [], slimResult = true, logProcessId = null) {
    let headers = {}

    headers[Enums.HEADER_PROFILE_KEYS] = profileKeys.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_RECORD_IDS] = recordIds.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_SLIM_RESULT] = slimResult

    if (logProcessId !== undefined && logProcessId !== null) {
      headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    }

    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_BATCH_LOGGING, Enums.METHOD_GET, null, headers)
  }

  putData (recordId = '', data = {}, logProcessId = null) {
    let headers = {}
    headers[Enums.HEADER_RECORD_ID] = recordId

    if (logProcessId !== undefined && logProcessId !== null) {
      headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    }

    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_BATCH_LOGGING, Enums.METHOD_PUT, data, headers)
  }

  deleteData (recordId = '', logProcessId = null) {
    let headers = {}
    headers[Enums.HEADER_RECORD_ID] = recordId

    if (logProcessId !== undefined && logProcessId !== null) {
      headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    }

    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_BATCH_LOGGING, Enums.METHOD_DELETE, null, headers)
  }

  getByProfileKey (profileKey = '', logProcessId = null) {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BATCH_LOGGING}/getByProfileKey`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessId !== undefined && logProcessId !== null) {
      config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    }

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

  initLogProcess (profileKey = '', logProcessId = null) {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BATCH_LOGGING}/initLogProcess`,
      method: Enums.METHOD_POST,
      headers: {}
    }

    if (logProcessId !== undefined && logProcessId !== null) {
      config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    }

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

  completeLogProcess (logProcessId = '') {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BATCH_LOGGING}/completeLogProcess`,
      method: Enums.METHOD_POST,
      headers: {}
    }

    if (logProcessId !== undefined && logProcessId !== null) {
      config.headers['log-process-id'] = logProcessId
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utils.executeRequest(config)
  }

  createLogEntry (logProcessId = '') {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BATCH_LOGGING}/createLogEntry`,
      method: Enums.METHOD_POST,
      headers: {}
    }

    if (logProcessId !== undefined && logProcessId !== null) {
      config.headers['log-process-id'] = logProcessId
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utils.executeRequest(config)
  }

  generateLogProcessReport (logProcessId = '') {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BATCH_LOGGING}/report`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessId !== undefined && logProcessId !== null) {
      config.headers['log-process-id'] = logProcessId
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

module.exports = BatchLogging
