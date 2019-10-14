import * as Enums from '../utils/enums'
import Utilities from '../utils/utils'

class Roles {
  apiServerUrl: any
  apiKey: any
  teamId: any

  constructor(config: any) {
    this.apiServerUrl = null
    this.apiKey = null
    this.teamId = null

    if (config) {
      this.apiServerUrl = config.apiServerUrl
      this.apiKey = config.apiKey
      this.teamId = config.teamId
    }
  }

  postData (data = {}) {
    return Utilities.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_ROLES, Enums.METHOD_POST, data)
  }

  getData (profileKeys = [], recordIds = [], slimResult = true) {
    let headers: any = {}

    headers[Enums.HEADER_PROFILE_KEYS] = profileKeys.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_RECORD_IDS] = recordIds.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_SLIM_RESULT] = slimResult

    return Utilities.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_ROLES, Enums.METHOD_GET, null, headers)
  }

  putData (recordId = '', data = {}) {
    let headers: any = {}
    headers[Enums.HEADER_RECORD_ID] = recordId

    return Utilities.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_ROLES, Enums.METHOD_PUT, data, headers)
  }

  deleteData (recordId = '') {
    let headers: any = {}
    headers[Enums.HEADER_RECORD_ID] = recordId

    return Utilities.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_ROLES, Enums.METHOD_DELETE, null, headers)
  }

  getRole (roleNames: any = [], conditionalLevels: any = [], data = {}) {
    let config: any = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_ROLES}/getRole`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    config.headers[Enums.HEADER_CONTENT_TYPE] = Enums.HEADER_APPLICATION_JSON

    if (roleNames !== undefined && roleNames !== null) {
      config.headers[Enums.HEADER_ROLE_NAMES] = roleNames.join(Enums.SEPARATOR_COMMA)
    }

    if (conditionalLevels !== undefined && conditionalLevels !== null) {
      config.headers[Enums.HEADER_CONDITIONAL_LEVELS] = conditionalLevels.join(Enums.SEPARATOR_COMMA)
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utilities.executeRequest(config)
  }

  assignRole (processKey = '', bpmRecordId = '', roleName = '', currentUser = '', responsibleUsers: any = []) {
    let config: any = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_ROLES}/assignRole`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (processKey !== undefined && processKey !== null) {
      config.headers[Enums.HEADER_PROCESS_KEY] = processKey
    }

    if (bpmRecordId !== undefined && bpmRecordId !== null) {
      config.headers[Enums.HEADER_BPM_RECORD_ID] = bpmRecordId
    }

    if (roleName !== undefined && roleName !== null) {
      config.headers[Enums.HEADER_ROLE_NAME] = roleName
    }

    if (currentUser !== undefined && currentUser !== null) {
      config.headers[Enums.HEADER_CURRENT_USER] = currentUser
    }

    if (responsibleUsers !== undefined && responsibleUsers !== null) {
      config.headers[Enums.HEADER_RESPONSIBLE_USERS] = responsibleUsers.join(Enums.SEPARATOR_COMMA)
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utilities.executeRequest(config)
  }

  getAssignedRoles (processKey = '', bpmRecordId = '', roleNames: any = []) {
    let config: any = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_ROLES}/getAssignedRoles`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (processKey !== undefined && processKey !== null) {
      config.headers[Enums.HEADER_PROCESS_KEY] = processKey
    }

    if (bpmRecordId !== undefined && bpmRecordId !== null) {
      config.headers[Enums.HEADER_BPM_RECORD_ID] = bpmRecordId
    }

    if (roleNames !== undefined && roleNames !== null) {
      config.headers[Enums.HEADER_ROLE_NAMES] = roleNames.join(Enums.SEPARATOR_COMMA)
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utilities.executeRequest(config)
  }

  changeConditionalLevels (recordId = '', conditionalLevels: any = []) {
    let config: any = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_ROLES}/changeConditionalLevels`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (recordId !== undefined && recordId !== null) {
      config.headers[Enums.HEADER_RECORD_ID] = recordId
    }

    if (conditionalLevels !== undefined && conditionalLevels !== null) {
      config.headers[Enums.HEADER_CONDITIONAL_LEVELS] = conditionalLevels.join(Enums.SEPARATOR_COMMA)
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utilities.executeRequest(config)
  }

  reAssignResponsibleUser (recordId = '', responsibleUser = '') {
    let config: any = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_ROLES}/reAssignResponsibleUser`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (recordId !== undefined && recordId !== null) {
      config.headers[Enums.HEADER_RECORD_ID] = recordId
    }

    if (responsibleUser !== undefined && responsibleUser !== null) {
      config.headers[Enums.HEADER_RESPONSIBLE_USER] = responsibleUser
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

export = Roles
