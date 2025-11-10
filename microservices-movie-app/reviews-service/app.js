const express = require("express");
const app = express();
const reviewRoutes = require("./routes/reviewRoutes");
const swaggerUi = require("swagger-ui-express"); 
const swaggerFile = require("./swagger-output.json"); 
 
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile)); 

app.use(express.json());
app.use("/reviews", reviewRoutes);

app.listen(3003, () => console.log("Reviews service running on port 3003"));