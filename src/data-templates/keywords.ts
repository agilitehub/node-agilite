const data = {
  emptyObject: {},
  emptyDataObject: {
    data: {}
  },
  emptyValues: {
    data: {
      key: '',
      values: []
    }
  },
  invalidValues: {
    invalidObject: {
      data: {
        key: '',
        values: ['']
      }
    },
    invalidLabel: {
      data: {
        key: '',
        values: [
          {
            labe: 'label1',
            value: 'value1'
          }
        ]
      }
    },
    invalidValue: {
      data: {
        key: '',
        values: [
          {
            label: 'label1',
            valu: 'value1'
          }
        ]
      }
    }
  },
  new: {
    data: {
      key: '',
      values: [{
        'label': 'key1',
        'value': 'value1'
      }]
    }
  },
  modified: {
    data: {
      key: '',
      groupName: '',
      values: [{
        'label': 'key11',
        'value': 'value11'
      }]
    }
  }
}

export = data
