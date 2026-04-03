const fs = require('fs');
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

const firebaseConfig = { apiKey: 'AIzaSyDiiF9FEYsVOtCi3AAffbF-f5D8tBvUj80', projectId: 'travelio-29221' };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sql = fs.readFileSync('../MySqlDatabaseBackup.sql', 'utf-8');

async function migrate() {
  // Regex to match a full row: 
  // Starts with: ('
  // Followed by TITLE
  // Followed by ', '
  // Followed by HTML (which can have newlines)
  // Followed by ', ID, 'URL'
  // Followed by )
  // We use [\s\S]*? for HTML description
  // Since URL is always kebab-case, it's [a-z0-9-]+
  const regex = /\('([^']+)',\s*'([\s\S]*?)',\s*(\d+),\s*'([a-z0-9-]+)'\)/g;
  
  let match;
  let count = 0;
  
  // We need to only search within the tourinfo area, but we can also just search the whole file
  // since the pattern is so specific to tourinfo
  
  while ((match = regex.exec(sql)) !== null) {
    const title = match[1];
    const htmlDescription = match[2];
    const ID = match[3];
    const URL = match[4];
    
    // We only care about tourinfo URLs, let's see if we can check if it has HTML
    if (htmlDescription.includes('<div') || htmlDescription.includes('<ul') || htmlDescription.includes('<p>')) {
        console.log(`Pushing ID: ${ID}, URL: ${URL}`);
        
        let cleanHtml = htmlDescription.replace(/\\\\n/g, '\n').replace(/\\\\r/g, '\r').replace(/\\n/g, '\n').replace(/\\r/g, '\r');
        
        try {
          await setDoc(doc(db, 'tourinfo', ID), {
            title: title.trim(),
            htmlDescription: cleanHtml,
            URL: URL
          });
          count++;
          console.log(`Success ${URL}`);
        } catch(e) {
          console.log(`Error on ${URL}:`, e);
        }
    }
  }
  console.log(`Successfully migrated ${count} itineraries!`);
  process.exit(0);
}

migrate();
