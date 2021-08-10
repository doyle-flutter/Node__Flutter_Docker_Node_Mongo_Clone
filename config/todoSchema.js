const mongo = require('./mg.js');

const todoSchema = new mongo.Schema(
    {
        data : {type : String, required: true},
    },
    {
        collection : 'todo'
    }
);

todoSchema.statics.findAll = function ({ea}) {
    // db.todo.count() ? 
    return this.find().limit(ea);
};
const TodoModel = mongo.model('TodoModel', todoSchema);

module.exports = TodoModel;