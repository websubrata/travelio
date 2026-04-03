/**
 * migrate-to-firestore.js
 * -----------------------
 * Reads the MySQL backup data and imports it into Firestore.
 * Run once: node migrate-to-firestore.js
 *
 * USAGE:
 *   1. Make sure your .env has FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY
 *   2. Run: node migrate-to-firestore.js
 */

require("dotenv").config();
const admin = require("firebase-admin");

// ─── Firebase Init ────────────────────────────────────────────────────────────
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY
      ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
      : undefined,
  }),
});
const db = admin.firestore();

// ─── Tour Data (from MySqlDatabaseBackup.sql) ─────────────────────────────────
const tourData = [
  { IMG: "https://travlio.in/wp-content/uploads/2024/02/Manmohak-Europe-Summer-2024-600x370.jpg", TITLE: "Manmohak Europe (Summer 2024)", TIME: "10 Days 9 Nights ", PRICE: "₹303,375", DATE: 1713002609615, DESCRIPTION: "", TOUR_TYPE: "International Tour", TAGS: "", URL: "manmohak-europe-summer-2024" },
  { IMG: "https://travlio.in/wp-content/uploads/2024/02/Ananya-Europe-Summer-2024-600x370.jpg", TITLE: "Ananya Europe (Summer 2024)", TIME: "10 Days 9 Nights ", PRICE: "₹273,263", DATE: 1713002609616, DESCRIPTION: "", TOUR_TYPE: "International Tour", TAGS: "", URL: "ananya-europe-summer-2024" },
  { IMG: "https://travlio.in/wp-content/uploads/2024/02/Snighdo-Sarathe-Europe-Durga-Puja-Special-600x370.jpg", TITLE: "Snighdo Sarathe Europe – Durga Puja Special", TIME: "10 Days 9 Nights ", PRICE: "₹273,263", DATE: 1713002609616, DESCRIPTION: "", TOUR_TYPE: "International Tour", TAGS: "", URL: "snighdo-sarathe-europe-durga-puja-special" },
  { IMG: "https://travlio.in/wp-content/uploads/2024/02/Fantastic-France-600x370.jpg", TITLE: "Fantastic France", TIME: "10 Days 9 Nights ", PRICE: "₹233,038", DATE: 1713002609616, DESCRIPTION: "", TOUR_TYPE: "International Tour", TAGS: "", URL: "fantastic-france" },
  { IMG: "https://travlio.in/wp-content/uploads/2024/02/Magical-Europe-Summer-2024-600x370.jpg", TITLE: "Magical Europe (Summer 2024)", TIME: "10 Days 9 Nights ", PRICE: "₹303,875", DATE: 1713002609616, DESCRIPTION: "", TOUR_TYPE: "International Tour", TAGS: "", URL: "magical-europe-summer-2024" },
  { IMG: "https://travlio.in/wp-content/uploads/2024/02/Super-Budget-Tour-Of-Europe-Summer-2024-600x370.jpg", TITLE: "Super Budget Tour Of Europe (Summer 2024)", TIME: "10 Days 9 Nights ", PRICE: "₹267,250", DATE: 1713002609616, DESCRIPTION: "", TOUR_TYPE: "International Tour", TAGS: "", URL: "super-budget-tour-of-europe-summer-2024" },
  { IMG: "https://travlio.in/wp-content/uploads/2024/02/Darsaniya-Europe-With-Louvre-Durga-Puja-Special-600x370.jpg", TITLE: "Darsaniya Europe With Louvre – Durga Puja Special", TIME: "11 Days 10 Nights ", PRICE: "₹286,113", DATE: 1713002609616, DESCRIPTION: "", TOUR_TYPE: "International Tour", TAGS: "", URL: "darsaniya-europe-with-louvre-durga-puja-special" },
  { IMG: "https://travlio.in/wp-content/uploads/2024/02/Darsaniya-Europe-Durga-Puja-Special-600x370.jpg", TITLE: "Darsaniya Europe – Durga Puja Special", TIME: "11 Days 10 Nights ", PRICE: "₹286,113", DATE: 1713002609616, DESCRIPTION: "", TOUR_TYPE: "International Tour", TAGS: "", URL: "darsaniya-europe-durga-puja-special" },
  { IMG: "https://travlio.in/wp-content/uploads/2024/02/Darsaniya-Europe-Summer-2024-600x370.jpg", TITLE: "Darsaniya Europe (Summer 2024)", TIME: "11 Days 10 Nights ", PRICE: "₹286,113", DATE: 1713002609616, DESCRIPTION: "", TOUR_TYPE: "International Tour", TAGS: "", URL: "darsaniya-europe-summer-2024" },
  { IMG: "https://travlio.in/wp-content/uploads/2024/02/Fusion-Europe-Winter-600x370.jpg", TITLE: "Fusion Europe (Winter)", TIME: "11 Days 10 Nights ", PRICE: "₹250,563", DATE: 1713002609616, DESCRIPTION: "", TOUR_TYPE: "International Tour", TAGS: "", URL: "fusion-europe-winter" },
  { IMG: "https://travlio.in/wp-content/uploads/2024/02/European-Fusion-Dreams-Senior-Citizens-Special-Summer-2024-600x370.jpg", TITLE: "European Fusion Dreams – Senior Citizens Special (Summer 2024)", TIME: "11 Days 10 Nights ", PRICE: "₹270,625", DATE: 1713002628079, DESCRIPTION: "", TOUR_TYPE: "International Tour", TAGS: "", URL: "european-fusion-dreams-senior-citizens-special-summer-2024" },
  { IMG: "https://travlio.in/wp-content/uploads/2024/02/Fusion-Europe-Summer-2024-600x370.jpg", TITLE: "Fusion Europe (Summer 2024)", TIME: "11 Days 10 Nights ", PRICE: "₹263,363", DATE: 1713002628079, DESCRIPTION: "", TOUR_TYPE: "International Tour", TAGS: "", URL: "fusion-europe-summer-2024" },
  { IMG: "https://travlio.in/wp-content/uploads/2024/02/European-Dreams-Senior-Citizen-Special-Summer-2024-600x370.jpg", TITLE: "European Dreams – Senior Citizen Special (Summer 2024)", TIME: "15 Days 14 Nights ", PRICE: "₹355,825", DATE: 1713002628079, DESCRIPTION: "", TOUR_TYPE: "International Tour", TAGS: "", URL: "european-dreams-senior-citizen-special-summer-2024" },
  { IMG: "https://travlio.in/wp-content/uploads/2024/02/Highlights-of-Europe-DISNEYLAND%C2%AE-Summer-2024-600x370.jpg", TITLE: "Highlights of Europe (DISNEYLAND®) (Summer 2024)", TIME: "15 Days 14 Nights ", PRICE: "₹355,075", DATE: 1713002628079, DESCRIPTION: "", TOUR_TYPE: "International Tour", TAGS: "", URL: "highlights-of-europe-disneyland-summer-2024" },
  { IMG: "https://travlio.in/wp-content/uploads/2024/02/Enchanting-East-Europe-With-4-Nights-Balkans-Summer-2024-600x370.jpg", TITLE: "Enchanting East Europe With 4 Nights Balkans (Summer 2024)", TIME: "15 Days 14 Nights ", PRICE: "₹299,000", DATE: 1713002628079, DESCRIPTION: "", TOUR_TYPE: "International Tour", TAGS: "", URL: "enchanting-east-europe-with-4-nights-balkans-summer-2024" },
  { IMG: "https://travlio.in/wp-content/uploads/2024/02/Chitramoy-Europe-Summer-2024-600x370.jpg", TITLE: "Chitramoy Europe (Summer 2024)", TIME: "15 Days 14 Nights ", PRICE: "₹390,563", DATE: 1713002628079, DESCRIPTION: "", TOUR_TYPE: "International Tour", TAGS: "", URL: "chitramoy-europe-summer-2024" },
  { IMG: "https://travlio.in/wp-content/uploads/2024/02/Chitramoy-Europe-Durga-Puja-Special-600x370.jpg", TITLE: "Chitramoy Europe – Durga Puja Special", TIME: "15 Days 14 Nights ", PRICE: "₹385,563", DATE: 1713002628079, DESCRIPTION: "", TOUR_TYPE: "International Tour", TAGS: "", URL: "chitramoy-europe-durga-puja-special" },
  { IMG: "https://travlio.in/wp-content/uploads/2024/02/Grand-Bargain-Tour-Of-Europe-With-Versailles-And-Montmartre-Summer-2024-600x370.jpg", TITLE: "Grand Bargain Tour Of Europe With Versailles And Montmartre (Summer 2024)", TIME: "15 Days 14 Nights ", PRICE: "₹380,638", DATE: 1713002628079, DESCRIPTION: "", TOUR_TYPE: "International Tour", TAGS: "", URL: "grand-bargain-tour-of-europe-with-versailles-and-montmartre-summer-2024" },
  { IMG: "https://travlio.in/wp-content/uploads/2024/02/Grand-Bargain-Tour-Of-Europe-With-Disneyland-Summer-2024-600x370.jpg", TITLE: "Grand Bargain Tour Of Europe With Disneyland (Summer 2024)", TIME: "15 Days 14 Nights ", PRICE: "₹380,638", DATE: 1713002628079, DESCRIPTION: "", TOUR_TYPE: "International Tour", TAGS: "", URL: "grand-bargain-tour-of-europe-with-disneyland-summer-2024" },
  { IMG: "https://travlio.in/wp-content/uploads/2024/02/east-europe-600x370.jpg", TITLE: "Best Of East and West Europe (Summer 2024)", TIME: "15 Days 14 Nights ", PRICE: "₹375,900", DATE: 1713002628079, DESCRIPTION: "", TOUR_TYPE: "International Tour", TAGS: "", URL: "best-of-east-and-west-europe-summer-2024" },
  { IMG: "https://travlio.in/wp-content/uploads/2017/01/ZurichPanaromic-600x370.jpg", TITLE: "Sensational Europe (Summer 2024)", TIME: "15 Days 14 Nights ", PRICE: "₹360,538", DATE: 1713002644927, DESCRIPTION: "", TOUR_TYPE: "International Tour", TAGS: "", URL: "sensational-europe-summer-2024" },
  { IMG: "https://travlio.in/wp-content/uploads/2017/01/Paris-600x370.jpg", TITLE: "Highlights of Europe (Summer 2024)", TIME: "15 Days 14 Nights ", PRICE: "₹340,075", DATE: 1713002644927, DESCRIPTION: "", TOUR_TYPE: "International Tour", TAGS: "", URL: "highlights-of-europe-summer-2024" },
  { IMG: "https://travlio.in/wp-content/uploads/2024/02/Apna-Punjab-With-Himachal-Private-Tour-600x370.jpg", TITLE: "Apna Punjab With Himachal – Private Tour", TIME: "7 Days 6 Nights ", PRICE: "₹41,900", DATE: 1713002844772, DESCRIPTION: "", TOUR_TYPE: "Domestic Tour", TAGS: "", URL: "apna-punjab-with-himachal-private-tour" },
  { IMG: "https://travlio.in/wp-content/uploads/2024/02/Customizable-Himachal-Shimla-Manali-Chandigarh-600x370.jpg", TITLE: "Customizable Himachal (Shimla – Manali – Chandigarh)", TIME: "7 Days 6 Nights ", PRICE: "₹26,900", DATE: 1713002844772, DESCRIPTION: "", TOUR_TYPE: "Domestic Tour", TAGS: "", URL: "customizable-himachal-shimla-manali-chandigarh" },
  { IMG: "https://travlio.in/wp-content/uploads/2024/02/Nubra-Valley-Trails-with-Leh-and-Pangong-600x370.jpg", TITLE: "Nubra Valley Trails with Leh and Pangong", TIME: "7 Days 6 Nights ", PRICE: "₹45,799", DATE: 1713002844772, DESCRIPTION: "", TOUR_TYPE: "Domestic Tour", TAGS: "", URL: "nubra-valley-trails-with-leh-and-pangong" },
  { IMG: "https://travlio.in/wp-content/uploads/2024/02/Marvellous-Ladakh-with-Turtuk-600x370.jpg", TITLE: "Marvellous Ladakh with Turtuk", TIME: "7 Days 6 Nights ", PRICE: "₹45,499", DATE: 1713002844772, DESCRIPTION: "", TOUR_TYPE: "Domestic Tour", TAGS: "", URL: "marvellous-ladakh-with-turtuk" },
  { IMG: "https://travlio.in/wp-content/uploads/2024/02/Classic-Ladakh-600x370.jpg", TITLE: "Classic Ladakh", TIME: "7 Days 6 Nights ", PRICE: "₹45,399", DATE: 1713002844772, DESCRIPTION: "", TOUR_TYPE: "Domestic Tour", TAGS: "", URL: "classic-ladakh" },
  { IMG: "https://travlio.in/wp-content/uploads/2024/02/Marvellous-Ladakh-600x370.jpg", TITLE: "Marvellous Ladakh", TIME: "7 Days 6 Nights ", PRICE: "₹42,099", DATE: 1713002844772, DESCRIPTION: "", TOUR_TYPE: "Domestic Tour", TAGS: "", URL: "marvellous-ladakh" },
  { IMG: "https://travlio.in/wp-content/uploads/2024/02/Leh-Ladakh-With-Hanle-And-Umlingla-Pass-600x370.jpg", TITLE: "Leh Ladakh With Hanle And Umlingla Pass", TIME: "7 Days 6 Nights ", PRICE: "₹47,799", DATE: 1713002844772, DESCRIPTION: "", TOUR_TYPE: "Domestic Tour", TAGS: "", URL: "leh-ladakh-with-hanle-and-umlingla-pass" },
  { IMG: "https://travlio.in/wp-content/uploads/2024/02/Exotic-Kashmir-with-Gulmarg-Durga-Puja-Special-600x370.jpg", TITLE: "Exotic Kashmir with Gulmarg – Durga Puja Special", TIME: "7 Days 6 Nights ", PRICE: "₹89,900", DATE: 1713002844772, DESCRIPTION: "", TOUR_TYPE: "Domestic Tour", TAGS: "", URL: "exotic-kashmir-with-gulmarg-durga-puja-special" },
  { IMG: "https://travlio.in/wp-content/uploads/2024/02/Exotic-Kashmir-with-Sonmarg-Durga-Puja-Special-600x370.jpg", TITLE: "Exotic Kashmir with Sonmarg – Durga Puja Special", TIME: "7 Days 6 Nights ", PRICE: "₹84,900", DATE: 1713002844772, DESCRIPTION: "", TOUR_TYPE: "Domestic Tour", TAGS: "", URL: "exotic-kashmir-with-sonmarg-durga-puja-special" },
  { IMG: "https://travlio.in/wp-content/uploads/2024/02/Honeymoon-Amazing-Moments-Kashmir-with-Sonmarg-Excursion-Summer-Special-600x370.jpg", TITLE: "Honeymoon – Amazing Moments Kashmir with Sonmarg Excursion – Summer Special", TIME: "7 Days 6 Nights ", PRICE: "₹56,900", DATE: 1713002844772, DESCRIPTION: "", TOUR_TYPE: "Domestic Tour", TAGS: "", URL: "honeymoon-amazing-moments-kashmir-with-sonmarg-excursion-summer-special" },
  { IMG: "https://travlio.in/wp-content/uploads/2024/02/Honeymoon-Amazing-Moments-Kashmir-with-Sonmarg-Excursion-600x370.jpg", TITLE: "Honeymoon – Amazing Moments Kashmir with Sonmarg Excursion", TIME: "7 Days 6 Nights ", PRICE: "₹48,900", DATE: 1713002854812, DESCRIPTION: "", TOUR_TYPE: "Domestic Tour", TAGS: "", URL: "honeymoon-amazing-moments-kashmir-with-sonmarg-excursion" },
  { IMG: "https://travlio.in/wp-content/uploads/2024/02/Customizable-Kashmir-Week-600x370.jpg", TITLE: "Customizable Kashmir Week", TIME: "7 Days 6 Nights ", PRICE: "₹44,900", DATE: 1713002854812, DESCRIPTION: "", TOUR_TYPE: "Domestic Tour", TAGS: "", URL: "customizable-kashmir-week" },
  { IMG: "https://travlio.in/wp-content/uploads/2024/02/Customizable-Experience-Kashmir-With-Sonmarg-Excursion-600x370.jpg", TITLE: "Customizable Experience Kashmir With Sonmarg Excursion", TIME: "7 Days 6 Nights ", PRICE: "₹41,900", DATE: 1713002854812, DESCRIPTION: "", TOUR_TYPE: "Domestic Tour", TAGS: "", URL: "customizable-experience-kashmir-with-sonmarg-excursion" },
  { IMG: "https://travlio.in/wp-content/uploads/2024/02/Heaven-Kashmir-with-Sonmarg-Gulmarg-Excursion-600x370.jpg", TITLE: "Heaven Kashmir with Sonmarg – Gulmarg Excursion", TIME: "7 Days 6 Nights ", PRICE: "₹40,900", DATE: 1713002854812, DESCRIPTION: "", TOUR_TYPE: "Domestic Tour", TAGS: "", URL: "heaven-kashmir-with-sonmarg-gulmarg-excursion" },
  { IMG: "https://travlio.in/wp-content/uploads/2024/02/Customizable-Kashmir-Wow-Kashmir-With-Gulmarg-And-Sonmarg-Excursion-600x370.jpg", TITLE: "Customizable Kashmir-Wow Kashmir With Gulmarg And Sonmarg Excursion", TIME: "7 Days 6 Nights ", PRICE: "₹38,900", DATE: 1713002854812, DESCRIPTION: "", TOUR_TYPE: "Domestic Tour", TAGS: "", URL: "customizable-kashmir-wow-kashmir-with-gulmarg-and-sonmarg-excursion" },
];

// ─── tourinfo Data (abridged titles + urls, HTML descriptions omitted for brevity) ──
// The htmlDescription is too large to inline here. The script will create the
// documents with correct URLs — you can add htmlDescription via the Firestore console
// or extend this array with the full HTML strings from your SQL backup.
const tourinfoData = [
  { URL: "apna-punjab-with-himachal-private-tour", title: "Apna Punjab With Himachal – Private Tour" },
  { URL: "customizable-himachal-shimla-manali-chandigarh", title: "Customizable Himachal (Shimla – Manali – Chandigarh)" },
  { URL: "nubra-valley-trails-with-leh-and-pangong", title: "Nubra Valley Trails with Leh and Pangong" },
  { URL: "marvellous-ladakh-with-turtuk", title: "Marvellous Ladakh with Turtuk" },
  { URL: "classic-ladakh", title: "Classic Ladakh" },
  { URL: "marvellous-ladakh", title: "Marvellous Ladakh" },
  { URL: "leh-ladakh-with-hanle-and-umlingla-pass", title: "Leh Ladakh With Hanle And Umlingla Pass" },
  { URL: "exotic-kashmir-with-gulmarg-durga-puja-special", title: "Exotic Kashmir with Gulmarg – Durga Puja Special" },
  { URL: "exotic-kashmir-with-sonmarg-durga-puja-special", title: "Exotic Kashmir with Sonmarg – Durga Puja Special" },
  { URL: "honeymoon-amazing-moments-kashmir-with-sonmarg-excursion-summer-special", title: "Honeymoon – Amazing Moments Kashmir with Sonmarg Excursion – Summer Special" },
  { URL: "honeymoon-amazing-moments-kashmir-with-sonmarg-excursion", title: "Honeymoon – Amazing Moments Kashmir with Sonmarg Excursion" },
  { URL: "customizable-kashmir-week", title: "Customizable Kashmir Week" },
  { URL: "customizable-experience-kashmir-with-sonmarg-excursion", title: "Customizable Experience Kashmir With Sonmarg Excursion" },
  { URL: "heaven-kashmir-with-sonmarg-gulmarg-excursion", title: "Heaven Kashmir with Sonmarg – Gulmarg Excursion" },
  { URL: "customizable-kashmir-wow-kashmir-with-gulmarg-and-sonmarg-excursion", title: "Customizable Kashmir-Wow Kashmir With Gulmarg And Sonmarg Excursion" },
  { URL: "manmohak-europe-summer-2024", title: "Manmohak Europe (Summer 2024)" },
  { URL: "ananya-europe-summer-2024", title: "Ananya Europe (Summer 2024)" },
  { URL: "snighdo-sarathe-europe-durga-puja-special", title: "Snighdo Sarathe Europe – Durga Puja Special" },
  { URL: "fantastic-france", title: "Fantastic France" },
  { URL: "magical-europe-summer-2024", title: "Magical Europe (Summer 2024)" },
  { URL: "super-budget-tour-of-europe-summer-2024", title: "Super Budget Tour Of Europe (Summer 2024)" },
  { URL: "darsaniya-europe-with-louvre-durga-puja-special", title: "Darsaniya Europe With Louvre – Durga Puja Special" },
  { URL: "darsaniya-europe-durga-puja-special", title: "Darsaniya Europe – Durga Puja Special" },
];

async function migrate() {
  console.log("🚀 Starting migration to Firestore...\n");

  // ── Migrate `tour` collection ────────────────────────────────────────────────
  console.log(`Migrating ${tourData.length} tours...`);
  const tourBatch = db.batch();
  for (const tour of tourData) {
    const ref = db.collection("tour").doc(); // auto-ID
    tourBatch.set(ref, tour);
  }
  await tourBatch.commit();
  console.log(`✅ ${tourData.length} tours migrated.\n`);

  // ── Migrate `tourinfo` collection ────────────────────────────────────────────
  console.log(`Migrating ${tourinfoData.length} tourinfo entries...`);
  const infoBatch = db.batch();
  for (const info of tourinfoData) {
    const ref = db.collection("tourinfo").doc();
    infoBatch.set(ref, { ...info, htmlDescription: "" });
  }
  await infoBatch.commit();
  console.log(`✅ ${tourinfoData.length} tourinfo entries migrated.\n`);

  console.log("🎉 Migration complete!");
  console.log("⚠️  NOTE: htmlDescription fields in `tourinfo` are empty.");
  console.log("   Please add them via the Firestore Console or extend the");
  console.log("   tourinfoData array in this script with the full HTML from your SQL backup.");

  process.exit(0);
}

migrate().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});
