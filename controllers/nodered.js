'use strict'

const Enums = require('../utils/enums')
const Utils = require('../utils/utils.js')

class NodeRED {
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

  getFlows () {
    const config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_NODE_RED}/getFlows`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    return Utils.executeRequest(config)
  }

  saveFlows (data) {
    const config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_NODE_RED}/saveFlows`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    return Utils.executeRequest(config)
  }

  getCredentials () {
    const config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_NODE_RED}/getCredentials`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    return Utils.executeRequest(config)
  }

  saveCredentials (data) {
    const config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_NODE_RED}/saveCredentials`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    return Utils.executeRequest(config)
  }

  getSettings () {
    const config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_NODE_RED}/getSettings`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    return Utils.executeRequest(config)
  }

  saveSettings (data) {
    const config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_NODE_RED}/saveSettings`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    return Utils.executeRequest(config)
  }

  getSessions () {
    const config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_NODE_RED}/getSessions`,
      method: Enums.METHOD_GET,
      headers: {}
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    return Utils.executeRequest(config)
  }

  saveSessions (data) {
    const config = {
      url: `${this.apiServerUrl}/${Enums.MODULE_KEY_NODE_RED}/saveSessions`,
      method: Enums.METHOD_POST,
      headers: {},
      data
    }

    if (this.apiKey !== undefined && this.apiKey !== null) {
      config.headers[Enums.HEADER_API_KEY] = this.apiKey
    }

    return Utils.executeRequest(config)
  }
}

module.exports = NodeRED
