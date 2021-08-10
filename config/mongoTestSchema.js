const mongo = require('./mg.js');

const testSchema = new mongo.Schema(
    {
        key : {type : String, required: true},
    },
    {
        collection : 'node'
    }
);

testSchema.statics.findAll = function () {
    return this.find({});
};
const TestModel = mongo.model('Test', testSchema);

module.exports = TestModel;