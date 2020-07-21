const data = {
  emptyObject: {},
  emptyDataObject: {
    data: {}
  },
  new: {
    data: {
      isActive: true,
      key: '',
      name: '',
      description: '',
      groupName: '',
      notes: '',
      logLevel: ''
    }
  },
  modified: {
    data: {
      isActive: true,
      key: '',
      name: '',
      description: 'Test Description',
      groupName: 'Test Group Name',
      notes: 'Test Notes',
      logLevel: 'advanced'
    }
  },
  logEntry: {
    error: 'Error 401',
    status: '400',
    module: 'TestBatch'
  }
}

module.exports = data
