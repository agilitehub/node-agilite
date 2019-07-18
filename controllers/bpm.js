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
    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_BPM, Enums.METHOD_GET, null, null, profileKeys, recordIds, slimResult)
  }

  putData (recordId = '', data = {}) {
    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_BPM, Enums.METHOD_PUT, data, recordId)
  }

  deleteData (recordId = '') {
    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_BPM, Enums.METHOD_DELETE, null, recordId)
  }

  registerBPMRecord (processKey = '', currentUser = '') {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BPM}/registerBPMRecord`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    config.headers[Enums.HEADER_API_KEY] = this.apiKey
    config.headers[Enums.HEADER_PROCESS_KEY] = processKey
    config.headers[Enums.HEADER_CURRENT_USER] = currentUser

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
    config.headers[Enums.HEADER_API_KEY] = this.apiKey
    config.headers[Enums.HEADER_PROCESS_KEY] = processKey
    config.headers[Enums.HEADER_BPM_RECORD_ID] = bpmRecordId
    config.headers[Enums.HEADER_OPTION_SELECTED] = optionSelected
    config.headers[Enums.HEADER_CURRENT_USER] = currentUser
    config.headers[Enums.HEADER_COMMENTS] = comments

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

    config.headers[Enums.HEADER_API_KEY] = this.apiKey

    config.headers[Enums.HEADER_PROCESS_KEYS] = processKeys.join(Enums.SEPARATOR_COMMA)
    config.headers[Enums.HEADER_BPM_RECORD_IDS] = bpmRecordIds.join(Enums.SEPARATOR_COMMA)
    config.headers[Enums.HEADER_STEP_NAMES] = stepNames.join(Enums.SEPARATOR_COMMA)
    config.headers[Enums.HEADER_RESPONSIBLE_USERS] = responsibleUsers.join(Enums.SEPARATOR_COMMA)
    config.headers[Enums.HEADER_RELEVANT_USERS] = relevantUsers.join(Enums.SEPARATOR_COMMA)
    config.headers[Enums.HEADER_INCLUDE_HISTORY] = includeHistory
    config.headers[Enums.HEADER_INCLUDE_STEP_OPTIONS] = includeStepOptions
    config.headers[Enums.HEADER_INCLUDE_VISIBLE_OBJECTS] = includeVisibleObjects

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

    config.headers[Enums.HEADER_API_KEY] = this.apiKey
    config.headers[Enums.HEADER_PROFILE_KEY] = profileKey

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

    config.headers[Enums.HEADER_API_KEY] = this.apiKey
    config.headers[Enums.HEADER_PROFILE_KEY] = profileKey

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

    config.headers[Enums.HEADER_API_KEY] = this.apiKey
    config.headers[Enums.HEADER_PROCESS_KEY] = processKey

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

    config.headers[Enums.HEADER_API_KEY] = this.apiKey
    config.headers[Enums.HEADER_PROCESS_KEY] = processKey

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utils.executeRequest(config)
  }
}

module.exports = BPM
