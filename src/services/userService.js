import db from "../models";
import bcrypt from "bcryptjs";

let createNewUser = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check user's email is exist before ?
            //return true if the email already exist in the database

            let isEmailExist = await checkEmailUser(user);
            if (isEmailExist) {
                reject(`This email "${user.email}" has already exist. Please choose an other email !`);
            } else {
                //hash the user's password
                let salt = bcrypt.genSaltSync(10);
                //update the user'password
                user.password = await bcrypt.hashSync(user.password, salt);

                //create a new user
                await db.User.create(user);
                resolve("done!")
            }
        } catch (e) {
            reject(e);
        }
    });
};

let checkEmailUser = (userCheck) => {
    return new Promise(async (resolve, reject) => {
        try {
            let currentUser = await db.User.findOne({
                where: {
                    email: userCheck.email
                }
            });

            if (currentUser) resolve(true);
            resolve(false);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createNewUser: createNewUser
};
