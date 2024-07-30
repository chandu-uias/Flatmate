
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 7000;
const mongoURL = "mongodb://localhost:27017/Addlisting";

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

const listingSchema = new mongoose.Schema({
  location: { type: String, required: true },
  lookingFor: { type: String, required: true },
  rent: { type: Number, required: true },
  occupancy: { type: String, required: true },
  photos: { type: [String], required: true },
  preferences: { type: [String], required: true },
  highlights: { type: [String], required: true },
  amenities: { type: [String], required: true },
  description: { type: String, required: true },
});

const Listing = mongoose.model("Listing", listingSchema);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
});

// Add a route to fetch all listings
app.get("/listings/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }
    console.log("Fetched listing details:", listing); // Logging the fetched listing details
    res.status(200).json(listing);
  } catch (error) {
    console.error("Failed to fetch listing:", error);
    res.status(500).json({ error: "Failed to fetch listing. Please try again later." });
  }
});

app.post("/add", upload.array('photos', 3), async (req, res) => {
  const { location, lookingFor, rent, occupancy, highlights, preferences, amenities, description } = req.body;
  const photos = req.files.map(file => file.path);
  try {
    const newListing = new Listing({ location, lookingFor, rent, occupancy, photos, highlights: JSON.parse(highlights), preferences: JSON.parse(preferences), amenities: JSON.parse(amenities), description });
    await newListing.save();
    res.status(201).json({ message: "Room details added successfully" });
  } catch (error) {
    console.error("Failed to add room details:", error);
    res.status(500).json({ error: "Failed to add room details. Please try again later." });
  }
});

app.get("/listings", async (req, res) => {
  try {
    const listings = await Listing.find({});
    res.status(200).json(listings);
  } catch (error) {
    console.error("Failed to fetch listings:", error);
    res.status(500).json({ error: "Failed to fetch listings. Please try again later." });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
