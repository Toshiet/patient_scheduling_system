import express from "express";
import homepageController from "../controllers/homepageController";
import auth from "../validation/authValidation";
import initPassportLocal from "../controllers/passport/passportLocal";
import passport from "passport";
import authController from "../controllers/authController";

//init passport-local
initPassportLocal();

/*
init all web routes
 */

let router = express.Router();

let initAllWebRoutes = (app) =>{
    router.get("/", homepageController.getHomepage);
    router.get("/log-out", authController.postLogOut);
    router.get("/register", homepageController.getRegisterPage);
    router.get("/login",authController.checkLoggedOut, homepageController.getLoginPage);
    router.get("/users", authController.checkLoggedIn,  homepageController.getAdminPage);
    router.get("/all-users",authController.checkLoggedIn, homepageController.getAllUsersPage);



    router.post("/register", auth.validateRegister, homepageController.handleRegister);
    router.post("/login", passport.authenticate("local",{
        successRedirect: "/users",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));
    
    return app.use("/", router);
};

module.exports = initAllWebRoutes;
