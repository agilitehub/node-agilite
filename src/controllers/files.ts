import * as Enums from '../utils/enums'
import Utilities from '../utils/utils'

class Files {
  apiServerUrl: any
  apiKey: any
  teamId: any

  responseType: any

  constructor(config: any) {
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
    let config: any = {
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

    return Utilities.executeRequest(config)
  }

  uploadFile (fileName = '', contentType = '', data = {}) {
    let config: any = {
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

    return Utilities.executeRequest(config)
  }

  deleteFile (recordId = '') {
    let config: any = {
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

    return Utilities.executeRequest(config)
  }

  getFileName (recordId = '') {
    let config: any = {
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

    return Utilities.executeRequest(config)
  }
}

export = Files
