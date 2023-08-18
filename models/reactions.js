const {Schema, model} = require('mongoose');

const reactionSchema = new Schema(
    {
      reactionID: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
     username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => {
            return new Date(timestamp).toLocaleString('en-US', { timeZone: 'UTC' });
        }
    }
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
      }
);

const Reactions = model('reactions', reactionSchema);

module.exports = Reactions