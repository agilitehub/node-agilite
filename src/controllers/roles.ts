'use strict'

import { Config } from "./agilite"

import { Enums, AxiosConfig } from '../utils/enums'
import { executeRequest, executeCRUDRequest } from '../utils/utils.js'

class Roles {
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

  postData (data: any = {}, logProcessKey: string = '') {
    let headers: any = {}

    if (logProcessKey) headers[Enums.HEADER_LOG_PROCESS_KEY] = logProcessKey

    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_ROLES, Enums.METHOD_POST, data, headers)
  }

  getData (profileKeys: Array<string> = [], recordIds: Array<string> = [], slimResult: boolean = true, logProcessKey: string = '') {
    let headers: any = {}

    headers[Enums.HEADER_PROFILE_KEYS] = profileKeys.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_RECORD_IDS] = recordIds.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_SLIM_RESULT] = slimResult

    if (logProcessKey) headers[Enums.HEADER_LOG_PROCESS_KEY] = logProcessKey

    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_ROLES, Enums.METHOD_GET, null, headers)
  }

  putData (recordId: string = '', data: any = {}, logProcessKey: string = '') {
    let headers: any = {}
    headers[Enums.HEADER_RECORD_ID] = recordId

    if (logProcessKey) headers[Enums.HEADER_LOG_PROCESS_KEY] = logProcessKey

    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_ROLES, Enums.METHOD_PUT, data, headers)
  }

  deleteData (recordId: string = '', logProcessKey: string = '') {
    let headers: any = {}
    headers[Enums.HEADER_RECORD_ID] = recordId

    if (logProcessKey) headers[Enums.HEADER_LOG_PROCESS_KEY] = logProcessKey

    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_ROLES, Enums.METHOD_DELETE, null, headers)
  }

  getRole (roleNames: Array<string> = [], conditionalLevels: Array<string> = [], data: any = {}, logProcessKey: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_ROLES}/getRole`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    config.headers[Enums.HEADER_CONTENT_TYPE] = Enums.HEADER_APPLICATION_JSON

    if (logProcessKey) config.headers[Enums.HEADER_LOG_PROCESS_KEY] = logProcessKey
    if (roleNames) config.headers[Enums.HEADER_ROLE_NAMES] = roleNames.join(Enums.SEPARATOR_COMMA)
    if (conditionalLevels) config.headers[Enums.HEADER_CONDITIONAL_LEVELS] = conditionalLevels.join(Enums.SEPARATOR_COMMA)
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  changeConditionalLevels (recordId: string = '', conditionalLevels: Array<string> = [], logProcessKey: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_ROLES}/changeConditionalLevels`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessKey) config.headers[Enums.HEADER_LOG_PROCESS_KEY] = logProcessKey
    if (recordId) config.headers[Enums.HEADER_RECORD_ID] = recordId
    if (conditionalLevels) config.headers[Enums.HEADER_CONDITIONAL_LEVELS] = conditionalLevels.join(Enums.SEPARATOR_COMMA)
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  reAssignResponsibleUser (recordId: string = '', responsibleUser: string = '', logProcessKey: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_ROLES}/reAssignResponsibleUser`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessKey) config.headers[Enums.HEADER_LOG_PROCESS_KEY] = logProcessKey
    if (recordId) config.headers[Enums.HEADER_RECORD_ID] = recordId
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }
}

export default Roles
