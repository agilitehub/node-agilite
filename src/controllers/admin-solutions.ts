import { Enums } from '../utils/enums'
import { executeCRUDRequest } from '../utils/utils.js'
import { Config } from './agilite'

interface OutputFormat {
  JSON: string
  STRING: string
}

class AdminSolutions {
  apiServerUrl: string = ''
  apiKey: string = ''
  teamId: string = ''
  outputFormat: OutputFormat

  constructor (config: Config) {
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

  postData (data: any = {}) {
    const headers: any = {}
    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_ADMIN_SOLUTIONS, Enums.METHOD_POST, data, headers)
  }

  getData () {
    const headers: any = {}
    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_ADMIN_SOLUTIONS, Enums.METHOD_GET, null, headers)
  }

  putData (recordId: string = '', data: any = {}) {
    const headers: any = {}
    headers[Enums.HEADER_RECORD_ID] = recordId
    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_ADMIN_SOLUTIONS, Enums.METHOD_PUT, data, headers)
  }

  deleteData (recordId: string = '') {
    const headers: any = {}
    headers[Enums.HEADER_RECORD_ID] = recordId
    return executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_ADMIN_SOLUTIONS, Enums.METHOD_DELETE, null, headers)
  }
}

export default AdminSolutions
