import * as Enums from '../utils/enums'
import Utilities from '../utils/utils'

import ApiKeys from './api-keys'
// import Keywords from './keywords'
// import Numbering from './numbering'
// import Connectors from './connectors'
// import DataMappings from './datamappings'
// import Templates from './templates'
// import BPM from './bpm'
// import Roles from './roles'
// import Files from './files'
// import Utils from './utils'
// import TierStructures from './tierstructures'

import AgiliteClass from 'Agilite'
import ApiKeysClass from 'ApiKeys'

class Agilite extends AgiliteClass {
  public config: any

  ApiKeys: ApiKeysClass
  // Keywords: Keywords
  // Numbering: Numbering
  // Connectors: Connectors
  // DataMappings: DataMappings
  // Templates: Templates
  // BPM: BPM
  // Roles: Roles
  // Files: Files
  // Utils: Utils
  // TierStructures: TierStructures

  appName: any
  reqType: any

  constructor (config: any) {
    super(config)

    let apiServerUrl = config.apiServerUrl || Enums.URL_API_SERVER
    let apiKey = config.apiKey || Enums.STRING_EMPTY
    let teamId = config.teamId

    this.config = {
      apiServerUrl,
      apiKey,
      teamId
    }

    this.ApiKeys = new ApiKeys(config)
    // this.Keywords = new Keywords(config)
    // this.Numbering = new Numbering(config)
    // this.Connectors = new Connectors(config)
    // this.DataMappings = new DataMappings(config)
    // this.Templates = new Templates(config)
    // this.BPM = new BPM(config)
    // this.Roles = new Roles(config)
    // this.Files = new Files(config)
    // this.Utils = new Utils(config)
    // this.TierStructures = new TierStructures(config)

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
      MODULE_KEY_TIER_STRUCTURES: 'tierstructures'
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

export = Agilite
