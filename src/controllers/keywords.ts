import { Enums, AxiosConfig } from '../utils/enums'
import { executeCRUDRequest, executeRequest } from '../utils/utils'
import { Config } from './agilite'

interface OutputFormat {
  JSON: string
  STRING: string
}

interface Sort {
  ASC: string,
  DESC: string,
  ASC_VALUE: string,
  DESC_VALUE: string
}

interface Values {
  label: string,
  value: string
}

class Keywords {
  apiServerUrl: string = ''
  apiKey: string = ''
  teamId: string = ''
  outputFormat: OutputFormat = {
    JSON: Enums.VALUE_JSON_LOWER,
    STRING: Enums.VALUE_STRING_LOWER
  }
  sort: Sort = {
    ASC: 'asc',
    DESC: 'desc',
    ASC_VALUE: 'asc_value',
    DESC_VALUE: 'desc_value'
  }

  constructor (config: Config) {
    if (config) {
      this.apiServerUrl = config.apiServerUrl
      this.apiKey = config.apiKey
      this.teamId = config.teamId
    }
  }

  postData (data: any = {}, logProcessId: string = '') {
    let headers: any = {}

    if (logProcessId)  headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId

    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_KEYWORDS, Enums.METHOD_POST, data, headers)
  }

  getData (profileKeys: Array<string> = [], recordIds: Array<string> = [], slimResult: boolean = true, logProcessId: string = '') {
    let headers: any = {}

    if (logProcessId) headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId

    headers[Enums.HEADER_PROFILE_KEYS] = profileKeys.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_RECORD_IDS] = recordIds.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_SLIM_RESULT] = slimResult

    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_KEYWORDS, Enums.METHOD_GET, null, headers)
  }

  putData (recordId: string = '', data: any = {}, logProcessId: string = '') {
    let headers: any = {}

    if (logProcessId) headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId

    headers[Enums.HEADER_RECORD_ID] = recordId

    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_KEYWORDS, Enums.METHOD_PUT, data, headers)
  }

  deleteData (recordId: string = '', logProcessId: string = '') {
    let headers: any = {}

    if (logProcessId) headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId

    headers[Enums.HEADER_RECORD_ID] = recordId

    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_KEYWORDS, Enums.METHOD_DELETE, null, headers)
  }

  getValuesByProfileKey (profileKey: string = '', sort: string = '', outputFormat: string = '', logProcessId: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_KEYWORDS}/getValuesByProfileKey`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessId) config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    if (profileKey) config.headers[Enums.HEADER_PROFILE_KEY] = profileKey
    if (sort) config.headers[Enums.HEADER_SORT] = sort
    if (outputFormat) config.headers[Enums.HEADER_OUTPUT_FORMAT] = outputFormat
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  setValuesByProfileKey (profileKey: string = '', values: Array<Values> = [], logProcessId: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_KEYWORDS}/setValuesByProfileKey`,
      method: Enums.METHOD_POST,
      headers: {},
      data: {}
    }

    if (logProcessId) config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    if (profileKey) config.headers[Enums.HEADER_PROFILE_KEY] = profileKey
    if (values) config.data = values
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  getProfileKeysByGroup (groupName: string = '', sort: string = '', logProcessId: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_KEYWORDS}/getProfileKeysByGroup`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessId) config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    if (groupName) config.headers[Enums.HEADER_GROUP_NAME] = groupName
    if (sort) config.headers[Enums.HEADER_SORT] = sort
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  getLabelByValue (profileKey: string = '', value: string = '', outputFormat: string = '', logProcessId: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_KEYWORDS}/getLabelByValue`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessId) config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    if (profileKey) config.headers[Enums.HEADER_PROFILE_KEY] = profileKey
    if (value) config.headers[Enums.HEADER_VALUE_KEY] = value
    if (outputFormat) config.headers[Enums.HEADER_OUTPUT_FORMAT] = outputFormat
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  setLabelByValue (profileKey: string = '', valueKey: string = '', label: string = '', logProcessId: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_KEYWORDS}/setLabelByValue`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessId) config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    if (profileKey) config.headers[Enums.HEADER_PROFILE_KEY] = profileKey
    if (valueKey) config.headers[Enums.HEADER_VALUE_KEY] = valueKey
    if (label) config.headers[Enums.HEADER_LABEL] = label
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  getValueByLabel (profileKey: string = '', label: string = '', outputFormat: string = '', logProcessId: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_KEYWORDS}/getValueByLabel`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessId) config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    if (profileKey) config.headers[Enums.HEADER_PROFILE_KEY] = profileKey
    if (label) config.headers[Enums.HEADER_LABEL_KEY] = label
    if (outputFormat) config.headers[Enums.HEADER_OUTPUT_FORMAT] = outputFormat
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  setValueByLabel (profileKey: string = '', labelKey: string = '', value: string = '', logProcessId: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_KEYWORDS}/setValueByLabel`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (logProcessId) config.headers[Enums.HEADER_LOG_PROCESS_ID] = logProcessId
    if (profileKey) config.headers[Enums.HEADER_PROFILE_KEY] = profileKey
    if (labelKey) config.headers[Enums.HEADER_LABEL_KEY] = labelKey
    if (value) config.headers[Enums.HEADER_VALUE] = value
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }
}

export default Keywords
