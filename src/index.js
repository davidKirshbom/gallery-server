const express = require("express");
const cors = require("cors");
const sequelize = require("./db/sequelize");
const imagesRouter = require("./router/ImagesRouter");
const app = express();
app.use(cors());
app.use(express.json());

app.use(imagesRouter);
const port = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log("listening on port", port);
    });
  })
  .catch((err) => console.log(err));
