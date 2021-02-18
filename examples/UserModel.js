const ModelApi = require('./ModelApi');
const tableName = process.env.USER_TABLE;

module.exports = new ModelApi({
    items: [{
        key: 'UserID',
        type: 'integer'
    }, {
        key: 'Email',
        type: 'string',
        isRequired: true,
        isHasKey: true,
        isSortKey: true
    }, {
        key: 'PhoneNumber',
        type: 'integer'
    }, {
        key: 'FirstName',
        type: 'string'
    }, {
        key: 'LastName',
        type: 'string'
    }, {
        key: 'AccountEnabled',
        type: 'boolean'
    }


    ],
    tableName: tableName
});