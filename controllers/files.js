'use strict'

const Enums = require('../utils/enums')
const Utils = require('../utils/utils.js')

class Files {
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

  getFile (recordId = '', responseType = this.responseType.ARRAY_BUFFER) {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_FILES}`,
      method: Enums.METHOD_GET,
      headers: {},
      responseType
    }

    if (recordId !== undefined && recordId !== null) {
      config.headers[Enums.HEADER_RECORD_ID] = recordId
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utils.executeRequest(config)
  }

  uploadFile (fileName = '', contentType = '', data = {}) {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_FILES}`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    if (fileName && fileName !== '') {
      config.headers[Enums.HEADER_FILE_NAME] = fileName
    }

    if (contentType && contentType !== '') {
      config.headers[Enums.HEADER_CONTENT_TYPE] = contentType
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utils.executeRequest(config)
  }

  deleteFile (recordId = '') {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_FILES}`,
      method: Enums.METHOD_DELETE,
      headers: {}
    }

    if (recordId !== undefined && recordId !== null) {
      config.headers[Enums.HEADER_RECORD_ID] = recordId
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utils.executeRequest(config)
  }

  getFileName (recordId = '') {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_FILES}/getFileName`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (recordId !== undefined && recordId !== null) {
      config.headers[Enums.HEADER_RECORD_ID] = recordId
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utils.executeRequest(config)
  }

  unzip (recordId = '') {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_FILES}/unzip`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (recordId !== undefined && recordId !== null) {
      config.headers[Enums.HEADER_RECORD_ID] = recordId
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

module.exports = Files
