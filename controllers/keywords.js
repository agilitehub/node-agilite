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
    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_KEYWORDS, Enums.METHOD_GET, null, null, profileKeys, recordIds, slimResult)
  }

  putData (recordId = '', data = {}) {
    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_KEYWORDS, Enums.METHOD_PUT, data, recordId)
  }

  deleteData (recordId = '') {
    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_KEYWORDS, Enums.METHOD_DELETE, null, recordId)
  }

  getByProfileKey (profileKey = '', sort = '', outputFormat = '') {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_KEYWORDS}/getByProfileKey`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    config.headers[Enums.HEADER_API_KEY] = this.apiKey

    config.headers[Enums.HEADER_PROFILE_KEY] = profileKey
    config.headers[Enums.HEADER_SORT] = sort
    config.headers[Enums.HEADER_OUTPUT_FORMAT] = outputFormat

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

    config.headers[Enums.HEADER_API_KEY] = this.apiKey

    config.headers[Enums.HEADER_GROUP_NAME] = groupName
    config.headers[Enums.HEADER_SORT] = sort

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

    config.headers[Enums.HEADER_API_KEY] = this.apiKey

    config.headers[Enums.HEADER_PROFILE_KEY] = profileKey
    config.headers[Enums.HEADER_VALUE_KEY] = value
    config.headers[Enums.HEADER_OUTPUT_FORMAT] = outputFormat

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

    config.headers[Enums.HEADER_API_KEY] = this.apiKey

    config.headers[Enums.HEADER_PROFILE_KEY] = profileKey
    config.headers[Enums.HEADER_LABEL_KEY] = label
    config.headers[Enums.HEADER_OUTPUT_FORMAT] = outputFormat

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utils.executeRequest(config)
  }
}

module.exports = Keywords
