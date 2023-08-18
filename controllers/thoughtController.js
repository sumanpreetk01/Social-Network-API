const { Thought, User } = require('../models');

module.exports = {
    getAllThoughts: async (req, res) => {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getOneThought: async (req, res) => {
        try {
            const thoughtId = req.params.thoughtId;
            const thought = await Thought.findById(thoughtId);
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
            const thoughtData = await Thought.create(req.body);
            const userId = thoughtData.userId;
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            user.thoughts.push(thoughtData._id);
            await user.save();

            res.json(thoughtData);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    updateThought: async (req, res) => {
        try {
            const thoughtId = req.params.thoughtId;
            const updatedThought = await Thought.findByIdAndUpdate(thoughtId, req.body, { new: true });
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
            const deletedThought = await Thought.findByIdAndDelete(thoughtId);
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

            const thought = await Thought.findById(thoughtId);
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

            const thought = await Thought.findById(thoughtId);
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
