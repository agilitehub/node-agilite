const data = {
  emptyObject: {},
  emptyDataObject: {
    data: {}
  },
  new: {
    data: {
      isActive: true,
      key: '',
      description: '',
      groupName: '',
      parentId: null,
      actions: [{
        actionType: 'connectors/execute',
        profileKey: 'key',
        routeKey: 'route'
      }]
    }
  },
  modified: {
    data: {
      isActive: true,
      key: '',
      description: 'Test Description',
      groupName: 'Test Group Name',
      parentId: null,
      actions: [{
        actionType: 'connectors/execute',
        profileKey: 'key_modified',
        routeKey: 'route_modified'
      }]
    }
  }
}

module.exports = data
