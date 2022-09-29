const { Schema, model } = require('mongoose');

const UserSchema = Schema(
    {
        firstName: String,
        lastName: String,
        facebookId: {
            type: String,
            unique: true,
        },
        profilePic: String,
    }, { timestamps: true }
);

UserSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('User', UserSchema);