const ModelApi = require("../features/Model");
const RepositoryApi = require("../features/Repository")

// orm - dynamodbwrapper
const orm = { 

    create: function(docClient, model, data) {
        console.log("Creating: ", model, data);
    },
    update: function(docClient, model, data) {
        console.log("Updating: ", model, data);
    },
    delete: function(docClient, model, id) {
        console.log("Deleting: ", model, id);
    },
    findById: function(docClient, model, id) {
        console.log("findById: ", model, id);
    }
}

// create model
const userModel = new ModelApi(orm).create([
    {key: "id", type:" string", required:true},
    {key:"name", type:"string"}
], "Device", "Device");

// create repository
class UserRepository extends RepositoryApi {

    constructor(sdk) {
        super(userModel, sdk)
    }
}

// get from lambda
const sdk = null;

// save
new UserRepository(sdk).save({
    id: 1,
    name: "WifiLock blah blah"
})

// update
new UserRepository(sdk).update({
    id: 1,
    name: "WifiLock blah blah"
})

// delete
new UserRepository(sdk).delete(1);

// findById
new UserRepository(sdk).findById(1);

