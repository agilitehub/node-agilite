'use strict'

import Enums, { AxiosConfig } from '../utils/enums'
import { executeCRUDRequest, executeRequest } from '../utils/utils.js'
import { Config } from './agilite'

class BPM {
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

    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_BPM, Enums.METHOD_POST, data, headers)
  }

  getData (profileKeys: Array<string> = [], recordIds: Array<string> = [], slimResult: boolean = true, logProcessId: string = '') {
    let headers: any = {}

    headers[Enums.HEADER_PROFILE_KEYS] = profileKeys.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_RECORD_IDS] = recordIds.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_SLIM_RESULT] = slimResult

    if (logProcessId) headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId

    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_BPM, Enums.METHOD_GET, null, headers)
  }

  putData (recordId: string = '', data: any = {}, logProcessId: string = '') {
    let headers: any = {}
    headers[Enums.HEADER_RECORD_ID] = recordId

    if (logProcessId) headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId

    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_BPM, Enums.METHOD_PUT, data, headers)
  }

  deleteData (recordId: string = '', logProcessId: string = '') {
    let headers: any = {}
    headers[Enums.HEADER_RECORD_ID] = recordId

    if (logProcessId) headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId

    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_BPM, Enums.METHOD_DELETE, null, headers)
  }

  registerBPMRecord (processKey: string = '', currentUser: string = '', includeHistory: boolean = true, includeStepOptions: boolean = true, includeVisibleObjects: boolean = true, includeKeywords: boolean = true, isoLanguage: string = '', logProcessId: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BPM}/registerBPMRecord`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessId) config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    if (processKey !== undefined && processKey !== null) config.headers[Enums.HEADER_PROCESS_KEY] = processKey
    if (currentUser !== undefined && currentUser !== null) config.headers[Enums.HEADER_CURRENT_USER] = currentUser
    if (includeHistory !== undefined && includeHistory !== null) config.headers[Enums.HEADER_INCLUDE_HISTORY] = includeHistory
    if (includeStepOptions !== undefined && includeStepOptions !== null) config.headers[Enums.HEADER_INCLUDE_STEP_OPTIONS] = includeStepOptions
    if (includeVisibleObjects !== undefined && includeVisibleObjects !== null) config.headers[Enums.HEADER_INCLUDE_VISIBLE_OBJECTS] = includeVisibleObjects
    if (includeKeywords !== undefined && includeKeywords !== null) config.headers[Enums.HEADER_INCLUDE_KEYWORDS] = includeKeywords
    if (isoLanguage) config.headers[Enums.HEADER_ISO_LANGUAGE] = isoLanguage
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  execute (processKey: string = '', bpmRecordId: string = '', optionSelected: string = '', currentUser: string = '', currentStep: string = '', comments: string = '', data: any = {}, includeHistory: boolean = true, includeStepOptions: boolean = true, includeVisibleObjects: boolean = true, includeKeywords: boolean = true, isoLanguage: string = '', logProcessId: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BPM}/execute`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    config.headers[Enums.HEADER_CONTENT_TYPE] = Enums.HEADER_APPLICATION_JSON

    if (logProcessId) config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    if (processKey) config.headers[Enums.HEADER_PROCESS_KEY] = processKey
    if (bpmRecordId) config.headers[Enums.HEADER_BPM_RECORD_ID] = bpmRecordId
    if (optionSelected) config.headers[Enums.HEADER_OPTION_SELECTED] = optionSelected
    if (currentUser) config.headers[Enums.HEADER_CURRENT_USER] = currentUser
    if (currentStep) config.headers[Enums.HEADER_CURRENT_STEP] = currentStep
    if (comments) config.headers[Enums.HEADER_COMMENTS] = comments
    if (includeHistory) config.headers[Enums.HEADER_INCLUDE_HISTORY] = includeHistory
    if (includeStepOptions) config.headers[Enums.HEADER_INCLUDE_STEP_OPTIONS] = includeStepOptions
    if (includeVisibleObjects) config.headers[Enums.HEADER_INCLUDE_VISIBLE_OBJECTS] = includeVisibleObjects
    if (includeKeywords) config.headers[Enums.HEADER_INCLUDE_KEYWORDS] = includeKeywords
    if (isoLanguage) config.headers[Enums.HEADER_ISO_LANGUAGE] = isoLanguage
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  getRecordState (processKeys: Array<string> = [], bpmRecordIds: Array<string> = [], stepNames: Array<string> = [], responsibleUsers: Array<string> = [], relevantUsers: Array<string> = [], relevantRoles: Array<string> = [], eventStamps: Array<string> = [], eventStartDate: string = '', eventEndDate: string = '', includeHistory: boolean = true, includeStepOptions: boolean = true, includeVisibleObjects: boolean = true, includeKeywords: boolean = true, page: any = undefined, pageLimit: any = undefined, sort: string = '', isoLanguage: string = '', logProcessId: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BPM}/getRecordState`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessId) config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    if (processKeys) config.headers[Enums.HEADER_PROCESS_KEYS] = processKeys.join(Enums.SEPARATOR_COMMA)
    if (bpmRecordIds) config.headers[Enums.HEADER_BPM_RECORD_IDS] = bpmRecordIds.join(Enums.SEPARATOR_COMMA)
    if (stepNames) config.headers[Enums.HEADER_STEP_NAMES] = stepNames.join(Enums.SEPARATOR_COMMA)
    if (responsibleUsers) config.headers[Enums.HEADER_RESPONSIBLE_USERS] = responsibleUsers.join(Enums.SEPARATOR_COMMA)
    if (relevantUsers) config.headers[Enums.HEADER_RELEVANT_USERS] = relevantUsers.join(Enums.SEPARATOR_COMMA)
    if (relevantRoles) config.headers[Enums.HEADER_RELEVANT_ROLES] = relevantRoles.join(Enums.SEPARATOR_COMMA)
    if (eventStamps) config.headers[Enums.HEADER_EVENT_STAMPS] = eventStamps.join(Enums.SEPARATOR_COMMA)
    if (includeHistory) config.headers[Enums.HEADER_INCLUDE_HISTORY] = includeHistory
    if (includeStepOptions) config.headers[Enums.HEADER_INCLUDE_STEP_OPTIONS] = includeStepOptions
    if (includeVisibleObjects) config.headers[Enums.HEADER_INCLUDE_VISIBLE_OBJECTS] = includeVisibleObjects
    if (includeKeywords) config.headers[Enums.HEADER_INCLUDE_KEYWORDS] = includeKeywords
    if (isoLanguage) config.headers[Enums.HEADER_ISO_LANGUAGE] = isoLanguage
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    if (page) config.headers[Enums.HEADER_PAGE] = page
    if (pageLimit) config.headers[Enums.HEADER_PAGE_LIMIT] = pageLimit
    if (sort) config.headers[Enums.HEADER_SORT_BY] = sort
    if (eventStartDate) config.headers[Enums.HEADER_EVENT_START_DATE] = eventStartDate
    if (eventEndDate) config.headers[Enums.HEADER_EVENT_END_DATE] = eventEndDate

    return executeRequest(config)
  }

  getByProfileKey (profileKey: string = '', logProcessId: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BPM}/getByProfileKey`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessId) config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    if (profileKey) config.headers[Enums.HEADER_PROFILE_KEY] = profileKey
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  clearHistoryData (profileKey: string = '', logProcessId: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BPM}/clearHistoryData`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessId) config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    if (profileKey) config.headers[Enums.HEADER_PROFILE_KEY] = profileKey
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  getActiveSteps (processKey: string = '', isoLanguage: string = '', logProcessId: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BPM}/getActiveSteps`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessId) config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    if (processKey) config.headers[Enums.HEADER_PROCESS_KEY] = processKey
    if (isoLanguage) config.headers[Enums.HEADER_ISO_LANGUAGE] = isoLanguage
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  getActiveUsers (processKey: string = '', logProcessId: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BPM}/getActiveUsers`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessId) config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    if (processKey) config.headers[Enums.HEADER_PROCESS_KEY] = processKey
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  deleteBPMStubs (processKey: string = '', bpmRecordIds: string = '', logProcessId: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BPM}/deleteBPMStubs`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessId) config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    if (processKey) config.headers[Enums.HEADER_PROCESS_KEY] = processKey
    if (bpmRecordIds) config.headers[Enums.HEADER_ISO_LANGUAGE] = bpmRecordIds
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  assignRole (processKey: string = '', bpmRecordId: string = '', roleName: string = '', currentUser: string = '', responsibleUsers: Array<string> = [], logProcessId: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BPM}/assignRole`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessId) config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    if (processKey) config.headers[Enums.HEADER_PROCESS_KEY] = processKey
    if (bpmRecordId) config.headers[Enums.HEADER_BPM_RECORD_ID] = bpmRecordId
    if (roleName) config.headers[Enums.HEADER_ROLE_NAME] = roleName
    if (currentUser) config.headers[Enums.HEADER_CURRENT_USER] = currentUser
    if (responsibleUsers) config.headers[Enums.HEADER_RESPONSIBLE_USERS] = responsibleUsers.join(Enums.SEPARATOR_COMMA)
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  getAssignedRoles (processKey: string = '', bpmRecordId: string = '', roleNames: Array<string> = [], logProcessId: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BPM}/getAssignedRoles`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessId) config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    if (processKey) config.headers[Enums.HEADER_PROCESS_KEY] = processKey
    if (bpmRecordId) config.headers[Enums.HEADER_BPM_RECORD_ID] = bpmRecordId
    if (roleNames) config.headers[Enums.HEADER_ROLE_NAMES] = roleNames.join(Enums.SEPARATOR_COMMA)
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  reAssignResponsibleUser (processKey: string = '', currentResponsibleUser: string = '', newResponsibleUser: string = '', roleNames: Array<string> = [], logProcessId: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BPM}/reAssignResponsibleUser`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessId) config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    if (processKey) config.headers[Enums.HEADER_PROCESS_KEY] = processKey
    if (currentResponsibleUser) config.headers[Enums.HEADER_CURRENT_RESPONSIBLE_USER] = currentResponsibleUser
    if (newResponsibleUser) config.headers[Enums.HEADER_NEW_RESPONSIBLE_USER] = newResponsibleUser
    if (roleNames) config.headers[Enums.HEADER_ROLE_NAMES] = roleNames.join(Enums.SEPARATOR_COMMA)
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  getResponsibleRoles (processKey: string = '', responsibleUser: string = '', logProcessId: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BPM}/getResponsibleRoles`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessId) config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    if (processKey) config.headers[Enums.HEADER_PROCESS_KEY] = processKey
    if (responsibleUser) config.headers[Enums.HEADER_RESPONSIBLE_USER] = responsibleUser
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  lockRecord (bpmRecordId: string = '', logProcessId: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BPM}/lockRecord`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (bpmRecordId) config.headers[Enums.HEADER_BPM_RECORD_ID] = bpmRecordId
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    if (logProcessId) config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId

    return executeRequest(config)
  }

  unlockRecord (bpmRecordId: string = '', logProcessId: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_BPM}/unlockRecord`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (bpmRecordId) config.headers[Enums.HEADER_BPM_RECORD_ID] = bpmRecordId
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    if (logProcessId) config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId

    return executeRequest(config)
  }
}

export default BPM
