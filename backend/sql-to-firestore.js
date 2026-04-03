const fs = require("fs");
const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc } = require("firebase/firestore");

// ── Firebase Web Config (hardcoded as requested) ─────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyDiiF9FEYsVOtCi3AAffbF-f5D8tBvUj80",
  authDomain: "travelio-29221.firebaseapp.com",
  projectId: "travelio-29221",
  storageBucket: "travelio-29221.firebasestorage.app",
  messagingSenderId: "313313089917",
  appId: "1:313313089917:web:a2fe2bcd404f6418275414",
  measurementId: "G-S3RGF5DS2D",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Regex matching string literals (handling escaped quotes) and numbers/NULL
// An approximation for typical mysqldump VALUES lines: (val1, val2, ...),(...)
function parseInsertValues(sqlStr, startKeyword) {
  const index = sqlStr.indexOf(startKeyword);
  if (index === -1) return [];

  const valuesString = sqlStr.substring(index + startKeyword.length);
  // Find the first semicolon after VALUES
  const valuesBlock = valuesString.substring(0, valuesString.indexOf(";"));

  const results = [];
  // basic regex to find tuples e.g. ('img', 'title', 123)
  const tupleRegex = /\((.*?)\)(?:,|$)/gs;
  let match;

  while ((match = tupleRegex.exec(valuesBlock)) !== null) {
        let insideStr = false;
        let escapeNext = false;
        let currentItem = "";
        let parsedTuple = [];

        const str = match[1];
        for (let i = 0; i < str.length; i++) {
            const char = str[i];

            if (escapeNext) {
                currentItem += char;
                escapeNext = false;
                continue;
            }

            if (char === "\\") {
                escapeNext = true;
                continue;
            }

            if (char === "'") {
                insideStr = !insideStr;
                continue;
            }

            if (char === "," && !insideStr) {
                parsedTuple.push(currentItem.trim());
                currentItem = "";
                continue;
            }

            currentItem += char;
        }
        parsedTuple.push(currentItem.trim()); // push last item
        results.push(parsedTuple);
  }
  return results;
}

async function migrate() {
  const sql = fs.readFileSync("../MySqlDatabaseBackup.sql", "utf-8");

  // `tour` table
  const tourSignature = "INSERT INTO `tour` (`IMG`, `TITLE`, `TIME`, `PRICE`, `DATE`, `DESCRIPTION`, `TOUR_TYPE`, `TAGS`, `ID`, `URL`) VALUES\n";
  const tours = parseInsertValues(sql, tourSignature);

  let successCount = 0;

  for (const t of tours) {
    if (t.length < 10) continue;
    
    // Columns: IMG, TITLE, TIME, PRICE, DATE, DESCRIPTION, TOUR_TYPE, TAGS, ID, URL
    const tourData = {
      IMG: t[0],
      TITLE: t[1],
      TIME: t[2],
      PRICE: t[3],
      DATE: t[4],
      DESCRIPTION: t[5],
      TOUR_TYPE: t[6],
      TAGS: t[7],
      URL: t[9],
    };
    
    // We use the same ID string from SQL so the relation holds
    const docId = t[8];
    try {
      if (docId) {
         await setDoc(doc(db, "tour", docId), tourData);
         successCount++;
         console.log(`Pushed tour ${docId} / ${t[1]}`);
      }
    } catch(e) {
      console.log('Error pushing tour:', e.message);
    }
  }

  // `tourinfo` table
  // There are multiple INSERT INTO `tourinfo` statements in the file
  const infoMatches = sql.matchAll(/INSERT INTO `tourinfo` \(`title`, `htmlDescription`, `ID`, `URL`\) VALUES\n(.*?\);)/gs);
  
  for (const infoMatch of infoMatches) {
        const block = infoMatch[1];
        const tuples = parseInsertValues(block, "");
        for (const t of tuples) {
            if (t.length < 4) continue;
            
            const infoData = {
                title: t[0],
                htmlDescription: t[1],
                URL: t[3]
            };
            const docId = t[2];
            try {
               await setDoc(doc(db, "tourinfo", docId), infoData);
               console.log(`Pushed tourinfo ${docId} / ${t[0]}`);
            } catch(e) {
               console.log("Error pushing tourinfo:", e.message);
            }
        }
  }

  console.log(`Migration completed! Successfully migrated ${successCount} tours.`);
  process.exit(0);
}

migrate();
