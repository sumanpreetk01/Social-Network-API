const { User } = require('../models');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    createUser: async (req, res) => {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    getOneUser: async (req, res) => {
        try {
            const userId = req.params.userId;
            console.log(req.params)
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    updateUser: async (req, res) => {
        try {
            const userId = req.params.userId;
            const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(updatedUser);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const userId = req.params.userId;
            const deletedUser = await User.findByIdAndDelete(userId);
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User deleted successfully' });
        } catch (err) {
            res.status(400).json(err);
        }
    },
        addFriend: async (req, res) => {
            try {
                const userId = req.params.userId;
                const friendId = req.params.friendId;
    
                const user = await User.findById(userId);
                const friend = await User.findById(friendId);
    
                if (!user || !friend) {
                    return res.status(404).json({ message: 'User or friend not found' });
                }
    
                user.friends.push(friendId);
                await user.save();
    
                res.json(user);
            } catch (err) {
                res.status(400).json(err);
            }
        },
    
        removeFriend: async (req, res) => {
            try {
                const userId = req.params.userId;
                const friendId = req.params.friendId;
    
                const user = await User.findById(userId);
    
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
    
                user.friends = user.friends.filter(friend => friend.toString() !== friendId);
                await user.save();
    
                res.json(user);
            } catch (err) {
                res.status(400).json(err);
            }
        }
    }
