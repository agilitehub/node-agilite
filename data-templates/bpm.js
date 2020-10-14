const data = {
  emptyObject: {},
  responsibleUser: ['johann@agilite.io'],
  emptyDataObject: {
    data: {}
  },
  dataObject: {
    data: {
      name: ''
    }
  },
  new: {
    data: {
      key: '',
      name: ''
    }
  },
  modified: {
    data: {
      key: '',
      name: '',
      description: '',
      groupName: '',
      appUrl: '',
      referenceUrl: '',
      appAdmin: '',
      notes: '',
      solutions: [],
      processSteps: [{
        _id: '',
        isActive: true,
        firstStep: true,
        key: 'first_step',
        name: 'First Step',
        description: 'Auto Generated First Step. This can be modified',
        instructions: '',
        duration: '0',
        processStage: 'Draft',
        responsibility: '1',
        responsibleRole: 'Originator',
        eventStamp: [
          'DateCreated'
        ],
        roleLevels: [],
        visibleObjects: [],
        stepOptions: [{
          _id: '',
          isNewEntry: false,
          isActive: true,
          key: 'submit',
          name: 'Submit',
          description: 'Auto Generated Option. This can be modified',
          eventStamp: [
            'DateSubmitted'
          ],
          nextStep: '',
          visibleObjects: [],
          notes: ''
        }],
        notes: '',
        referenceUrl: '',
        notificationTemplate: ''
      }]
    }
  }
}

module.exports = data
