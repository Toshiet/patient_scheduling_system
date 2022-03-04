let getCreateUserPage = (req, res) => {
    return res.render("users/createUser.ejs")
};

module.exports = {
    getCreateUserPage: getCreateUserPage
}