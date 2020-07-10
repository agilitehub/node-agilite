'use strict'

require('dotenv').config()
const UUID = require('uuid')
const fs = require('fs')
const TypeDetect = require('type-detect')
const expect = require('chai').expect
const Agilite = require('../controllers/agilite')
const EnumsTypeDetect = require('../utils/enums-type-detect')
const Enums = require('../utils/enums')

const agilite = new Agilite({
  apiServerUrl: process.env.API_SERVER_URL,
  apiKey: process.env.API_KEY
})

describe('Agilit-e Files', () => {
  const groupName = UUID.v1()
  const invalidValue = 'invalid_value'

  let mainEntry = null
  let tmpEntry = null
  let recordId = null
  let key = UUID.v1()

  it('Upload New File - No Params (Negative)', (done) => {
    agilite.Files.uploadFile()
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message

        // console.log(err.response)
        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('Please provide a File Name in the \'file-name\' header parameter')
      })
      .then(done, done)
  })

  it('Upload New File - Empty File Name (Negative)', (done) => {
    agilite.Files.uploadFile('')
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.OBJECT)

        // Check if errorMessage exists and contains correct error message

        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('Please provide a File Name in the \'file-name\' header parameter')
      })
      .then(done, done)
  })

  // TODO: Upload File - Valid File name, Empty Content Type, Empty data, persistFile true, isPublic true
  // Upload File - Empty File name, Valid Content Type, Empty data, persistFile true, isPublic true
  // Upload File - Empty File name, Empty Content Type, Valid data, persistFile true, isPublic true
  // Upload File - Empty File name, Empty Content Type, Empty data, persistFile true, isPublic true
  // Upload File - Array File name, Empty Content Type, Empty data, persistFile true, isPublic true
  // Upload File - Empty File name, Array Content Type, Empty data, persistFile true, isPublic true
  // Upload File - Empty File name, Empty Content Type, String data, persistFile true, isPublic true
  // Upload File - Valid File name, Valid Content Type, Empty data, persistFile true, isPublic true
  // Upload File - Valid File name, Valid Content Type, Valid data, persistFile empty, isPublic empty
  // Upload File - Valid File name, Valid Content Type, Valid data, persistFile true, isPublic empty
  // Upload File - Valid File name, Valid Content Type, Valid data, persistFile empty, isPublic true
  // Upload File - Valid File name, Valid Content Type, Valid data, persistFile string, isPublic empty
  // Upload File - Valid File name, Valid Content Type, Valid data, persistFile empty, isPublic string
  // Upload File - Valid File name, Valid Content Type, Valid data, persistFile number, isPublic empty
  // Upload File - Valid File name, Valid Content Type, Valid data, persistFile empty, isPublic number
  // Upload File - Valid File name, Valid Content Type, Valid data, persistFile array, isPublic empty
  // Upload File - Valid File name, Valid Content Type, Valid data, persistFile empty, isPublic array

  it('Get File - No Params (Negative)', (done) => {
    agilite.Files.getFile()
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.UINT8ARRAY)

        // Check if errorMessage exists and contains correct error message
        err.response.data = JSON.parse(err.response.data.toString())

        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('No Id was specified in the \'record-id\' header parameter')
      })
      .then(done, done)
  })

  it('Get File - Empty Record Id (Negative)', (done) => {
    agilite.Files.getFile('')
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.UINT8ARRAY)

        // Check if errorMessage exists and contains correct error message
        err.response.data = JSON.parse(err.response.data.toString())

        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('No Id was specified in the \'record-id\' header parameter')
      })
      .then(done, done)
  })

  it('Get File - Invalid Record Id (Negative)', (done) => {
    agilite.Files.getFile(invalidValue)
      .catch((err) => {
        expect(err).to.haveOwnProperty('response')
        expect(err.response.status).to.equal(400)
        expect(err.response).to.haveOwnProperty('data')
        expect(TypeDetect(err.response.data)).to.equal(EnumsTypeDetect.UINT8ARRAY)

        // Check if errorMessage exists and contains correct error message
        err.response.data = JSON.parse(err.response.data.toString())

        expect(err.response.data).to.haveOwnProperty('errorMessage')
        expect(err.response.data.errorMessage).to.equal('Please provide a valid Record Id in the \'record-id\' header parameter')
      })
      .then(done, done)
  })

  // TODO: Get File - Empty Record ID, responseType string, logProcessId empty
  // Get File - Empty Record ID, responseType number, logProcessId empty
  // Get File - Empty Record ID, responseType array, logProcessId empty
  // Get File - Empty Record ID, responseType empty, logProcessId string
  // Get File - Empty Record ID, responseType empty, logProcessId number
  // Get File - Empty Record ID, responseType empty, logProcessId array
  // Get File - String Record ID, responseType empty, logProcessId empty
  // Get File - Number Record ID, responseType empty, logProcessId empty
  // Get File - Array Record ID, responseType empty, logProcessId empty
  // Get File - object Record ID, responseType empty, logProcessId empty
  // Get File - Valid Record ID, responseType empty, logProcessId empty
  // Get File - Valid Record ID, responseType string, logProcessId empty
  // Get File - Valid Record ID, responseType number, logProcessId empty
  // Get File - Valid Record ID, responseType array, logProcessId empty
  // Get File - Valid Record ID, responseType object, logProcessId empty
  // Get File - Valid Record ID, responseType valid, logProcessId empty
  // Get File - Valid Record ID, responseType valid, logProcessId number
  // Get File - Valid Record ID, responseType valid, logProcessId string
  // Get File - Valid Record ID, responseType valid, logProcessId object
  // Get File - Valid Record ID, responseType valid, logProcessId array
})
