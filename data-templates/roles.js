const data = {
  emptyObject: {},
  emptyDataObject: {
    data: {}
  },
  new: {
    data: {
      name: '',
      responsibleUser: ['roles.user1@acme.com']
    }
  },
  modified: {
    data: {
      isActive: true,
      isHidden: true,
      name: '',
      description: 'Test Description',
      groupName: 'Test Group',
      responsibleUser: ['roles.user2@acme.com'],
      surrogateUser: 'roles.surrogate@acme.com',
      levels: ['level2', 'level3']
    }
  },
  modified1: {
    data: {
      isActive: true,
      isHidden: true,
      name: '',
      description: 'Test Description',
      groupName: 'Test Group',
      responsibleUser: ['roles.user2@acme.com'],
      surrogateUser: 'roles.surrogate@acme.com',
      levels: ['level1']
    }
  }
}

module.exports = data
