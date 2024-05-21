const { Model } = require('objection');
const FormElement = require('./formElement');

class FormOption extends Model {
  static get tableName() {
    return 'formOptions';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['optionText', 'optionValue','type', 'element_id'],
      properties: {
        id: { type: 'integer' },
        optionText: { type: 'string' },
        optionValue: { type: 'string' },
        type: { type: 'string', enum: ['text', 'checkbox', 'radio', 'switch'] },
        element_id: { type: 'integer' }
      }
    };
  }
  static get relationMappings() {
    return {
      element: {
        relation: Model.BelongsToOneRelation,
        modelClass: FormElement,
        join: {
          from: 'formOptions.element_id',
          to: 'formElements.elementId'
        }
      }
    };
  }
}
module.exports = FormOption;


