const { Schema, model } = require('mongoose');

const CategorySchema = Schema(
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

CategorySchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Category', CategorySchema);