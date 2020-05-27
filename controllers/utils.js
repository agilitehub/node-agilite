'use strict'

const Enums = require('../utils/enums')
const Utilities = require('../utils/utils.js')

class Utils {
  constructor (config) {
    this.apiServerUrl = null
    this.apiKey = null
    this.teamId = null

    this.responseType = {
      ARRAY_BUFFER: 'arraybuffer',
      BLOB: 'blob',
      DOCUMENT: 'document',
      JSON: 'json',
      TEXT: 'text',
      STREAM: 'stream'
    }

    if (config) {
      this.apiServerUrl = config.apiServerUrl
      this.apiKey = config.apiKey
      this.teamId = config.teamId
    }
  }

  encodeXML (data = '', logProcessId = null) {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_UTILS}/encodeXML`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    config.headers[Enums.HEADER_CONTENT_TYPE] = Enums.HEADER_TEXT_PLAIN

    if (logProcessId !== undefined && logProcessId !== null) {
      config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utilities.executeRequest(config)
  }

  decodeXML (data = '', logProcessId = null) {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_UTILS}/decodeXML`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    config.headers[Enums.HEADER_CONTENT_TYPE] = Enums.HEADER_TEXT_PLAIN

    if (logProcessId !== undefined && logProcessId !== null) {
      config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utilities.executeRequest(config)
  }

  XMLToJS (data = '', logProcessId = null) {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_UTILS}/XMLToJS`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    config.headers[Enums.HEADER_CONTENT_TYPE] = Enums.HEADER_TEXT_PLAIN

    if (logProcessId !== undefined && logProcessId !== null) {
      config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utilities.executeRequest(config)
  }

  JSToXML (data = {}, logProcessId = null) {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_UTILS}/JSToXML`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    config.headers[Enums.HEADER_CONTENT_TYPE] = Enums.HEADER_APPLICATION_JSON

    if (logProcessId !== undefined && logProcessId !== null) {
      config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utilities.executeRequest(config)
  }

  html2json (data = '', logProcessId = null) {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_UTILS}/html2json`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    config.headers[Enums.HEADER_CONTENT_TYPE] = Enums.HEADER_TEXT_PLAIN

    if (logProcessId !== undefined && logProcessId !== null) {
      config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utilities.executeRequest(config)
  }

  jsonDiff (data = '', logProcessId = null) {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_UTILS}/jsonDiff`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    config.headers[Enums.HEADER_CONTENT_TYPE] = Enums.HEADER_APPLICATION_JSON

    if (logProcessId !== undefined && logProcessId !== null) {
      config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utilities.executeRequest(config)
  }

  generateOCR (recordId, logProcessId = null) {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_UTILS}/generateOCR`,
      method: Enums.METHOD_POST,
      headers: {}
    }

    config.headers[Enums.HEADER_CONTENT_TYPE] = Enums.HEADER_APPLICATION_JSON

    if (logProcessId !== undefined && logProcessId !== null) {
      config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    if (recordId !== undefined && recordId !== null) {
      config.headers[Enums.HEADER_RECORD_ID] = recordId
    }

    return Utilities.executeRequest(config)
  }

  generateUsername (fullName, data = [], logProcessId = null) {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_UTILS}/generateUsername`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    config.headers[Enums.HEADER_CONTENT_TYPE] = Enums.HEADER_APPLICATION_JSON

    if (logProcessId !== undefined && logProcessId !== null) {
      config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    if (fullName !== undefined && fullName !== null) {
      config.headers[Enums.HEADER_FULL_NAME] = fullName
    }

    return Utilities.executeRequest(config)
  }

  generatePDF (data = {}, logProcessId = null) {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_UTILS}/generatePDF`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    config.headers[Enums.HEADER_CONTENT_TYPE] = Enums.HEADER_APPLICATION_JSON

    if (logProcessId !== undefined && logProcessId !== null) {
      config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utilities.executeRequest(config)
  }

  generateUUID (logProcessId = null) {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_UTILS}/generateUUID`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessId !== undefined && logProcessId !== null) {
      config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utilities.executeRequest(config)
  }

  formatDateTime (dateTimeValue = '', formatKey = '', logProcessId = null) {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_UTILS}/formatDateTime`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessId !== undefined && logProcessId !== null) {
      config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    }

    if (dateTimeValue !== undefined && dateTimeValue !== null) {
      config.headers[Enums.HEADER_DATE_TIME_VALUE] = dateTimeValue
    }

    if (formatKey !== undefined && formatKey !== null) {
      config.headers[Enums.HEADER_FORMAT_KEY] = formatKey
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utilities.executeRequest(config)
  }

  account (logProcessId = null) {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_ADMIN}/account`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessId !== undefined && logProcessId !== null) {
      config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utilities.executeRequest(config)
  }

  dashboardReports (startDate, endDate, logProcessId = null) {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_REPORTS}/dashboard`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessId !== undefined && logProcessId !== null) {
      config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    }

    if (startDate !== undefined && startDate !== null) {
      config.headers[Enums.HEADER_START_DATE] = startDate
    }

    if (endDate !== undefined && endDate !== null) {
      config.headers[Enums.HEADER_END_DATE] = endDate
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utilities.executeRequest(config)
  }

  exportData (includeModules, solutionsArray, includeData, includeCredentials, logProcessId = null) {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_UTILS}/exportAllData`,
      method: Enums.METHOD_GET,
      headers: {},
      responseType: 'arraybuffer'
    }

    if (logProcessId !== undefined && logProcessId !== null) {
      config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    }

    if (includeModules !== undefined && includeModules !== null) {
      config.headers[Enums.HEADER_INCLUDE_MODULES] = includeModules
    }

    if (solutionsArray !== undefined && solutionsArray !== null) {
      config.headers.solutions = solutionsArray
    }

    if (includeData !== undefined && includeData !== null) {
      config.headers[Enums.HEADER_INCLUDE_DATA] = includeData
    }

    if (includeCredentials !== undefined && includeCredentials !== null) {
      config.headers[Enums.HEADER_INCLUDE_CREDENTIALS] = includeCredentials
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utilities.executeRequest(config)
  }

  importData (fileId, logProcessId = null) {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_UTILS}/importData`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessId !== undefined && logProcessId !== null) {
      config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    }

    if (fileId !== undefined && fileId !== null) {
      config.headers[Enums.HEADER_FILE_ID] = fileId
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utilities.executeRequest(config)
  }
}

module.exports = Utils
