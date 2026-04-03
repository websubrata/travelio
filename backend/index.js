const express = require("express");
const app = express();
const { db } = require("./firebase");
const ApiResponse = require("./utils/ApiResponse");
const { sendMail } = require("./utils/sendMail");
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  query,
  where,
  limit,
  doc,
} = require("firebase/firestore");

// ── Cloudinary Config (hardcoded) ────────────────────────────────────────────
// The user provided the API Key and Secret, relying on environment for Cloud Name 
// but defaulting just in case.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dzvtqjixk", // Just as an example placeholder! You MUST provide your actual Cloud Name in .env or the frontend wouldn't load images
  api_key: "763569853232443",
  api_secret: "6MNGty4e5rxtEQQv2aK4I20KC0E",
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1000 * 1000 },
});

app.use(express.json());
app.use(cors());

function uploadToCloudinary(buffer, folder = "tours") {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, upload_preset: "holla_images" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
}

function snapshotToArray(snapshot) {
  return snapshot.docs.map((d) => ({ ID: d.id, ...d.data() }));
}

// ── GET /tours ────────────────────────────────────────────────────────────────
app.get("/tours", async (req, res) => {
  const catname = req.query.catname;
  try {
    const colRef = collection(db, "tour");
    const q = catname
      ? query(colRef, where("TOUR_TYPE", "==", catname))
      : colRef;
    const snapshot = await getDocs(q);
    const tours = snapshotToArray(snapshot);
    res.status(200).json(new ApiResponse(200, "Success", { tours }));
  } catch (error) {
    res.status(400).json(new ApiResponse(400, error.message, error));
  }
});

// ── GET /tourslugs ────────────────────────────────────────────────────────────
app.get("/tourslugs", async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, "tour"));
    const slugs = snapshot.docs.map((d) => ({ URL: d.data().URL }));
    res.status(200).json(new ApiResponse(200, "Success", slugs));
  } catch (error) {
    res.status(400).json(new ApiResponse(400, error.message, error));
  }
});

// ── GET /query ────────────────────────────────────────────────────────────────
app.get("/query", async (req, res) => {
  const tour_type = req.query.tour_type;
  try {
    const q = query(
      collection(db, "tour"),
      where("TOUR_TYPE", "==", tour_type),
      limit(12)
    );
    const snapshot = await getDocs(q);
    const tours = snapshotToArray(snapshot);
    res.status(200).json(
      new ApiResponse(200, "Success", { tours, total_page: 1 })
    );
  } catch (error) {
    res.status(400).json(new ApiResponse(400, error.message, error));
  }
});

// ── GET /search ───────────────────────────────────────────────────────────────
app.get("/search", async (req, res) => {
  const searchtxt = req.query.q;
  if (!searchtxt)
    return res
      .status(400)
      .json(new ApiResponse(400, "enter some search text with 'q' tag"));

  try {
    const snapshot = await getDocs(collection(db, "tour"));
    const lower = searchtxt.toLowerCase();
    const tours = snapshotToArray(snapshot).filter(
      (t) => t.TITLE && t.TITLE.toLowerCase().includes(lower)
    );
    res.status(200).json(
      new ApiResponse(200, "Success", { tours, total_page: 1 })
    );
  } catch (error) {
    res.status(400).json(new ApiResponse(400, error.message, error));
  }
});

// ── GET /tour/:URL ────────────────────────────────────────────────────────────
app.get("/tour/:URL", async (req, res) => {
  const tour_url = req.params.URL;
  const table_name = req.query.tableName || "tourinfo";

  if (!tour_url)
    return res.status(400).json(new ApiResponse(400, "URL is required"));

  try {
    const q = query(
      collection(db, table_name),
      where("URL", "==", tour_url),
      limit(1)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) return res.status(200).json([]);
    const d = snapshot.docs[0];
    const data = d.data();
    // Strip carriage-return characters (\r) that were stored in Firestore,
    // which otherwise appear as literal "rn" in rendered HTML content.
    const sanitized = Object.fromEntries(
      Object.entries(data).map(([k, v]) => [
        k,
        typeof v === "string" ? v.replace(/\r\n/g, "\n").replace(/\r/g, "\n") : v,
      ])
    );
    res.status(200).json({ ID: d.id, ...sanitized });
  } catch (error) {
    res.status(200).json([]);
  }
});

// ── POST /sendemail ───────────────────────────────────────────────────────────
app.post("/sendemail", async (req, res) => {
  const type = req.body.type;
  if (!type)
    return res
      .status(400)
      .json(new ApiResponse(400, "mail 'type' is required"));

  if (!type || type === "tour") {
    try {
      await sendMail(type, {
        name: req.body.name,
        destination: req.body.destination,
        duration: req.body.duration,
        number: req.body.number,
        toEmail: req.body.email,
      });
    } catch (error) {
      return res
        .status(400)
        .json(new ApiResponse(200, "Something went wrong while sending email"));
    }
  }

  if (type === "contact") {
    try {
      await sendMail(type, {
        name: req.body.name,
        number: req.body.number,
        message: req.body.message,
        toEmail: req.body.email,
      });
    } catch (error) {
      return res
        .status(400)
        .json(new ApiResponse(200, "Something went wrong while sending email"));
    }
  }

  if (type === "book-tour") {
    try {
      await sendMail(type, {
        name: req.body.name,
        toEmail: req.body.email,
        enquiry: req.body.enquiry,
      });
    } catch (error) {
      return res
        .status(400)
        .json(new ApiResponse(200, "Something went wrong while sending email"));
    }
  }

  res.status(200).json(new ApiResponse(200, "Email Has Sended Successfully"));
});

// ── GET /filter ───────────────────────────────────────────────────────────────
app.get("/filter", async (req, res) => {
  const duration = req.query.duration;
  const category = req.query.category;

  try {
    let q;
    const colRef = collection(db, "tour");

    if (duration && category) {
      q = query(
        colRef,
        where("TOUR_TYPE", "==", category),
        where("TIME", "==", duration)
      );
    } else if (category) {
      q = query(colRef, where("TOUR_TYPE", "==", category));
    } else if (duration) {
      q = query(colRef, where("TIME", "==", duration));
    } else {
      q = colRef;
    }

    const snapshot = await getDocs(q);
    const tours = snapshotToArray(snapshot);
    res.status(200).json(
      new ApiResponse(200, "Success", { tours, total_page: 1 })
    );
  } catch (error) {
    res.status(400).json(new ApiResponse(400, error.message, error));
  }
});

// ── POST /upload-image ────────────────────────────────────────────────────────
app.post("/upload-image", upload.single("image"), async (req, res) => {
  if (!req.file)
    return res.status(400).json(new ApiResponse(400, "No image file provided"));
  try {
    const url = await uploadToCloudinary(req.file.buffer);
    res
      .status(200)
      .json(new ApiResponse(200, "Image uploaded successfully", { url }));
  } catch (error) {
    res.status(400).json(new ApiResponse(400, error.message, error));
  }
});

// ── POST /tour  (add new tour) ────────────────────────────────────────────────
app.post("/tour", upload.single("image"), async (req, res) => {
  try {
    let imgUrl = req.body.IMG || "";
    if (req.file) imgUrl = await uploadToCloudinary(req.file.buffer);

    const tourData = {
      IMG: imgUrl,
      TITLE: req.body.TITLE || "",
      TIME: req.body.TIME || "",
      PRICE: req.body.PRICE || "",
      DATE: Date.now(),
      DESCRIPTION: req.body.DESCRIPTION || "",
      TOUR_TYPE: req.body.TOUR_TYPE || "",
      TAGS: req.body.TAGS || "",
      URL: req.body.URL || slugify(req.body.TITLE || ""),
    };

    const docRef = await addDoc(collection(db, "tour"), tourData);
    res
      .status(200)
      .json(new ApiResponse(200, "Tour added", { ID: docRef.id, ...tourData }));
  } catch (error) {
    res.status(400).json(new ApiResponse(400, error.message, error));
  }
});

// ── PUT /tour/:ID  (update tour) ──────────────────────────────────────────────
app.put("/tour/:ID", upload.single("image"), async (req, res) => {
  const tourID = req.params.ID;
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.IMG = await uploadToCloudinary(req.file.buffer);
    await updateDoc(doc(db, "tour", tourID), updateData);
    res.status(200).json(new ApiResponse(200, "Tour updated"));
  } catch (error) {
    res.status(400).json(new ApiResponse(400, error.message, error));
  }
});

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

app.listen(8080, () => console.log("✅  Backend running → http://localhost:8080"));
