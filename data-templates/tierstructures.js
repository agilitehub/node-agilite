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
      description: 'This is Tier 1',
      notes: 'Tier 1 Notes',
      values: [{
        'label': 'key1',
        'value': 'value1'
      },
      {
        'label': 'key2',
        'value': 'value2'
      }
      ],
      tierEntries: [{
        key: 'tier2',
        description: 'This is Tier 2',
        notes: 'Tier 2 Notes',
        values: [{
          'label': 'key11',
          'value': 'value11'
        },
        {
          'label': 'key22',
          'value': 'value22'
        }
        ]
      }]
    }
  }
}

module.exports = data
