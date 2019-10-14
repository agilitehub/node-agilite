import * as Enums from '../utils/enums'
import Utilities from '../utils/utils'

class Numbering {
  apiServerUrl: any
  apiKey: any
  teamId: any

  outputFormat: any

  constructor (config: any) {
    this.apiServerUrl = null
    this.apiKey = null
    this.teamId = null

    this.outputFormat = {
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
    return Utilities.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_NUMBERING, Enums.METHOD_POST, data)
  }

  getData (profileKeys = [], recordIds = [], slimResult = true) {
    let headers: any = {}

    headers[Enums.HEADER_PROFILE_KEYS] = profileKeys.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_RECORD_IDS] = recordIds.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_SLIM_RESULT] = slimResult

    return Utilities.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_NUMBERING, Enums.METHOD_GET, null, headers)
  }

  putData (recordId = '', data = {}) {
    let headers: any = {}
    headers[Enums.HEADER_RECORD_ID] = recordId

    return Utilities.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_NUMBERING, Enums.METHOD_PUT, data, headers)
  }

  deleteData (recordId = '') {
    let headers: any = {}
    headers[Enums.HEADER_RECORD_ID] = recordId

    return Utilities.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_NUMBERING, Enums.METHOD_DELETE, null, headers)
  }

  generate (profileKey = '', outputFormat = '', data: any = {}) {
    let config: any = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_NUMBERING}/generate`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    config.headers[Enums.HEADER_CONTENT_TYPE] = Enums.HEADER_APPLICATION_JSON

    if (profileKey !== undefined && profileKey !== null) {
      config.headers[Enums.HEADER_PROFILE_KEY] = profileKey
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

    return Utilities.executeRequest(config)
  }

  resetCounters (recordId = '') {
    let config: any = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_NUMBERING}/resetCounters`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (recordId !== undefined && recordId !== null) {
      config.headers[Enums.HEADER_RECORD_ID] = recordId
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

export = Numbering
