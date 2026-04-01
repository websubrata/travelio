const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const { query } = require("./database");
const ApiResponse = require("./utils/ApiResponse");
const { sendMail } = require("./utils/sendMail");
const cors = require("cors");
const multer = require("multer");
const { upload } = require("./multer/multer");
const cheerio = require("cheerio");
const request = require("request");
const mysql = require("mysql2/promise");

const totalPagesCache = new Map();

app.use(express.json());
app.use(cors());

app.get("/tours", async (req, res) => {
  // if (!req.query.page)
  //   return res
  //     .status(400)
  //     .json(new ApiResponse(400, "'page' query is require"));

  // const page = parseInt(req.query.page);
  const catname = req.query.catname;
  const table_name = "tour";
  const limit = 12;

  const conditianalQuery = catname ? `WHERE TOUR_TYPE='${catname}'` : "";

  try {
    // const totalDocuments = await query(
    //   `SELECT COUNT(*) AS total_rows FROM ${table_name} ${conditianalQuery}`
    // );
    // const totalPages = Math.ceil(totalDocuments[0].total_rows / limit);

    // const skip = (page - 1) * limit;

    const result = await query(
      `SELECT * FROM ${table_name} ${conditianalQuery}`
    );
    res.status(200).json(
      new ApiResponse(200, "Success", {
        tours: result,
      })
    );
  } catch (error) {
    res.status(400).json(new ApiResponse(400, error.message, error));
  }
});

app.get("/tourslugs", async (req, res) => {
  const table_name = "tour";

  try {
    const result = await query(`SELECT URL FROM ${table_name}`);
    res.status(200).json(new ApiResponse(200, "Success", result));
  } catch (error) {
    res.status(400).json(new ApiResponse(400, error.message, error));
  }
});

app.get("/query", async (req, res) => {
  const tour_type = req.query.tour_type;

  const table_name = "tour";
  const result = await query(
    `SELECT * FROM ${table_name} WHERE TOUR_TYPE = '${tour_type}' LIMIT 12 OFFSET 0`
  );

  res.status(200).json(
    new ApiResponse(200, "Success", {
      tours: result,
      total_page: 1,
    })
  );
});

app.get("/search", async (req, res) => {
  const searchtxt = req.query.q;

  const table_name = "tour";

  if (!searchtxt)
    return res
      .status(400)
      .json(new ApiResponse(400, "enter some search text with 'q' tag"));

  // const sql = `SELECT * FROM ${table_name} WHERE MATCH(TITLE) AGAINST('${searchtxt}')`;
  let sql = `SELECT * FROM ${table_name} WHERE tour.TITLE LIKE ?`;
  // const totalDocuments = await query(sql);

  // console.log(totalDocuments);

  // const totalPages = Math.ceil(totalDocuments[0]?.total_rows / limit);
  // const skip = (page - 1) * limit;

  // sql = `SELECT * FROM tour WHERE tour.TITLE LIKE '${searchtxt}'`;

  const result = await query(sql, [`%${searchtxt}%`]);
  // const result = await query(sql, []);
  res.status(200).json(
    new ApiResponse(200, "Success", {
      tours: result,
      total_page: 1,
    })
  );
});

app.get("/tour/:URL", async (req, res) => {
  const tour_title = req.params.URL;
  const table_name = req.query.tableName || "tourinfo";

  if (!tour_title)
    return res.status(400).json(new ApiResponse(400, "TITLE is required"));

  const sql = `SELECT * FROM ${table_name} WHERE ${table_name}.URL = ?`;

  try {
    const result = await query(sql, [tour_title]);
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(200).json([]);
  }
});

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

  // if (type === "rewards") {
  //   try {
  //     await sendMail(type, {
  //       name: req.body.name,
  //       number: req.body.number,
  //       message: req.body.destination,
  //       toEmail: req.body.email,
  //     });
  //   } catch (error) {
  //     return res.status(400).json(new ApiResponse(200, "Something went wrong while sending email"));
  //   }
  // }

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

app.get("/filter", async (req, res) => {
  const table_name = "tour";
  const duration = req.query.duration;
  const category = req.query.category;

  // const LIMIT = 5;

  // const durations = Array.isArray(req.query.duration || [])
  //   ? req.query.duration
  //   : [req.query.duration];
  // const tourTypes = Array.isArray(req.query["tour-type"] || [])
  //   ? req.query["tour-type"]
  //   : [req.query["tour-type"]];

  // let tourTypesTxt = null;
  // tourTypes?.forEach((element) => {
  //   if (!tourTypesTxt) {
  //     tourTypesTxt = `'${element}'`;
  //   } else {
  //     tourTypesTxt += `,'${element}'`;
  //   }
  // });

  // let durationTxt = null;
  // durations?.forEach((element) => {
  //   if (!durationTxt) {
  //     durationTxt = `'${element}'`;
  //   } else {
  //     durationTxt += `,'${element}'`;
  //   }
  // });

  // let newSql = `SELECT * FROM ${table_name} WHERE TOUR_TYPE IN (${tourTypesTxt}) ${
  //   durationTxt ? `AND TIME IN (${durationTxt})` : ""
  // }`;
  // // console.log(newSql);

  // let sql = `SELECT * FROM ${table_name}`;

  // if (!tourTypesTxt && durationTxt) {
  //   sql += ` WHERE TIME IN (${durationTxt})`;
  // }

  // if (tourTypesTxt && !durationTxt) {
  //   sql += ` WHERE TOUR_TYPE IN (${tourTypesTxt})`;
  // }

  // if (tourTypesTxt && durationTxt) {
  //   sql += ` WHERE TOUR_TYPE IN (${tourTypesTxt}) AND TIME IN (${durationTxt})`;
  // }

  let sql = `SELECT * FROM ${table_name}`;

  if (duration && category) {
    sql += ` WHERE TOUR_TYPE IN ('${category}') AND TIME IN ('${duration}')`;
  }

  if (!duration && category) {
    sql += ` WHERE TOUR_TYPE IN ('${category}')`;
  }

  if (duration && !category) {
    sql += ` WHERE TOUR_TYPE IN ('${category}')`;
  }

  const result = await query(sql);
  res.status(200).json(
    new ApiResponse(200, "Success", {
      tours: result,
      total_page: 1,
    })
  );
});

app.get("/add-slugs", async (req, res) => {
  function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, "-") // Replace spaces & non-word chars with "-"
      .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
  }

  const HOST = process.env.DB_HOST;
  const USER = process.env.DB_USER;
  const PASS = process.env.DB_PASSWORD;
  const DB = process.env.DATABASE;
  const DB_PORT = process.env.DB_PORT;

  const connection = await mysql.createConnection({
    host: HOST,
    port: DB_PORT,
    user: USER,
    password: PASS,
    database: DB,
    connectTimeout: 60000,
  });

  // 1. Fetch all titles
  const [rows] = await connection.execute("SELECT ID, TITLE FROM tour");

  // 2. Prepare bulk update
  const updates = rows.map((row) => ({
    id: row.ID,
    slug: slugify(row.TITLE),
  }));

  // 3. Execute updates in batches (safely)
  for (const update of updates) {
    await connection.execute("UPDATE tour SET URL = ? WHERE ID = ?", [
      update.slug,
      update.id,
    ]);
  }

  await connection.end();
  // console.log('All slugs updated successfully.');
  res.send("DONE");
});

app.get("/add-slugs-2", async (req, res) => {
  function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, "-") // Replace spaces & non-word chars with "-"
      .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
  }

  const HOST = process.env.DB_HOST;
  const USER = process.env.DB_USER;
  const PASS = process.env.DB_PASSWORD;
  const DB = process.env.DATABASE;
  const DB_PORT = process.env.DB_PORT;

  const connection = await mysql.createConnection({
    host: HOST,
    port: DB_PORT,
    user: USER,
    password: PASS,
    database: DB,
    connectTimeout: 60000,
  });

  // 1. Fetch all titles
  const [rows] = await connection.execute("SELECT ID, title FROM tourinfo");

  // 2. Prepare bulk update
  const updates = rows.map((row) => ({
    id: row.ID,
    slug: slugify(row.title),
  }));

  // 3. Execute updates in batches (safely)
  for (const update of updates) {
    await connection.execute("UPDATE tourinfo SET URL = ? WHERE ID = ?", [
      update.slug,
      update.id,
    ]);
  }

  await connection.end();
  // console.log('All slugs updated successfully.');
  res.send("DONE 2");
});


app.listen(8080, console.log("http://localhost:8080"));
