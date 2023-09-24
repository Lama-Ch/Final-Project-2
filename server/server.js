const express = require("express");
const cors = require("cors"); // Import the cors module
const app = express();
const dotenv = require("dotenv");
const handlers= require ("./src/handlers");
const authMiddleware = require ("./src/middlewares/authMiddleware");
const optionalAuthMiddleware = require ("./src/middlewares/optionalAuthMiddleware");

dotenv.config();
const PORT = process.env.PORT || 8000;


// Initialize the DB connection
require("./src/configs/dbClient")
  // Allow all origins (for development; restrict in production)
  app.use("/uploads", express.static("uploads"));
  app.use(cors())
  //garenteed access
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(express.json())

  // Auth 
  .post("/api/auth/signup", handlers.signup)
  .post("/api/auth/signin", handlers.signin)
  // Auth each token exists , fetch the user by id and send it to the front end
  .get('/api/auth/current-user', authMiddleware, handlers.getCurrentUser)
 
  // My Food and my listing
  .post("/api/foods", authMiddleware, handlers.postNewFood)
  .get("/api/foods/my-listings/:foodType",authMiddleware,handlers.getMyListedFoods)

  // Get Foods Listing and Food Detail
  .get("/api/foods/others-listing/:foodType",optionalAuthMiddleware,handlers.getFoodsList)
  .get("/api/foods/:id",optionalAuthMiddleware,handlers.getFoodDetailById)

  // Orders endpoints
  .post("/api/orders", authMiddleware, handlers.createOrder)
  .get("/api/orders/:id", authMiddleware, handlers.getOrderDetailById);


app.listen(PORT, () => {
  console.log(`server listenning on port ${PORT}`);
});
