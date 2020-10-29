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
      isActive: true,
      description: '',
      groupName: '',
      appUrl: '',
      referenceUrl: '',
      appAdmin: '',
      notes: '',
      solutions: [],
      keywords: [],
      processSteps: [{
        _id: '',
        isNewEntry: true,
        isActive: true,
        stepType: '1',
        key: 'first_step',
        name: 'First Step',
        description: 'Auto Generated First Step. This can be modified',
        instructions: '',
        duration: '0',
        processStage: 'Draft',
        responsibility: '1',
        responsibleRole: 'Originator',
        eventStamp: [{ value: 'DateCreated' }],
        roleLevels: [],
        visibleObjects: [],
        stepOptions: [{
          _id: '',
          isNewEntry: false,
          isActive: true,
          key: 'submit',
          name: 'Submit',
          description: 'Auto Generated Option. This can be modified',
          eventStamp: [{ value: 'DateSubmitted' }],
          nextStep: '',
          visibleObjects: [],
          notes: '',
          iln: {
            name: {
              en: 'Submit'
            },
            description: {
              en: 'Auto Generated Option. This can be modified'
            }
          },
          keywords: []
        }],
        notes: '',
        referenceUrl: '',
        notificationTemplate: '',
        iln: {
          name: {
            en: 'First Step'
          },
          description: {
            en: 'Auto Generated First Step. This can be modified'
          },
          processStage: {
            en: 'Draft'
          }
        },
        keywords: []
      }],
      iln: {
        name: {
          en: 'asdasd'
        }
      },
      numberingId: ''
    }
  }
}

module.exports = data
