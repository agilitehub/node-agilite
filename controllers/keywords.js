'use strict'

const Enums = require('../utils/enums')
const Utils = require('../utils/utils.js')

class Keywords {
  constructor (config) {
    this.apiServerUrl = null
    this.apiKey = null
    this.teamId = null

    this.sort = {
      ASC: 'asc',
      DESC: 'desc',
      ASC_VALUE: 'asc_value',
      DESC_VALUE: 'desc_value'
    }

    this.outputFormat = {
      ARRAY: Enums.VALUE_ARRAY_LOWER,
      JSON: Enums.VALUE_JSON_LOWER,
      STRING: Enums.VALUE_STRING_LOWER
    }

    if (config) {
      this.apiServerUrl = config.apiServerUrl
      this.apiKey = config.apiKey
      this.teamId = config.teamId
    }
  }

  postData (data = {}) {
    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_KEYWORDS, Enums.METHOD_POST, data)
  }

  getData (profileKeys = [], recordIds = [], slimResult = true) {
    let headers = {}

    headers[Enums.HEADER_PROFILE_KEYS] = profileKeys.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_RECORD_IDS] = recordIds.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_SLIM_RESULT] = slimResult

    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_KEYWORDS, Enums.METHOD_GET, null, headers)
  }

  putData (recordId = '', data = {}) {
    let headers = {}
    headers[Enums.HEADER_RECORD_ID] = recordId

    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_KEYWORDS, Enums.METHOD_PUT, data, headers)
  }

  deleteData (recordId = '') {
    let headers = {}
    headers[Enums.HEADER_RECORD_ID] = recordId

    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_KEYWORDS, Enums.METHOD_DELETE, null, headers)
  }

  getByProfileKey (profileKey = '', sort = '', outputFormat = '') {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_KEYWORDS}/getByProfileKey`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (profileKey !== undefined && profileKey !== null) {
      config.headers[Enums.HEADER_PROFILE_KEY] = profileKey
    }

    if (sort !== undefined && sort !== null) {
      config.headers[Enums.HEADER_SORT] = sort
    }

    if (outputFormat !== undefined && outputFormat !== null) {
      config.headers[Enums.HEADER_OUTPUT_FORMAT] = outputFormat
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utils.executeRequest(config)
  }

  getProfileKeysByGroup (groupName = '', sort = '') {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_KEYWORDS}/getProfileKeysByGroup`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (groupName !== undefined && groupName !== null) {
      config.headers[Enums.HEADER_GROUP_NAME] = groupName
    }

    if (sort !== undefined && sort !== null) {
      config.headers[Enums.HEADER_SORT] = sort
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utils.executeRequest(config)
  }

  getLabelByValue (profileKey = '', value = '', outputFormat = '') {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_KEYWORDS}/getLabelByValue`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (profileKey !== undefined && profileKey !== null) {
      config.headers[Enums.HEADER_PROFILE_KEY] = profileKey
    }

    if (value !== undefined && value !== null) {
      config.headers[Enums.HEADER_VALUE_KEY] = value
    }

    if (outputFormat !== undefined && outputFormat !== null) {
      config.headers[Enums.HEADER_OUTPUT_FORMAT] = outputFormat
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utils.executeRequest(config)
  }

  getValueByLabel (profileKey = '', label = '', outputFormat = '') {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_KEYWORDS}/getValueByLabel`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (profileKey !== undefined && profileKey !== null) {
      config.headers[Enums.HEADER_PROFILE_KEY] = profileKey
    }

    if (label !== undefined && label !== null) {
      config.headers[Enums.HEADER_LABEL_KEY] = label
    }

    if (outputFormat !== undefined && outputFormat !== null) {
      config.headers[Enums.HEADER_OUTPUT_FORMAT] = outputFormat
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

module.exports = Keywords
