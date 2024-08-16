const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const userRegisterFoodPage = require("./schema/user");
const hotelDetailsSchema = require("./schema/schema");
const cartSchema = require("./schema/cart");
const { v4: uuidv4 } = require("uuid");
app.use(express.json());

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ContactList", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
    });
    console.log("Connected to mongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

connectDB();

app.get("/", (req, res) => {
  const userId = uuidv4();
  res.end(`Hi welcome ${userId}`);
});

app.post("/userregister", async (req, res) => {
  console.log(req.body);
  try {
    const phoneNumberExist = await userRegisterFoodPage.findOne({
      phoneNumber: req.body.phoneNumber,
    });
    const mailExist = await userRegisterFoodPage.findOne({
      email: req.body.email,
    });

    if (phoneNumberExist) {
      return res
        .status(400)
        .send("Phone number already exists. Try with a new number or login.");
    }

    if (mailExist) {
      return res
        .status(400)
        .send("Email already exists. Try with a new email or login.");
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashPassword;

    const newUserRegister = await userRegisterFoodPage.create(req.body);
    console.log(newUserRegister);
    if (req.body.type === "Seller") {
      const addHotelDetails = await hotelDetailsSchema.create({
        hotelName: req.body.name,
        hotelId: newUserRegister._id,
        hotelItems: [],
      });
    }
    return res.status(201).send("User added successfully");
  } catch (error) {
    console.error("Error adding user:", error);
    return res.status(500).send("Internal Server Error");
  }
});

app.post("/login", async (req, res) => {
  const { phoneNumber, password } = req.body;
  const userId = uuidv4();
  try {
    const user = await userRegisterFoodPage.findOne({
      phoneNumber: phoneNumber,
    });
    if (!user) {
      return res.status(404).send("PhoneNumber not found.");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      return res.status(200).json({
        Message: "Login successful.",
        token: userId,
        userType: user.type,
        userName: user.name,
        userId: user._id,
      });
    } else {
      return res.status(401).send("Incorrect password.");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).send("Internal Server Error");
  }
});

app.get("/userdetails/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const userName = await userRegisterFoodPage.findById(id);
    console.log(userName);
    res.status(200).send(userName.name);
  } catch (error) {
    res.status(500).send(error);
    console.error("Error adding user:", error);
  }
});

app.get("/userlist", async (req, res) => {
  try {
    const viewUser = await userRegisterFoodPage.find();
    res.status(200).send(viewUser);
  } catch (error) {
    res.status(500).send(error);
    console.error("Error adding user:", error);
  }
});

app.get("/gkd", async (req, res) => {
  try {
    const viewUser = await userRegisterFoodPage.deleteMany();
    res.status(200).send(viewUser);
  } catch (error) {
    res.status(500).send(error);
    console.error("Error adding user:", error);
  }
});

app.put("/passwordupdate", async (req, res) => {
  const { phoneNumber, password } = req.body;
  console.log(req.body);
  try {
    const updationPassword = await userRegisterFoodPage.findOneAndUpdate(
      { phoneNumber: phoneNumber },
      { $set: { password: password } }
    );
    res.status(200).send("password updated successfully");
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).send("Internal Server Error");
  }
});

app.post("/hoteldetails", async (req, res) => {
  try {
    console.log("1");

    const { hotelId, hotelItems } = req.body;
    console.log(`${hotelId}`);
    const hotel = await hotelDetailsSchema.findOne({ hotelId });
    console.log(hotel);
    console.log("2");
    if (hotel) {
      console.log("3");
      const existingItems = hotel.hotelItems.map((item) => item.itemName);
      const duplicateItems = hotelItems.filter((item) =>
        existingItems.includes(item.itemName)
      );
      console.log("4");
      if (duplicateItems.length > 0) {
        console.log("5");
        return res
          .status(500)
          .send(
            "Duplicate item names found: " +
              duplicateItems.map((item) => item.itemName).join(", ")
          );
      }
      console.log("6");
      hotel.hotelItems.push(...hotelItems);
      await hotel.save();
      return res.status(200).send("Items appended successfully");
    } else {
      console.log("7");
      console.log(`body - ${JSON.stringify(req.body)}`);
      const addHotelDetails = await hotelDetailsSchema.create({
        hotelName: hotelName,
        hotelItems: hotelItems,
      });
      console.log(addHotelDetails);
      return res.status(201).send("details added successfully");
    }
  } catch (error) {
    console.error("Error adding user:", error);
    return res.status(500).send("Internal Server Error");
  }
});

app.get("/hotelList", async (req, res) => {
  try {
    const viewUser = await hotelDetailsSchema.find();
    res.status(200).send(viewUser);
  } catch (error) {
    res.status(500).send(error);
    console.error("Error retrieving hotel list:", error);
  }
});

app.get("/hdd", async (req, res) => {
  try {
    const viewUser = await hotelDetailsSchema.deleteMany();
    res.status(200).send(viewUser);
  } catch (error) {
    res.status(500).send(error);
    console.error("Error deleting hotels:", error);
  }
});

app.get("/hotelList/:id", async (req, res) => {
  try {
    const hotelId = req.params.id;
    const menuItems = await hotelDetailsSchema.findById(hotelId);
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).send(error);
    console.error("Error retrieving hotel details:", error);
  }
});

app.get("/item/:name", async (req, res) => {
  try {
    const hotelName = req.params.name;
    const userName = await userRegisterFoodPage.findById({ _id: hotelName });
    console.log(userName);
    const items = await hotelDetailsSchema.findOne({
      hotelName: userName.name,
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).send(error);
    console.error("Error retrieving hotel items:", error);
  }
});

app.put("/item/:hotelId/:itemId", async (req, res) => {
  const { hotelId, itemId } = req.params;
  const updateData = req.body;

  try {
    const hotel = await hotelDetailsSchema.findById(hotelId);
    if (!hotel) {
      return res.status(404).send("Hotel not found.");
    }

    const item = hotel.hotelItems.id(itemId);
    if (!item) {
      return res.status(404).send("Item not found.");
    }

    item.set(updateData);
    await hotel.save();
    res.status(200).send("Item updated successfully");
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/addcart", async (req, res) => {
  try {
    const { hotelId, userId, itemId } = req.body;
    console.log(`${hotelId} - ${userId} + ${itemId}`);
    const hotel = await hotelDetailsSchema.findById(hotelId);
    const user = await userRegisterFoodPage.findById(userId);
    const item = await hotel.hotelItems.id(itemId);
    const cartList = await cartSchema.findOne({ userId: userId });
    if (cartList && userId === cartList.userId) {
      if (hotelId === cartList.hotelId) {
        const indexItem = cartList.items.findIndex(
          (item) => item.itemId === itemId
        );
        if (indexItem !== -1) {
          cartList.items[indexItem].quantity += 1;
          //cartList.total += item.price;
          await cartList.save();
          res.status(200).send("Item quantity increased");
        } else {
          cartList.items.push({
            itemName: item.itemName,
            itemId: itemId,
            price: item.price,
            quantity: 1,
            //total: item.price * 1,
          });
          await cartList.save();
          res.status(200).send("New item added");
        }
      } else {
        res.status(200).send({
          exists: true,
          message:
            "In your cart already item exist. Do you want to remove old item and add new item?",
          existsItem: req.body,
        });
      }
    } else {
      const cart = [
        {
          hotelId: hotelId,
          //hotelName: hotel.hotelName,
          userId: userId,
          //userName: user.name,
          //total: total,
          items: {
            itemName: item.itemName,
            itemId: itemId,
            price: item.price,
            quantity: 1,
            //total: item.price * 1,
          },
        },
      ];
      const addCart = await cartSchema.create(cart);
      res.status(200).send("Item added");
    }
  } catch (error) {
    console.error("Error adding cart", error);
    res.status(500).send(error);
  }
});

app.get("/cartList", async (req, res) => {
  try {
    const cart = await cartSchema.find();
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/cartdeletemany", async (req, res) => {
  try {
    const deletecart = await cartSchema.deleteMany();
    res.status(200).send(deletecart);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/replacecart", async (req, res) => {
  try {
    const { hotelId, userId, itemId } = req.body;
    const hotel = await hotelDetailsSchema.findById(hotelId);
    const user = await userRegisterFoodPage.findById(userId);
    const item = await hotel.hotelItems.id(itemId);
    const removeExist = await cartSchema.deleteOne({ userId: userId });
    console.log({ removeExist });
    console.log(req.body);
    console.log({ item });

    const cart = [
      {
        hotelId: hotelId,
        userId: userId,
        items: {
          itemName: item.itemName,
          itemId: itemId,
          price: item.price,
          quantity: 1,
        },
      },
    ];

    const addCart = await cartSchema.create(cart);
    res.status(200).send("Item added");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.get("/cartlist/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    const cart = await cartSchema.findOne({ userId: userid });
    res.status(200).send({ cart });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/availability/:hotelId/:itemId", async (req, res) => {
  try {
    const { hotelId, itemId } = req.params;
    const hotel = await hotelDetailsSchema.findById(hotelId);
    const itemAvailability = hotel.hotelItems.id(itemId).availability;
    res.send({ itemAvailability });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/increasecount/:userId/:itemId", async (req, res) => {
  try {
    const { userId, itemId } = req.params;
    const cartList = await cartSchema.findOne({ userId: userId });
    const indexItem = cartList.items.findIndex(
      (item) => item.itemId === itemId
    );
    if (indexItem !== -1) {
      cartList.items[indexItem].quantity += 1;
      //cartList.total += item.price;
      await cartList.save();
      res.status(200).send("Item quantity increased");
    } else {
      return res.status(404).send("Item not found in cart");
    }
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
});

app.put("/decresecount/:userId/:itemId", async (req, res) => {
  try {
    const { userId, itemId } = req.params;
    const cart = await cartSchema.findOne({ userId });
    const itemIndex = cart.items.findIndex((item) => item.itemId === itemId);
    if (itemIndex !== -1) {
      cart.items[itemIndex].quantity -= 1;
      await cart.save();
      res.status(200).send("item count decrease");
    } else {
      return res.status(404).send("Item not found in cart");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/removeitem/:userId/:itemId", async (req, res) => {
  try {
    const { userId, itemId } = req.params;
    const cart = await cartSchema.findOne({ userId });
    const itemIndex = cart.items.findIndex((item) => item.itemId === itemId);
    if (itemIndex !== -1) {
      cart.items.splice(itemIndex, 1);
      await cart.save();
      res.status(200).send("Item removed from cart");
    } else {
      return res.status(404).send("Item not found in cart");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/orderItem/:userId", async (req, res) => {
  try {
    const { item, hotelId } = req.body;
    const { userId } = req.params;
    const itemsValue = item.map((item) => item.itemName);
    const deleteItem = await cartSchema.deleteOne({ userId });
    res.send(hotelId);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/hotelname/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userName = await hotelDetailsSchema.findOne({ hotelId: id });
    console.log(userName.user);
    res.status(200).send({ user: userName.hotelName });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => console.log(`SERVER is running in ${PORT}`));
