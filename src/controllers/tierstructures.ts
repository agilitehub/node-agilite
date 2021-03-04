'use strict'

import { Enums, AxiosConfig } from '../utils/enums'
import { executeRequest, executeCRUDRequest } from '../utils/utils.js'
import { Config } from './agilite'

class TierStructures {
  apiServerUrl: string = ''
  apiKey: string = ''
  teamId: string = ''
  sort: any
  outputFormat: any

  constructor (config: Config) {
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

  postData (data: any = {}, logProcessId: string = '') {
    let headers: any = {}

    if (logProcessId) headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId

    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_TIER_STRUCTURES, Enums.METHOD_POST, data, headers)
  }

  getData (profileKeys: Array<string> = [], recordIds: Array<string> = [], slimResult: boolean = true, logProcessId: string = '') {
    let headers: any = {}

    if (logProcessId) headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId

    headers[Enums.HEADER_PROFILE_KEYS] = profileKeys.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_RECORD_IDS] = recordIds.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_SLIM_RESULT] = slimResult

    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_TIER_STRUCTURES, Enums.METHOD_GET, null, headers)
  }

  putData (recordId: string = '', data: any = {}, logProcessId: string = '') {
    let headers: any = {}

    if (logProcessId) headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId

    headers[Enums.HEADER_RECORD_ID] = recordId

    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_TIER_STRUCTURES, Enums.METHOD_PUT, data, headers)
  }

  deleteData (recordId: string = '', logProcessId: string = '') {
    let headers: any = {}

    if (logProcessId) headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId

    headers[Enums.HEADER_RECORD_ID] = recordId

    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_TIER_STRUCTURES, Enums.METHOD_DELETE, null, headers)
  }

  getTierByKey (tierKeys: Array<string> = [], includeValues: boolean = true, includeMetaData: boolean = false, includeTierEntries: boolean = false, sortValues: string = '', valuesOutputFormat: string = '', logProcessId: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_TIER_STRUCTURES}/getTierByKey`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessId) config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    if (tierKeys) config.headers[Enums.HEADER_TIER_KEYS] = tierKeys.join(Enums.SEPARATOR_COMMA)
    if (includeValues) config.headers[Enums.HEADER_INCLUDE_VALUES] = includeValues
    if (includeMetaData) config.headers[Enums.HEADER_INCLUDE_META_DATA] = includeMetaData
    if (includeTierEntries) config.headers[Enums.HEADER_INCLUDE_TIER_ENTRIES] = includeTierEntries
    if (sortValues) config.headers[Enums.HEADER_SORT_VALUES] = sortValues
    if (valuesOutputFormat) config.headers[Enums.HEADER_VALUES_OUTPUT_FORMAT] = valuesOutputFormat
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }
}

export default TierStructures