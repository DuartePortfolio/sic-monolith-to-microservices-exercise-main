const express = require("express");
const app = express();
const movieRoutes = require("./routes/movieRoutes");
const swaggerUi = require("swagger-ui-express"); 
const swaggerFile = require("./swagger-output.json"); 
 
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile)); 

app.use(express.json());
app.use("/movies", movieRoutes);

app.listen(3002, () => console.log("Movies service running on port 3002"));
