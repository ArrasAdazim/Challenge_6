import express, { Application } from "express";
import UsersHandler from "./handlers/users";
import uploadFileUtil from "./utils/uploadFileMemory";
import AuthHandler from "./handlers/auth";
import AuthMiddleware from "./middlewares/auth";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { swaggerConfig } from "./utils/swaggerOption";
import dotenv from "dotenv";
import CarsHandler from "./handlers/cars";
dotenv.config();

const app: Application = express();

app.use(express.json());

// Init handlers
const usersHandler = new UsersHandler();
const authHandler = new AuthHandler();
const carsHandler = new CarsHandler();

// Swagger
const swaggerSpec = swaggerJsdoc(swaggerConfig);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Define routes
// Users
app.get("/api/users", usersHandler.getUsers);
app.post(
  "/api/users",
  // uploadFileUtil.single('profile_picture_url'), // single file
  uploadFileUtil.array("profile_pictures"), // multiple files
  usersHandler.createUser
);


//Cars
app.get("/api/cars", carsHandler.getCars);
app.post(
  "/api/cars",
  uploadFileUtil.single("foto"),
  AuthMiddleware.authenticateAdmin,
  carsHandler.createCar
);

app.delete(
  "/api/cars/:id",
  AuthMiddleware.authenticateAdmin,
  carsHandler.deleteCar
);

app.put(
  "/api/cars/:id",
  uploadFileUtil.single("foto"),
  AuthMiddleware.authenticateAdmin,
  carsHandler.updateCar
);

// Auth
app.post("/api/auth/register", authHandler.register);
app.post(
  "/api/auth/registerAdmin",
  AuthMiddleware.authenticateSuperAdmin,
  authHandler.registerAdmin
);
app.post("/api/auth/login", authHandler.login);
app.get(
  "/api/auth/me",
  AuthMiddleware.authenticate,
  authHandler.getLoggedInUser
);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.APP_PORT}`);
});
