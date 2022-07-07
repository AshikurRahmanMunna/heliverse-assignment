const User = require('../models/user');

exports.getUser = (req, res) => {
    const id = req.params.id;
    User.findOne({ _id: id })
        .exec((error, user) => {
            if (error) return res.status(500).json({ error })
            if (user) {
                return res.status(200).json({ user })
            }
            if (!user) {
                return res.status(404).json({ message: "User not found" })
            }
        })
}

exports.deleteUser = (req, res) => {
    const id = req.params.id;
    User.findOne({ _id: id })
        .exec(async (error, user) => {
            if (error) return res.status(500).json({ error })
            if (user) {
                // can also use findByIdAndDelete
                User.deleteOne({ _id: id })
                    .then(() => res.status(200).json({ message: "User Deleted Successfully" }))
                    .catch(err => res.status(500).json({ err }))
            }
            if (!user) {
                return res.status(404).json({ message: "User not found" })
            }
        })
}

exports.updateUser = (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .exec((error, user) => {
            if (error) return res.status(500).json({ error });
            if (user) {
                User.findByIdAndUpdate(id, {
                    $set: req.body
                }, { upsert: true }, (err, _user) => {
                    if (err) return res.status(500).json({ err });
                    if (_user) {
                        return res.status(200).json({ message: "User Updated Successfully" })
                    }
                    else {
                        return res.status(500).json({ message: "Something went wrong" })
                    }
                }
                )
            }
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
        })
}