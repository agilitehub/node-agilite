'use strict'

import {config} from 'dotenv'
config()

import TypeDetect from 'type-detect'
import {expect} from 'chai'
import Agilite from '../dist/controllers/agilite'
import EnumsTypeDetect from '../dist/utils/enums-type-detect'

const agilite = new Agilite({
  apiServerUrl: process.env.API_SERVER_URL,
  apiKey: process.env.API_KEY
})

describe('Agilit-e Utils', () => {
  let data = null

  it('XML To JS', () => {
    agilite.Utils.XMLToJS("<xml>Some Data</xml>")
    .then((response) => {
      expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)

      data = response.data
    })
    .catch((err) => {})
  })

  it('XML To JS - Invalid Params', () => {
    agilite.Utils.XMLToJS(null)
    .then((response) => {})
    .catch((err) => {
      expect(err.response.data.errorMessage).to.equal('Incorrect Object Type: null. string Required')
    })
  })

  it('JS To XML', () => {
    agilite.Utils.JSToXML(data)
    .then((response) => {
      expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)

      data = response.data
    })
    .catch((err) => {})
  })

  it('JS To XML - Invalid Params', () => {
    agilite.Utils.JSToXML(null)
    .then((response) => {})
    .catch((err) => {
      expect(err.response.data.errorMessage).to.equal('Incorrect Object Type: null. object Required')
    })
  })

  it('Encode XML', () => {
    agilite.Utils.encodeXML(data)
    .then((response) => {
      expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)

      data = response.data
    })
    .catch((err) => {})
  })

  it('Encode XML - Invalid Params', () => {
    agilite.Utils.encodeXML(null)
    .then((response) => {})
    .catch((err) => {
      expect(err.response.data.errorMessage).to.equal('Incorrect Object Type: null. string Required')
    })
  })

  it('Decode XML', () => {
    agilite.Utils.decodeXML(data)
    .then((response) => {
      expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)
    })
    .catch((err) => {})
  })

  it('Decode XML - Invalid Params', () => {
    agilite.Utils.decodeXML(null)
    .then((response) => {})
    .catch((err) => {
      expect(err.response.data.errorMessage).to.equal('Incorrect Object Type: null. string Required')
    })
  })

  it('Format Date Time', () => {
    agilite.Utils.formatDateTime('1 January 2000', 'YYYY/MM/DD')
    .then((response) => {
      expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)
      expect(response.data).to.equal('2000/01/01')
    })
    .catch((err) => {})
  })

  it('Format Date Time - No Value and Format Params', () => {
    agilite.Utils.formatDateTime()
    .then((response) => {})
    .catch((err) => {
      expect(err.response.data.errorMessage).to.equal("No Date/Time value was specified in the 'date-time-value' header parameter")
    })
  })

  it('Generate UUID', () => {
    agilite.Utils.generateUUID()
    .then((response) => {
      expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)
    })
    .catch((err) => {})
  })

  it('HTML To JSON', () => {
    agilite.Utils.html2json('<html><head></head><body>HTML Body</body></html>')
    .then((response) => {
      expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
    })
    .catch((err) => {})
  })

  it('Generate PDF', () => {
    agilite.Utils.generatePDF()
    .then((response) => {
      expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
      expect(response.data).to.haveOwnProperty('data')
      expect(response.data.data).to.haveOwnProperty('fileName')
      expect(response.data.data).to.haveOwnProperty('contentType')
    })
    .catch((err) => {})
  })
})