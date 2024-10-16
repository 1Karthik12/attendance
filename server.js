const express = require("express");
const db = require("./models");
const cors = require("cors");

const app = express();
const faculty = require("./routes/faculty");
const student = require("./routes/student");
const attendance = require("./routes/attendance"); // Add this

app.use(express.json()); // Ensure this middleware is used to parse JSON
app.use(cors());

app.get("/", (req, res) => {
  res.send("Working");
});

app.use("/api/faculty", faculty);
app.use("/api/student", student);
app.use("/api/attendance", attendance); // Add this

const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on: http://localhost:${PORT}`);
  });
});
