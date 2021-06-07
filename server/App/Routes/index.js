const UserRoutes = require('./user.routes')
const { authenticate } = require('../Middlewares/Auth')

const createRoutes = app => {
    app.use("/api/v1/users", UserRoutes);
    app.use(authenticate);

}

module.exports = createRoutes;