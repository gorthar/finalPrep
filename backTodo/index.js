const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const User = require("./Users");

const app = express();
app.use(cors());
app.use(express.json());

// Define your routes here
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/users", (req, res) => {
  User.find()
    .then((users) => res.send(users))
    .catch((error) => res.status(500).send("Internal Server Error"));
});
app.post("/users", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    image: req.body.image,
    gender: req.body.gender,
  });
  try {
    const result = await user.save();
    //send success message
    res.status(200).json({ message: "User saved successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to save user", error: error.message });
  }
});
// Delete a user by ID
app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete user", error: error.message });
  }
});
app.put("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name:
          req.body.name.title +
          " " +
          req.body.name.first +
          " " +
          req.body.name.last,
        email: req.body.email,
        image: req.body.image,
      },
      { new: true }
    );
    if (!user) return res.status(404).send("User not found");
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update user", error: error.message });
  }
});

//
mongoose
  .connect("mongodb://0.0.0.0:27017/ecommerce2", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Listening on port ${port}...`));
  })
  .catch((error) => {
    console.log("Error:", error);
  });
