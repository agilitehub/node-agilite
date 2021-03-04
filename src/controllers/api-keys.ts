import { Enums, AxiosConfig } from '../utils/enums'
import { executeCRUDRequest, executeRequest } from '../utils/utils'
import { Config } from './agilite'

class ApiKeys {
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

  postData (data: any = {}) {
    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_API_KEYS, Enums.METHOD_POST, data)
  }

  getData (profileKeys: Array<string> = [], recordIds: Array<string> = [], slimResult: boolean = true) {
    let headers: any = {}

    headers[Enums.HEADER_PROFILE_KEYS] = profileKeys.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_RECORD_IDS] = recordIds.join(Enums.SEPARATOR_COMMA)
    headers[Enums.HEADER_SLIM_RESULT] = slimResult

    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_API_KEYS, Enums.METHOD_GET, null, headers)
  }

  putData (recordId: string = '', data: any = {}) {
    let headers: any = {}

    headers[Enums.HEADER_RECORD_ID] = recordId
  
    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_API_KEYS, Enums.METHOD_PUT, data, headers)
  }

  deleteData (recordId: string = '') {
    let headers: any = {}
  
    headers[Enums.HEADER_RECORD_ID] = recordId

    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_API_KEYS, Enums.METHOD_DELETE, null, headers)
  }

  generateApiKey (recordId: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_API_KEYS}/generate`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (recordId) config.headers[Enums.HEADER_RECORD_ID] = recordId
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  resetApiKeys (recordId: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_API_KEYS}/reset`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (recordId) config.headers[Enums.HEADER_RECORD_ID] = recordId
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  disableApiKey (recordId: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_API_KEYS}/disable`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (recordId) config.headers[Enums.HEADER_RECORD_ID] = recordId
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }

  enableApiKey (recordId: string = '') {
    let config: AxiosConfig = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_API_KEYS}/enable`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (recordId) config.headers[Enums.HEADER_RECORD_ID] = recordId
    if (this.apiKey) config.headers[Enums.HEADER_API_KEY] = this.apiKey
    if (this.teamId) config.headers[Enums.HEADER_TEAM_NAME] = this.teamId

    return executeRequest(config)
  }
}

export default ApiKeys
