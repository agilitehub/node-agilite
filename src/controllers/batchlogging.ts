'use strict'

import { Enums, AxiosConfig } from '../utils/enums'
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

  postData (data: any = {}, logProcessKey: string = '') {
    let headers: any = {}

    if (logProcessKey) headers[Enums.HEADER_LOG_PROCESS_KEY] = logProcessKey

    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_BATCH_LOGGING, Enums.METHOD_POST, data, headers)
  }

  getData (profileKeys: Array<string> = [], recordIds: Array<string> = [], slimResult: boolean = true, logProcessKey: string = '') {
    let headers: any = {}

    headers[Enums.HEADER_PROFILE_KEYS] = profileKeys.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_RECORD_IDS] = recordIds.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_SLIM_RESULT] = slimResult

    if (logProcessKey) headers[Enums.HEADER_LOG_PROCESS_KEY] = logProcessKey

    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_BATCH_LOGGING, Enums.METHOD_GET, null, headers)
  }

  putData (recordId: string = '', data: any = {}, logProcessKey: string = '') {
    let headers: any = {}
    headers[Enums.HEADER_RECORD_ID] = recordId

    if (logProcessKey) headers[Enums.HEADER_LOG_PROCESS_KEY] = logProcessKey

    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_BATCH_LOGGING, Enums.METHOD_PUT, data, headers)
  }

  deleteData (recordId: string = '', logProcessKey: string = '') {
    let headers: any = {}
    headers[Enums.HEADER_RECORD_ID] = recordId

    if (logProcessKey) headers[Enums.HEADER_LOG_PROCESS_KEY] = logProcessKey

    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_BATCH_LOGGING, Enums.METHOD_DELETE, null, headers)
  }

  getByProfileKey (profileKey: string = '', logProcessKey: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BATCH_LOGGING}/getByProfileKey`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessKey) config.headers[Enums.HEADER_LOG_PROCESS_KEY] = logProcessKey
    if (profileKey) config.headers[Enums.HEADER_PROFILE_KEY] = profileKey
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  initLogProcess (profileKey: string = '', data: any = {}, logProcessKey: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BATCH_LOGGING}/initLogProcess`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    if (logProcessKey) config.headers[Enums.HEADER_LOG_PROCESS_KEY] = logProcessKey
    if (profileKey) config.headers[Enums.HEADER_PROFILE_KEY] = profileKey
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  completeLogProcess (logProcessKey: string = '', data: any = {}) {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BATCH_LOGGING}/completeLogProcess`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    if (logProcessKey) config.headers[Enums.HEADER_LOG_PROCESS_KEY] = logProcessKey
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  createLogEntry (logProcessKey: string = '', data: any = {}) {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BATCH_LOGGING}/createLogEntry`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    if (logProcessKey) config.headers[Enums.HEADER_LOG_PROCESS_KEY] = logProcessKey
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  generateLogProcessReport (logProcessKey: string = '', qry: string = '', fieldsToReturn: string = '', qryOptions: any = null, page: any = null, pageLimit: any = null) {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BATCH_LOGGING}/report`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    config.headers[Enums.HEADER_LOG_PROCESS_KEY] = logProcessKey

    if (qry) config.headers.qry = qry
    if (fieldsToReturn) config.headers[Enums.HEADER_FIELDS_TO_RETURN] = fieldsToReturn
    if (qryOptions) config.headers[Enums.HEADER_QRY_OPTIONS] = qryOptions
    if (page) config.headers.page = page
    if (pageLimit) config.headers[Enums.HEADER_PAGE_LIMIT] = pageLimit
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }
}

export default BatchLogging
