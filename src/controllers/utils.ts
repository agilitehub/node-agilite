import { Enums, AxiosConfig } from '../utils/enums'
import { executeRequest } from '../utils/utils.js'
import { Config } from './agilite'

interface ResponseType {
  ARRAY_BUFFER: string
  BLOB: string
  DOCUMENT: string
  JSON: string
  TEXT: string
  STREAM: string
}

class Utils {
  apiServerUrl: string = ''
  apiKey: string = ''
  teamId: string = ''
  responseType: ResponseType

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

  encodeXML (data: string = '', logProfileKey: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_UTILS}/encodeXML`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    config.headers[Enums.HEADER_CONTENT_TYPE] = Enums.HEADER_TEXT_PLAIN

    if (logProfileKey) config.headers[Enums.HEADER_LOG_PROFILE_KEY] = logProfileKey
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  decodeXML (data: string = '', logProfileKey: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_UTILS}/decodeXML`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    config.headers[Enums.HEADER_CONTENT_TYPE] = Enums.HEADER_TEXT_PLAIN

    if (logProfileKey) config.headers[Enums.HEADER_LOG_PROFILE_KEY] = logProfileKey
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  XMLToJS (data: string = '', logProfileKey: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_UTILS}/XMLToJS`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    config.headers[Enums.HEADER_CONTENT_TYPE] = Enums.HEADER_TEXT_PLAIN

    if (logProfileKey) config.headers[Enums.HEADER_LOG_PROFILE_KEY] = logProfileKey
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  JSToXML (data: any = {}, logProfileKey: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_UTILS}/JSToXML`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    config.headers[Enums.HEADER_CONTENT_TYPE] = Enums.HEADER_APPLICATION_JSON

    if (logProfileKey) config.headers[Enums.HEADER_LOG_PROFILE_KEY] = logProfileKey
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  html2json (data: string = '', logProfileKey: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_UTILS}/html2json`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    config.headers[Enums.HEADER_CONTENT_TYPE] = Enums.HEADER_TEXT_PLAIN

    if (logProfileKey) config.headers[Enums.HEADER_LOG_PROFILE_KEY] = logProfileKey
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  jsonDiff (data: string = '', logProfileKey: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_UTILS}/jsonDiff`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    config.headers[Enums.HEADER_CONTENT_TYPE] = Enums.HEADER_APPLICATION_JSON

    if (logProfileKey) config.headers[Enums.HEADER_LOG_PROFILE_KEY] = logProfileKey
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  generateOCR (recordId: string, logProfileKey = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_UTILS}/generateOCR`,
      method: Enums.METHOD_POST,
      headers: {}
    }

    config.headers[Enums.HEADER_CONTENT_TYPE] = Enums.HEADER_APPLICATION_JSON

    if (logProfileKey) config.headers[Enums.HEADER_LOG_PROFILE_KEY] = logProfileKey
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    if (recordId) config.headers[Enums.HEADER_RECORD_ID] = recordId

    return executeRequest(config)
  }

  generateUsername (fullName: string, data: any = [], logProfileKey: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_UTILS}/generateUsername`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    config.headers[Enums.HEADER_CONTENT_TYPE] = Enums.HEADER_APPLICATION_JSON

    if (logProfileKey) config.headers[Enums.HEADER_LOG_PROFILE_KEY] = logProfileKey
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    if (fullName) config.headers[Enums.HEADER_FULL_NAME] = fullName

    return executeRequest(config)
  }

  generatePDF (data: any = {}, logProfileKey: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_UTILS}/generatePDF`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    config.headers[Enums.HEADER_CONTENT_TYPE] = Enums.HEADER_APPLICATION_JSON

    if (logProfileKey) config.headers[Enums.HEADER_LOG_PROFILE_KEY] = logProfileKey
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  generateUUID (logProfileKey: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_UTILS}/generateUUID`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProfileKey) config.headers[Enums.HEADER_LOG_PROFILE_KEY] = logProfileKey
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  formatDateTime (dateTimeValue: string = '', formatKey: string = '', logProfileKey: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_UTILS}/formatDateTime`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProfileKey) config.headers[Enums.HEADER_LOG_PROFILE_KEY] = logProfileKey
    if (dateTimeValue) config.headers[Enums.HEADER_DATE_TIME_VALUE] = dateTimeValue
    if (formatKey) config.headers[Enums.HEADER_FORMAT_KEY] = formatKey
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  account (logProfileKey: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_ADMIN}/account`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProfileKey) config.headers[Enums.HEADER_LOG_PROFILE_KEY] = logProfileKey
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  dashboardReports (startDate: string, endDate: string, logProfileKey: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_REPORTS}/dashboard`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProfileKey) config.headers[Enums.HEADER_LOG_PROFILE_KEY] = logProfileKey
    if (startDate) config.headers[Enums.HEADER_START_DATE] = startDate
    if (endDate) config.headers[Enums.HEADER_END_DATE] = endDate
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  homePageReports () {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_REPORTS}/homePage`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  exportData (includeModules: boolean = false, solutionsArray: Array<any> = [], includeData: boolean = false, includeCredentials: boolean = false, logProfileKey: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_UTILS}/exportAllData`,
      method: Enums.METHOD_GET,
      headers: {},
      responseType: 'arraybuffer'
    }

    if (logProfileKey) config.headers[Enums.HEADER_LOG_PROFILE_KEY] = logProfileKey
    if (includeModules) config.headers[Enums.HEADER_INCLUDE_MODULES] = includeModules
    if (solutionsArray) config.headers.solutions = solutionsArray
    if (includeData) config.headers[Enums.HEADER_INCLUDE_DATA] = includeData
    if (includeCredentials) config.headers[Enums.HEADER_INCLUDE_CREDENTIALS] = includeCredentials
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  importData (fileId: string, includeModules: boolean = false, solutionsArray: Array<string> = [], includeData: boolean = false, includeCredentials: boolean = false, logProfileKey: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_UTILS}/importData`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProfileKey) config.headers[Enums.HEADER_LOG_PROFILE_KEY] = logProfileKey
    if (fileId) config.headers[Enums.HEADER_FILE_ID] = fileId
    if (includeModules) config.headers[Enums.HEADER_INCLUDE_MODULES] = includeModules
    if (solutionsArray) config.headers.solutions = solutionsArray
    if (includeData) config.headers[Enums.HEADER_INCLUDE_DATA] = includeData
    if (includeCredentials) config.headers[Enums.HEADER_INCLUDE_CREDENTIALS] = includeCredentials
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  getIP () {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_UTILS}/ip`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  getUserAgent () {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_UTILS}/useragent`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  returnISOLanguages () {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_UTILS}/isoLanguages`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }
}

export default Utils
