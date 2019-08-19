'use strict'

const Enums = require('../utils/enums')
const Utils = require('../utils/utils.js')

class BPM {
  constructor (config) {
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
    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_BPM, Enums.METHOD_POST, data)
  }

  getData (profileKeys = [], recordIds = [], slimResult = true) {
    let headers = {}

    headers[Enums.HEADER_PROFILE_KEYS] = profileKeys.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_RECORD_IDS] = recordIds.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_SLIM_RESULT] = slimResult

    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_BPM, Enums.METHOD_GET, null, headers)
  }

  putData (recordId = '', data = {}) {
    let headers = {}
    headers[Enums.HEADER_RECORD_ID] = recordId

    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_BPM, Enums.METHOD_PUT, data, headers)
  }

  deleteData (recordId = '') {
    let headers = {}
    headers[Enums.HEADER_RECORD_ID] = recordId
    
    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_BPM, Enums.METHOD_DELETE, null, headers)
  }

  registerBPMRecord (processKey = '', currentUser = '') {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BPM}/registerBPMRecord`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (processKey !== undefined && processKey !== null) {
      config.headers[Enums.HEADER_PROCESS_KEY] = processKey
    }

    if (currentUser !== undefined && currentUser !== null) {
      config.headers[Enums.HEADER_CURRENT_USER] = currentUser
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utils.executeRequest(config)
  }

  execute (processKey = '', bpmRecordId = '', optionSelected = '', currentUser = '', comments = '', data = {}) {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BPM}/execute`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    config.headers[Enums.HEADER_CONTENT_TYPE] = Enums.HEADER_APPLICATION_JSON

    if (processKey !== undefined && processKey !== null) {
      config.headers[Enums.HEADER_PROCESS_KEY] = processKey
    }

    if (bpmRecordId !== undefined && bpmRecordId !== null) {
      config.headers[Enums.HEADER_BPM_RECORD_ID] = bpmRecordId
    }

    if (optionSelected !== undefined && optionSelected !== null) {
      config.headers[Enums.HEADER_OPTION_SELECTED] = optionSelected
    }

    if (currentUser !== undefined && currentUser !== null) {
      config.headers[Enums.HEADER_CURRENT_USER] = currentUser
    }

    if (comments !== undefined && comments !== null) {
      config.headers[Enums.HEADER_COMMENTS] = comments
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utils.executeRequest(config)
  }

  getRecordState (processKeys = [], bpmRecordIds = [], stepNames = [], responsibleUsers = [], relevantUsers = [], includeHistory = true, includeStepOptions = true, includeVisibleObjects = true, page = undefined, pageLimit = undefined) {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BPM}/getRecordState`,
      method: Enums.METHOD_GET,
      headers: {}
    }
    
    if (processKeys !== undefined && processKeys !== null) {
      config.headers[Enums.HEADER_PROCESS_KEYS] = processKeys.join(Enums.SEPARATOR_COMMA)
    }

    if (bpmRecordIds !== undefined && bpmRecordIds !== null) {
      config.headers[Enums.HEADER_BPM_RECORD_IDS] = bpmRecordIds.join(Enums.SEPARATOR_COMMA)
    }

    if (stepNames !== undefined && stepNames !== null) {
      config.headers[Enums.HEADER_STEP_NAMES] = stepNames.join(Enums.SEPARATOR_COMMA)
    }

    if (responsibleUsers !== undefined && responsibleUsers !== null) {
      config.headers[Enums.HEADER_RESPONSIBLE_USERS] = responsibleUsers.join(Enums.SEPARATOR_COMMA)
    }

    if (relevantUsers !== undefined && relevantUsers !== null) {
      config.headers[Enums.HEADER_RELEVANT_USERS] = relevantUsers.join(Enums.SEPARATOR_COMMA)
    }

    if (includeHistory !== undefined && includeHistory !== null) {
      config.headers[Enums.HEADER_INCLUDE_HISTORY] = includeHistory
    }

    if (includeStepOptions !== undefined && includeStepOptions !== null) {
      config.headers[Enums.HEADER_INCLUDE_STEP_OPTIONS] = includeStepOptions
    }

    if (includeVisibleObjects !== undefined && includeVisibleObjects !== null) {
      config.headers[Enums.HEADER_INCLUDE_VISIBLE_OBJECTS] = includeVisibleObjects
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    if (page !== undefined && page !== null) {
      config.headers[Enums.HEADER_PAGE] = page
    }

    if (pageLimit !== undefined && pageLimit !== null) {
      config.headers[Enums.HEADER_PAGE_LIMIT] = pageLimit
    }

    return Utils.executeRequest(config)
  }

  getByProfileKey (profileKey = '') {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BPM}/getByProfileKey`,
      method: Enums.METHOD_GET,
      headers: {}
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

    return Utils.executeRequest(config)
  }

  clearHistoryData (profileKey = '') {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BPM}/clearHistoryData`,
      method: Enums.METHOD_GET,
      headers: {}
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

    return Utils.executeRequest(config)
  }

  getActiveSteps (processKey = '') {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BPM}/getActiveSteps`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (processKey !== undefined && processKey !== null) {
      config.headers[Enums.HEADER_PROCESS_KEY] = processKey
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utils.executeRequest(config)
  }

  getActiveUsers (processKey = '') {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BPM}/getActiveUsers`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (processKey !== undefined && processKey !== null) {
      config.headers[Enums.HEADER_PROCESS_KEY] = processKey
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

module.exports = BPM
