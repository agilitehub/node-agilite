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
      name: '',
      isActive: true,
      description: 'This is the description for the BPM Profile',
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
          nextStep: 'completed_step',
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
      }, {
        _id: '',
        isNewEntry: true,
        isActive: true,
        stepType: '4',
        key: 'completed_step',
        name: 'Completed Step',
        description: 'Auto Generated Completed Step. This can be modified',
        instructions: '',
        duration: '0',
        processStage: 'Completion',
        responsibility: '1',
        responsibleRole: 'Verifier',
        eventStamp: [{ value: 'DateCompleted' }],
        roleLevels: [],
        visibleObjects: [],
        stepOptions: [],
        notes: '',
        referenceUrl: '',
        notificationTemplate: '',
        iln: {
          name: {
            en: 'Completed Step'
          },
          description: {
            en: 'Auto Generated Completed Step. This can be modified'
          },
          processStage: {
            en: 'Completion'
          }
        },
        keywords: []
      }],
      numberingId: ''
    }
  },
  modified: {
    data: {
      key: '',
      name: '',
      isActive: true,
      description: 'This is the description for the BPM Profile',
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
        visibleObjects: [{
          id: 'choices',
          isEditable: false,
          isMandatory: false,
          inputOptions: {
            label: 'choices_label',
            inputType: 'choice',
            choices: [{
              label: 'choice_label1',
              value: 'choice_value1',
              iln: {
                label: {
                  en: 'choice_label1',
                  af: 'iln_label1'
                }
              }
            }, {
              label: 'choice_label2',
              value: 'choice_value2',
              iln: {
                label: {
                  en: 'choice_label2',
                  af: 'iln_label2'
                }
              }
            }, {
              label: 'choice_label3',
              value: 'choice_value3',
              iln: {
                label: {
                  en: 'choice_label3',
                  af: 'iln_label3'
                }
              }
            }],
            messages: [{
              value: 'Choices Message',
              iln: {
                en: 'Choices Message',
                af: 'iln_choices_message'
              }
            }],
            iln: {
              en: 'choices',
              af: 'iln_choices'
            }
          }
        }],
        stepOptions: [{
          _id: '',
          isNewEntry: false,
          isActive: true,
          key: 'submit',
          name: 'Submit',
          description: 'Auto Generated Option. This can be modified',
          eventStamp: [{ value: 'DateSubmitted' }],
          nextStep: 'completed_step',
          visibleObjects: [{
            id: 'choices',
            isEditable: false,
            isMandatory: false,
            inputOptions: {
              label: 'choices_label',
              inputType: 'choice',
              choices: [{
                label: 'choice_label1',
                value: 'choice_value1',
                iln: {
                  label: {
                    en: 'choice_label1',
                    af: 'iln_label1'
                  }
                }
              }, {
                label: 'choice_label2',
                value: 'choice_value2',
                iln: {
                  label: {
                    en: 'choice_label2',
                    af: 'iln_label2'
                  }
                }
              }, {
                label: 'choice_label3',
                value: 'choice_value3',
                iln: {
                  label: {
                    en: 'choice_label3',
                    af: 'iln_label3'
                  }
                }
              }],
              messages: [{
                value: 'Choices Message',
                iln: {
                  en: 'Choices Message',
                  af: 'iln_choices_message'
                }
              }],
              iln: {
                en: 'choices',
                af: 'iln_choices'
              }
            }
          }],
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
      }, {
        _id: '',
        isNewEntry: true,
        isActive: true,
        stepType: '4',
        key: 'completed_step',
        name: 'Completed Step',
        description: 'Auto Generated Completed Step. This can be modified',
        instructions: '',
        duration: '0',
        processStage: 'Completion',
        responsibility: '1',
        responsibleRole: 'Verifier',
        eventStamp: [{ value: 'DateCompleted' }],
        roleLevels: [],
        visibleObjects: [{
          id: 'choices',
          isEditable: false,
          isMandatory: false,
          inputOptions: {
            label: 'choices_label',
            inputType: 'choice',
            choices: [{
              label: 'choice_label1',
              value: 'choice_value1',
              iln: {
                label: {
                  en: 'choice_label1',
                  af: 'iln_label1'
                }
              }
            }, {
              label: 'choice_label2',
              value: 'choice_value2',
              iln: {
                label: {
                  en: 'choice_label2',
                  af: 'iln_label2'
                }
              }
            }, {
              label: 'choice_label3',
              value: 'choice_value3',
              iln: {
                label: {
                  en: 'choice_label3',
                  af: 'iln_label3'
                }
              }
            }],
            messages: [{
              value: 'Choices Message',
              iln: {
                en: 'Choices Message',
                af: 'iln_choices_message'
              }
            }],
            iln: {
              en: 'choices',
              af: 'iln_choices'
            }
          }
        }],
        stepOptions: [],
        notes: '',
        referenceUrl: '',
        notificationTemplate: '',
        iln: {
          name: {
            en: 'Completed Step'
          },
          description: {
            en: 'Auto Generated Completed Step. This can be modified'
          },
          processStage: {
            en: 'Completion'
          }
        },
        keywords: []
      }],
      numberingId: '',
      iln: {
        name: {
          en: ''
        }
      }
    }
  }
}

module.exports = data
