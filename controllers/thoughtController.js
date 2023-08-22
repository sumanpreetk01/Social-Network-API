const { User, Thoughts } = require('../models');

module.exports = {
    getAllThoughts: async (req, res) => {
        try {
            const thoughts = await Thoughts.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getOneThought: async (req, res) => {
        try {
            const thoughtId = req.params.thoughtId;
            const thought = await Thoughts.findById(thoughtId);
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    createThought: async (req, res) => {
        try {
            const thought = await Thoughts.create(req.body);
            res.json(thought);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    updateThought: async (req, res) => {
        try {
            const thoughtId = req.params.thoughtId;
            const updatedThought = await Thoughts.findByIdAndUpdate(thoughtId, req.body, { new: true });
            if (!updatedThought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.json(updatedThought);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    deleteThought: async (req, res) => {
        try {
            const thoughtId = req.params.thoughtId;
            const deletedThought = await Thoughts.findByIdAndDelete(thoughtId);
            if (!deletedThought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.json({ message: 'Thought deleted successfully' });
        } catch (err) {
            res.status(400).json(err);
        }
    },

    createReaction: async (req, res) => {
        try {
            const thoughtId = req.params.thoughtId;
            const { reactionBody, username } = req.body;

            const thought = await Thoughts.findById(thoughtId);
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }

            thought.reactions.push({ reactionBody, username });
            await thought.save();

            res.json(thought);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    deleteReaction: async (req, res) => {
        try {
            const thoughtId = req.params.thoughtId;
            const reactionId = req.body.reactionId;

            const thought = await Thoughts.findById(thoughtId);
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }

            thought.reactions = thought.reactions.filter(reaction => reaction._id.toString() !== reactionId);
            await thought.save();

            res.json(thought);
        } catch (err) {
            res.status(400).json(err);
        }
    }
};
