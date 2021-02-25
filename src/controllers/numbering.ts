import Enums, { AxiosConfig } from '../utils/enums'
import { executeCRUDRequest, executeRequest } from '../utils/utils'
import { Config } from './agilite'

interface OutputFormat {
  JSON: string
  STRING: string
}

class Numbering {
  apiServerUrl: string = ''
  apiKey: string = ''
  teamId: string = ''
  outputFormat: OutputFormat = {
    JSON: Enums.VALUE_JSON_LOWER,
    STRING: Enums.VALUE_STRING_LOWER
  }

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

    if (logProcessId) headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId

    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_NUMBERING, Enums.METHOD_POST, data, headers)
  }

  getData (profileKeys: Array<string> = [], recordIds: Array<string> = [], slimResult: boolean = true, logProcessId: string = '') {
    let headers: any = {}

    if (logProcessId) headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId

    headers[Enums.HEADER_PROFILE_KEYS] = profileKeys.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_RECORD_IDS] = recordIds.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_SLIM_RESULT] = slimResult

    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_NUMBERING, Enums.METHOD_GET, null, headers)
  }

  putData (recordId: string = '', data: any = {}, logProcessId: string = '') {
    let headers: any = {}

    if (logProcessId) headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId

    headers[Enums.HEADER_RECORD_ID] = recordId

    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_NUMBERING, Enums.METHOD_PUT, data, headers)
  }

  deleteData (recordId: string = '', logProcessId: string = '') {
    let headers: any = {}

    if (logProcessId) headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId

    headers[Enums.HEADER_RECORD_ID] = recordId

    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_NUMBERING, Enums.METHOD_DELETE, null, headers)
  }

  generate (profileKey: string = '', outputFormat: string = '', data: any = {}, logProcessId: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_NUMBERING}/generate`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    config.headers[Enums.HEADER_CONTENT_TYPE] = Enums.HEADER_APPLICATION_JSON

    if (logProcessId) config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    if (profileKey) config.headers[Enums.HEADER_PROFILE_KEY] = profileKey
    if (outputFormat) config.headers[Enums.HEADER_OUTPUT_FORMAT] = outputFormat
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  resetCounters (recordId: string = '', logProcessId: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_NUMBERING}/resetCounters`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessId !== undefined && logProcessId !== null) config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    if (recordId !== undefined && recordId !== null) config.headers[Enums.HEADER_RECORD_ID] = recordId
    if (this.apiKey !== undefined && this.apiKey !== null) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId !== undefined && this.teamId !== null) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }
}

export default Numbering
