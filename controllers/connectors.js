'use strict'

const Enums = require('../utils/enums')
const Utils = require('../utils/utils.js')

class Connectors {
  constructor (config) {
    this.apiServerUrl = null
    this.apiKey = null
    this.teamId = null

    if (config) {
      this.apiServerUrl = config.apiServerUrl
      this.apiKey = config.apiKey
      this.teamId = config.teamId
    }
  }

  postData (data = {}) {
    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_CONNECTORS, Enums.METHOD_POST, data)
  }

  getData (profileKeys = [], recordIds = [], slimResult = true) {
    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_CONNECTORS, Enums.METHOD_GET, null, null, profileKeys, recordIds, slimResult)
  }

  putData (recordId = '', data = {}, resetService = false) {
    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_CONNECTORS, Enums.METHOD_PUT, data, recordId, null, null, null, null, resetService)
  }

  deleteData (recordId = '') {
    return Utils.executeCRUDRequest(this.apiServerUrl, this.apiKey, this.teamId, Enums.MODULE_KEY_CONNECTORS, Enums.METHOD_DELETE, null, recordId)
  }

  execute (profileKey = '', routeKey = '', data = {}) {
    let config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_CONNECTORS}/execute`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    config.headers[Enums.HEADER_API_KEY] = this.apiKey
    config.headers[Enums.HEADER_CONTENT_TYPE] = Enums.HEADER_APPLICATION_JSON

    config.headers[Enums.HEADER_PROFILE_KEY] = profileKey
    config.headers[Enums.HEADER_ROUTE_KEY] = routeKey

    if (this.teamId !== undefined && this.teamId !== null) {
      config.headers[Enums.HEADER_TEAM_NAME] = this.teamId
    }

    return Utils.executeRequest(config)
  }
}

module.exports = Connectors
