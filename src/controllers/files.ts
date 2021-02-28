'use strict'

import Enums, { AxiosConfig } from '../utils/enums'
import { executeCRUDRequest, executeRequest } from '../utils/utils.js'
import { Config } from './agilite'

class Files {
  apiServerUrl: string = ''
  apiKey: string = ''
  teamId: string = ''
  responseType: any

  constructor (config: Config) {
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

  getFile (recordId: string = '', responseType = this.responseType.ARRAY_BUFFER, logProcessId: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_FILES}`,
      method: Enums.METHOD_GET,
      headers: {},
      responseType
    }

    if (logProcessId) config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    if (recordId) config.headers[Enums.HEADER_RECORD_ID] = recordId
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  getPublicFile (recordId: string = '', logProcessId: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_FILES}/${recordId}`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessId) config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    if (recordId) config.headers[Enums.HEADER_RECORD_ID] = recordId
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  uploadFile (fileName: string = '', contentType: string = '', data: any = {}, persistFile: boolean = false, isPublic: boolean = false, logProcessId: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_FILES}`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    if (logProcessId) config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    if (fileName) config.headers[Enums.HEADER_FILE_NAME] = fileName
    if (contentType) config.headers[Enums.HEADER_CONTENT_TYPE] = contentType
    if (persistFile) config.headers[Enums.HEADER_PERSIST_FILE] = persistFile
    if (isPublic) config.headers[Enums.HEADER_IS_PUBLIC] = isPublic
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  deleteFile (recordId: string = '', logProcessId: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_FILES}`,
      method: Enums.METHOD_DELETE,
      headers: {}
    }

    if (logProcessId) config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    if (recordId) config.headers[Enums.HEADER_RECORD_ID] = recordId
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  getFileName (recordId: string = '', logProcessId: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_FILES}/getFileName`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessId) config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    if (recordId) config.headers[Enums.HEADER_RECORD_ID] = recordId
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  unzip (recordId: string = '', logProcessId: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_FILES}/unzip`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessId) config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    if (recordId) config.headers[Enums.HEADER_RECORD_ID] = recordId
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }
}

export default Files
