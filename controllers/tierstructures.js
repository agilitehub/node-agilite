'use strict'

const Enums = require('../utils/enums')
const Utils = require('../utils/utils.js')

class TierStructures {
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
    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_TIER_STRUCTURES, Enums.METHOD_POST, data)
  }

  getData (profileKeys = [], recordIds = [], slimResult = true) {
    let headers = {}

    headers[Enums.HEADER_PROFILE_KEYS] = profileKeys.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_RECORD_IDS] = recordIds.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_SLIM_RESULT] = slimResult

    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_TIER_STRUCTURES, Enums.METHOD_GET, null, headers)
  }

  putData (recordId = '', data = {}) {
    let headers = {}
    headers[Enums.HEADER_RECORD_ID] = recordId

    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_TIER_STRUCTURES, Enums.METHOD_PUT, data, headers)
  }

  deleteData (recordId = '') {
    let headers = {}
    headers[Enums.HEADER_RECORD_ID] = recordId

    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_TIER_STRUCTURES, Enums.METHOD_DELETE, null, headers)
  }

  getTierByKey (tierKeys = [], includeValues = true, includeMetaData = false, includeTierEntries = false, sortValues = '', valuesOutputFormat = '') {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_TIER_STRUCTURES}/getTierByKey`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (tierKeys !== undefined && tierKeys !== null) {
      config.headers[Enums.HEADER_TIER_KEYS] = tierKeys.join(Enums.SEPARATOR_COMMA)
    }

    if (includeValues !== undefined && includeValues !== null) {
      config.headers[Enums.HEADER_INCLUDE_VALUES] = includeValues
    }

    if (includeMetaData !== undefined && includeMetaData !== null) {
      config.headers[Enums.HEADER_INCLUDE_META_DATA] = includeMetaData
    }

    if (includeTierEntries !== undefined && includeTierEntries !== null) {
      config.headers[Enums.HEADER_INCLUDE_TIER_ENTRIES] = includeTierEntries
    }

    if (sortValues !== undefined && sortValues !== null) {
      config.headers[Enums.HEADER_SORT_VALUES] = sortValues
    }

    if (valuesOutputFormat !== undefined && valuesOutputFormat !== null) {
      config.headers[Enums.HEADER_VALUES_OUTPUT_FORMAT] = valuesOutputFormat
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

module.exports = TierStructures
