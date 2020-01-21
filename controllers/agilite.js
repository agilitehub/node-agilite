'use strict'

const Enums = require('../utils/enums')
const ApiKeys = require('./api-keys')
const Keywords = require('./keywords')
const Numbering = require('./numbering')
const Connectors = require('./connectors')
const DataMappings = require('./datamappings')
const Templates = require('./templates')
const BPM = require('./bpm')
const Roles = require('./roles')
const Files = require('./files')
const Utils = require('./utils')
const TierStructures = require('./tierstructures')
const BatchActions = require('./batchactions')
const Events = require('./events')
const BatchLogging = require('./batchlogging')
const Utilities = require('../utils/utils')

class Agilite {
  constructor (config) {
    const apiServerUrl = config.apiServerUrl || Enums.URL_API_SERVER
    const apiKey = config.apiKey || Enums.STRING_EMPTY
    const teamId = config.teamId

    this.config = {
      apiServerUrl,
      apiKey,
      teamId
    }

    this.ApiKeys = new ApiKeys(config)
    this.Keywords = new Keywords(config)
    this.Numbering = new Numbering(config)
    this.Connectors = new Connectors(config)
    this.DataMappings = new DataMappings(config)
    this.Templates = new Templates(config)
    this.BPM = new BPM(config)
    this.Roles = new Roles(config)
    this.Files = new Files(config)
    this.Utils = new Utils(config)
    this.TierStructures = new TierStructures(config)
    this.BatchActions = new BatchActions(config)
    this.Events = new Events(config)
    this.BatchLogging = new BatchLogging(config)

    this.appName = {
      MODULE_KEY_API_KEYS: 'apikeys',
      MODULE_KEY_KEYWORDS: 'keywords',
      MODULE_KEY_NUMBERING: 'numbering',
      MODULE_KEY_CONNECTORS: 'connectors',
      MODULE_KEY_DATA_MAPPING: 'datamappings',
      MODULE_KEY_TEMPLATES: 'templates',
      MODULE_KEY_BPM: 'bpm',
      MODULE_KEY_ROLES: 'roles',
      MODULE_KEY_BOT_BUILDER: 'botbuilder',
      MODULE_KEY_FILES: 'files',
      MODULE_KEY_UTILS: 'utils',
      MODULE_KEY_TIER_STRUCTURES: 'tierstructures',
      MODULE_KEY_BATCH_ACTIONS: 'batchactions',
      MODULE_KEY_EVENTS: 'events',
      MODULE_KEY_BATCH_LOGGING: 'batchlogging'
    }

    this.reqType = {
      GET: 'get',
      POST: 'post',
      PUT: 'put',
      DELETE: 'delete'
    }
  }

  getConfig () {
    return this.config
  }

  executeCRUDRequest (appName = '', reqType = '', data = {}, headers = {}) {
    return Utilities.executeCRUDRequest(this.config.apiServerUrl, this.config.apiKey, this.config.teamId, appName, reqType, data, headers)
  }
}

module.exports = Agilite
