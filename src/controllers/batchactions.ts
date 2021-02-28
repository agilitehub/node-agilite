'use strict'

import Enums, { AxiosConfig } from '../utils/enums'
import { executeCRUDRequest, executeRequest } from '../utils/utils.js'
import { Config } from './agilite'

class BatchActions {
  apiServerUrl: string = ''
  apiKey: string = ''
  teamId: string = ''

  constructor (config: Config) {
    if (config) {
      this.apiServerUrl = config.apiServerUrl
      this.apiKey = config.apiKey
      this.teamId = config.teamId
    }
  }

  postData (data: any = {}, logProcessId: string = '') {
    let headers: any = {}

    if (logProcessId) headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId

    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_BATCH_ACTIONS, Enums.METHOD_POST, data, headers)
  }

  getData (profileKeys: Array<string> = [], recordIds: Array<string> = [], slimResult: boolean = true, logProcessId: string = '') {
    const headers: any = {}

    headers[Enums.HEADER_PROFILE_KEYS] = profileKeys.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_RECORD_IDS] = recordIds.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_SLIM_RESULT] = slimResult

    if (logProcessId) headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId

    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_BATCH_ACTIONS, Enums.METHOD_GET, null, headers)
  }

  putData (recordId: string = '', data: any = {}, logProcessId: string = '') {
    const headers: any = {}
    headers[Enums.HEADER_RECORD_ID] = recordId

    if (logProcessId) headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId

    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_BATCH_ACTIONS, Enums.METHOD_PUT, data, headers)
  }

  deleteData (recordId: string = '', logProcessId: string = '') {
    const headers: any = {}
    headers[Enums.HEADER_RECORD_ID] = recordId

    if (logProcessId) headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId

    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_BATCH_ACTIONS, Enums.METHOD_DELETE, null, headers)
  }

  execute (profileKey: string = '', data: any = {}, logProcessId: string = '') {
    const config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BATCH_ACTIONS}/execute`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    config.headers[Enums.HEADER_CONTENT_TYPE] = Enums.HEADER_APPLICATION_JSON

    if (logProcessId) config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    if (profileKey !== undefined && profileKey !== null) config.headers[Enums.HEADER_PROFILE_KEY] = profileKey
    if (this.apiKey !== undefined && this.apiKey !== null) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId !== undefined && this.teamId !== null) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }
}

export default BatchActions
