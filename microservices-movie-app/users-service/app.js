const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const swaggerUi = require("swagger-ui-express"); 
const swaggerFile = require("./swagger-output.json"); 
const { httpLogger } = require('./utils/logger');

 
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile)); 

app.use(httpLogger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);

app.listen(3001, () => console.log("Users service running on port 3001"));