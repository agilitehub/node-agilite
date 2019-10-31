'use strict'

require('dotenv').config()
const TypeDetect = require('type-detect')
const expect = require('chai').expect
const Agilite = require('../controllers/agilite')
const EnumsTypeDetect = require('../utils/enums-type-detect')

const agilite = new Agilite({
  apiServerUrl: process.env.API_SERVER_URL,
  apiKey: process.env.API_KEY
})

describe('Agilit-e Utils', () => {
  let data = null

  it('XML To JS', () => {
    agilite.Utils.XMLToJS('<xml>Some Data</xml>')
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
        expect(response.data).to.haveOwnProperty('elements')
        expect(TypeDetect(response.data.elements)).to.equal(EnumsTypeDetect.ARRAY)
        expect(response.data.elements.length).to.equal(1)

        data = response.data
      })
  })

  it('XML To JS - Invalid Params', () => {
    agilite.Utils.XMLToJS(null)
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
  })

  it('JS To XML - Invalid Params', () => {
    agilite.Utils.JSToXML(null)
      .catch((err) => {
        expect(err.response.data.errorMessage).to.equal('Incorrect Object Type: null. object Required')
      })
  })

  it('Encode XML', () => {
    agilite.Utils.encodeXML('<XML>Hello World</XML>')
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)

        data = response.data
      })
  })

  it('Encode XML - Invalid Params', () => {
    agilite.Utils.encodeXML(null)
      .catch((err) => {
        expect(err.response.data.errorMessage).to.equal('Incorrect Object Type: null. string Required')
      })
  })

  it('Decode XML', () => {
    agilite.Utils.decodeXML('&lt;XML&gt;Hello World&lt;/XML&gt;')
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)
      })
  })

  it('Decode XML - Invalid Params', () => {
    agilite.Utils.decodeXML(null)
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
  })

  it('Format Date Time - No Value and Format Params', () => {
    agilite.Utils.formatDateTime()
      .catch((err) => {
        expect(err.response.data.errorMessage).to.equal("No Date/Time value was specified in the 'date-time-value' header parameter")
      })
  })

  it('Generate UUID', () => {
    agilite.Utils.generateUUID()
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.STRING)
      })
  })

  it('HTML To JSON', () => {
    agilite.Utils.html2json('<html><head></head><body>HTML Body</body></html>')
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
      })
  })

  it('Generate PDF', () => {
    agilite.Utils.generatePDF()
      .then((response) => {
        expect(TypeDetect(response.data)).to.equal(EnumsTypeDetect.OBJECT)
        expect(response.data).to.haveOwnProperty('data')
        expect(response.data.data).to.haveOwnProperty('fileName')
        expect(response.data.data).to.haveOwnProperty('contentType')
      })
  })
})
