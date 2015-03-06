var Waterline = require('waterline');

var User = Waterline.Collection.extend({
  // Enforce model schema in the case of schemaless databases
  schema: false,
  connection: 'localMongodbServer',
  identity: 'user',
  attributes: {
    username  : { type: 'alphanumeric', unique: true },
    email     : { type: 'email',  unique: true },
    passports : { collection: 'Passport', via: 'user' }
  }
});

module.exports = User;
