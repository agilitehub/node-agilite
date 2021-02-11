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

  postData (data = {}, logProcessId = null) {
    let headers = {}

    if (logProcessId !== undefined && logProcessId !== null) {
      headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    }

    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_KEYWORDS, Enums.METHOD_POST, data, headers)
  }

  getData (profileKeys = [], recordIds = [], slimResult = true, logProcessId = null) {
    let headers = {}

    if (logProcessId !== undefined && logProcessId !== null) {
      headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    }

    headers[Enums.HEADER_PROFILE_KEYS] = profileKeys.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_RECORD_IDS] = recordIds.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_SLIM_RESULT] = slimResult

    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_KEYWORDS, Enums.METHOD_GET, null, headers)
  }

  putData (recordId = '', data = {}, logProcessId = null) {
    let headers = {}

    if (logProcessId !== undefined && logProcessId !== null) {
      headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    }

    headers[Enums.HEADER_RECORD_ID] = recordId

    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_KEYWORDS, Enums.METHOD_PUT, data, headers)
  }

  deleteData (recordId = '', logProcessId = null) {
    let headers = {}

    if (logProcessId !== undefined && logProcessId !== null) {
      headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    }

    headers[Enums.HEADER_RECORD_ID] = recordId

    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_KEYWORDS, Enums.METHOD_DELETE, null, headers)
  }

  getValuesByProfileKey (profileKey = '', sort = '', outputFormat = '', logProcessId = null) {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_KEYWORDS}/getValuesByProfileKey`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessId !== undefined && logProcessId !== null) {
      config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
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

  setValuesByProfileKey (profileKey = '', values = [], logProcessId = null) {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_KEYWORDS}/setValuesByProfileKey`,
      method: Enums.METHOD_POST,
      headers: {},
      body: {}
    }

    if (logProcessId !== undefined && logProcessId !== null) {
      config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    }

    if (profileKey !== undefined && profileKey !== null) {
      config.headers[Enums.HEADER_PROFILE_KEY] = profileKey
    }

    if (values !== undefined && values !== null) {
      config.body = values
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utils.executeRequest(config)
  }

  getProfileKeysByGroup (groupName = '', sort = '', logProcessId = null) {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_KEYWORDS}/getProfileKeysByGroup`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessId !== undefined && logProcessId !== null) {
      config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
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

  getLabelByValue (profileKey = '', value = '', outputFormat = '', logProcessId = null) {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_KEYWORDS}/getLabelByValue`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessId !== undefined && logProcessId !== null) {
      config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
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

  setLabelByValue (profileKey = '', valueKey = '', label = '', logProcessId = null) {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_KEYWORDS}/setLabelByValue`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessId !== undefined && logProcessId !== null) {
      config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    }

    if (profileKey !== undefined && profileKey !== null) {
      config.headers[Enums.HEADER_PROFILE_KEY] = profileKey
    }

    if (valueKey !== undefined && valueKey !== null) {
      config.headers[Enums.HEADER_VALUE_KEY] = valueKey
    }

    if (label !== undefined && label !== null) {
      config.headers[Enums.HEADER_LABEL] = label
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utils.executeRequest(config)
  }

  getValueByLabel (profileKey = '', label = '', outputFormat = '', logProcessId = null) {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_KEYWORDS}/getValueByLabel`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessId !== undefined && logProcessId !== null) {
      config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
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

  setValueByLabel (profileKey = '', labelKey = '', value = '', logProcessId = null) {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_KEYWORDS}/setValueByLabel`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessId !== undefined && logProcessId !== null) {
      config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    }

    if (profileKey !== undefined && profileKey !== null) {
      config.headers[Enums.HEADER_PROFILE_KEY] = profileKey
    }

    if (labelKey !== undefined && labelKey !== null) {
      config.headers[Enums.HEADER_LABEL_KEY] = labelKey
    }

    if (value !== undefined && value !== null) {
      config.headers[Enums.HEADER_VALUE] = value
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
