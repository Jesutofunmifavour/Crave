const Users = require('../models/profileModel')
const session = require('express-session');
// const bcrypt = require('bcrypt')
// const multer = require('multer')
// const path = require('path')


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'upload')
//     },
//     filename: (req, file, cb) => {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//       const ext = path.extname(file.originalname);
//       cb(null, file.fieldname + '-' + uniqueSuffix + ext);
//     }
// })

// const profilePicture = multer({ storage: storage }).single('profilePicture')


const accountProfile = async (req, res) => {
    const userId = req.session.user._id;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { fullName, username, email, phoneNumber, dietaryPreference, foodAllergies, healthConditions } = req.body;



    
    try {
        const updateUser = await Users.findOneAndUpdate(
            { _id: userId },
            {
                fullName,
                username,
                email,
                phoneNumber,
                dietaryPreference,
                foodAllergies,
                healthConditions
            },
            { new: true },
        )

        if (!updateUser) {
            return res.status(400).json({ message: "User not found" })
        }


        // return res.status(200).json({ message: "Profile Detailed successfully updated!", updateUser})
        req.flash('success', "Profile Details successfully updated!");
        res.redirect('/user/home');
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error"})
    }
}





exports.accountProfile = accountProfile
// exports.profilePicture = profilePicture
// exports.viewProfilePicture = viewProfilePicture
// exports.editProfilePicture = editProfilePicture
// exports.deleteProfilePicture = deleteProfilePicture