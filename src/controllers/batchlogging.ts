'use strict'

import Enums, { AxiosConfig } from '../utils/enums'
import { executeCRUDRequest, executeRequest } from '../utils/utils.js'
import { Config } from './agilite'

interface OutputFormat {
  JSON: string
  STRING: string
}

class BatchLogging {
  apiServerUrl: string = ''
  apiKey: string = ''
  teamId: string = ''
  outputFormat: OutputFormat

  constructor (config: Config) {
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

  postData (data: any = {}, logProcessId: string = '') {
    let headers: any = {}

    if (logProcessId !== undefined && logProcessId !== null) {
      headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    }

    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_BATCH_LOGGING, Enums.METHOD_POST, data, headers)
  }

  getData (profileKeys: Array<string> = [], recordIds: Array<string> = [], slimResult: boolean = true, logProcessId: string = '') {
    let headers: any = {}

    headers[Enums.HEADER_PROFILE_KEYS] = profileKeys.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_RECORD_IDS] = recordIds.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_SLIM_RESULT] = slimResult

    if (logProcessId !== undefined && logProcessId !== null) {
      headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    }

    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_BATCH_LOGGING, Enums.METHOD_GET, null, headers)
  }

  putData (recordId: string = '', data: any = {}, logProcessId: string = '') {
    let headers: any = {}
    headers[Enums.HEADER_RECORD_ID] = recordId

    if (logProcessId !== undefined && logProcessId !== null) {
      headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    }

    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_BATCH_LOGGING, Enums.METHOD_PUT, data, headers)
  }

  deleteData (recordId: string = '', logProcessId: string = '') {
    let headers: any = {}
    headers[Enums.HEADER_RECORD_ID] = recordId

    if (logProcessId !== undefined && logProcessId !== null) {
      headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    }

    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_BATCH_LOGGING, Enums.METHOD_DELETE, null, headers)
  }

  getByProfileKey (profileKey: string = '', logProcessId: string = '') {
    let config: AxiosConfig = {
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

    return executeRequest(config)
  }

  initLogProcess (profileKey: string = '', data: any = {}, logProcessId: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BATCH_LOGGING}/initLogProcess`,
      method: Enums.METHOD_POST,
      headers: {},
      data
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

    return executeRequest(config)
  }

  completeLogProcess (logProcessId: string = '', data: any = {}) {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BATCH_LOGGING}/completeLogProcess`,
      method: Enums.METHOD_POST,
      headers: {},
      data
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

    return executeRequest(config)
  }

  createLogEntry (logProcessId: string = '', data: any = {}) {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BATCH_LOGGING}/createLogEntry`,
      method: Enums.METHOD_POST,
      headers: {},
      data
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

    return executeRequest(config)
  }

  generateLogProcessReport (logProcessId: string = '', qry: string = '', fieldsToReturn: string = '', qryOptions: any = null, page: any = null, pageLimit: any = null) {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BATCH_LOGGING}/report`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId

    if (qry !== undefined && qry !== null) {
      config.headers.qry = qry
    }

    if (fieldsToReturn !== undefined && fieldsToReturn !== null) {
      config.headers['fields-to-return'] = fieldsToReturn
    }

    if (qryOptions !== undefined && qryOptions !== null) {
      config.headers['qry-options'] = qryOptions
    }

    if (page !== undefined && page !== null) {
      config.headers.page = page
    }

    if (pageLimit !== undefined && pageLimit !== null) {
      config.headers['page-limit'] = pageLimit
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return executeRequest(config)
  }
}

export default BatchLogging
