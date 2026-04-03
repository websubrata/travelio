const fs = require("fs");
const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDiiF9FEYsVOtCi3AAffbF-f5D8tBvUj80",
  projectId: "travelio-29221",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Simple string parse ignoring syntax
function fixTourInfo() {
  const sqlStr = fs.readFileSync("../MySqlDatabaseBackup.sql", "utf-8");
  
  // Find all INSERT INTO `tourinfo` lines
  const parts = sqlStr.split("INSERT INTO `tourinfo` (`title`, `htmlDescription`, `ID`, `URL`) VALUES\n");
  
  let count = 0;
  
  // parts[0] is everything before the first INSERT
  for (let i = 1; i < parts.length; i++) {
     const block = parts[i];
     // The block ends at the semicolon. But it might have comments? Let's just find the first ');\n'
     // It ends actually right before the next `--` or empty line for the dump
     // We will use a regex to extract the tuple for tourinfo
     
     // tourinfo has 4 strings. They might contain anything.
     // Let's use eval or new Function! No, it's safer to just regex.
     // Since the dump has one tuple per INSERT for tourinfo:
     // e.g. ('Title', '...html...', 1, 'url');
     
     // Match the entire tuple up to `);` at the end
     const endIdx = block.indexOf(');\n');
     if (endIdx === -1) continue;
     
     const content = block.substring(0, endIdx + 1); // "('...', '...', 1, '...')"
     
     // Parse safely
     let insideStr = false;
     let escapeNext = false;
     let currentItem = "";
     let parsedTuple = [];
    
     // Start from 1 to skip first '('
     for(let j = 1; j < content.length; j++) {
         const char = content[j];
         if (escapeNext) {
             currentItem += char;
             escapeNext = false;
             continue;
         }
         
         if (char === "\\") {
             escapeNext = true;
             // currentItem += "\\"; // Don't add slash to output
             continue;
         }
         
         if (char === "'") {
             insideStr = !insideStr;
             continue;
         }
         
         if (char === "," && !insideStr) {
             parsedTuple.push(currentItem.trim());
             currentItem = "";
             continue; // Skip the comma
         }
         
         if (char === ")" && !insideStr) {
             parsedTuple.push(currentItem.trim());
             break;
         }
         
         currentItem += char;
     }

     if (parsedTuple.length >= 4) {
         const title = parsedTuple[0];
         const htmlDescription = parsedTuple[1];
         const ID = parsedTuple[2];
         let URL = parsedTuple[3];
         
         if(URL.startsWith("'")) URL = URL.substring(1);
         if(URL.endsWith("'")) URL = URL.substring(0, URL.length - 1);
         
         console.log("Found TourInfo:", title, "->", URL);
         
         setDoc(doc(db, "tourinfo", ID.replace(/'/g, "")), {
             title: title,
             htmlDescription: htmlDescription,
             URL: URL
         }).then(() => console.log("Pushed " + URL)).catch(e => console.error(e));
         count++;
     }
  }
}

fixTourInfo();
