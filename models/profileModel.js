const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userProfileSchema = new Schema(
    {
        profilePicture: {
            type: String
        },
        fullName: {
            type: String
        },
        userame: {
            type: String
        },
        phoneNumber: {
            type: Number
        },
        dietaryPreference: {
            type: String
        },
        foodAllergies: {
            type: String,
        },
        healthConditions: {
            type: String
        },
    },
    {
        timestamps: true,
    }
)


module.exports = mongoose.model('Users', userProfileSchema)