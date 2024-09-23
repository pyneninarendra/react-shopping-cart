var express = require("express");
var bodyParser = require("body-parser");
var shortId = require("shortid");
var mongoose = require("mongoose");

var app = express();
app.use(bodyParser.json());

mongoose
  //   .connect("mongodb://localhost:27017/shoppingcart", {

  .connect(
    "mongodb+srv://pyneni:123123aA@cluster0.9ns3b.mongodb.net/shoppingcart",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((res) => console.log("connected to db"))
  .catch((err) => console.log(err.message));

const Product = mongoose.model(
  "products",
  new mongoose.Schema({
    _id: { type: String, default: shortId.generate },
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    availableSizes: [String],
  })
);

//Deploy
app.use("/", express.static(__dirname + "/build"));
app.get("/", (req, res) => res.sendFile(__dirname + "/build/index.html"));

app.get("/api/products", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

app.post("/api/products", async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

app.delete("/api/products/:id", async (req, res) => {
  const deleteProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deleteProduct);
});

const port = process.env.Port || 4200;
app.listen(port, () => {
  console.log("Server is running at port: ", port);
});
