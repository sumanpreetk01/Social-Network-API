const {Schema, model} = require('mongoose');
const reactionSchema = require('./reactions')


const thoughtsSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlenght: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJson: {
            virtuals: true,
        },
        id: false
    }
);

const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts
