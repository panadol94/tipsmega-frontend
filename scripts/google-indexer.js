require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

// Note: Ensure you have placed 'service-account.json' in this 'scripts' directory.
const KEY_PATH = path.join(__dirname, 'service-account.json');
const BASE_URL = 'https://tipsmega888.com';

async function generateAccessToken() {
  if (!fs.existsSync(KEY_PATH)) {
    console.error(`❌ ERAT: Fail kunci tidak dijumpai di: ${KEY_PATH}`);
    console.error('Sila letakkan fail "service-account.json" yang dimuat turun dari Google Cloud ke dalam folder "scripts".');
    process.exit(1);
  }

  // Initialize GoogleAuth explicitly with the key file
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_PATH,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });

  try {
    const client = await auth.getClient();
    const token = await client.getAccessToken();
    return token.token;
  } catch (err) {
    console.error('❌ ERAT Auth:', err);
    throw err;
  }
}

async function requestIndexing(urls) {
  const token = await generateAccessToken();
  const indexing = google.indexing('v3');

  console.log(`🚀 Mula hantar ${urls.length} link ke Google Indexing API...`);

  for (const url of urls) {
    try {
      const response = await indexing.urlNotifications.publish({
        access_token: token,
        requestBody: {
          url: url,
          type: 'URL_UPDATED' // Gunakan 'URL_DELETED' jika nak buang link dari Google
        }
      });
      console.log(`✅ BERJAYA: ${url}`);
    //   console.log('   Butiran:', response.data);
    } catch (error) {
       console.error(`❌ GAGAL: ${url}`);
       if(error.response && error.response.data && error.response.data.error) {
            console.error('   Sebab:', error.response.data.error.message);
       } else {
           console.error('   Sebab:', error);
       }
    }
  }
}

// ------ GET URLS DARI DATA ------
function getAllUrls() {
    let blogArticles = [];
    let gamePages = [];

    try {
        // We parse the generated TS files essentially using static regex reading 
        // because we don't want to transpile TS just for this script snippet.
        const blogContent = fs.readFileSync(path.join(__dirname, '../app/data/blogArticles.ts'), 'utf8');
        const gameContent = fs.readFileSync(path.join(__dirname, '../app/data/gamePages.ts'), 'utf8');

        // Extract slugs using regex
        const blogSlugs = [...blogContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
        const gameSlugs = [...gameContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);

        blogArticles = blogSlugs;
        gamePages = gameSlugs;

    } catch (e) {
        console.log("❌ GAGAL membaca fail data. Pastikan anda letak skrip ini di folder 'scripts'");
        process.exit(1);
    }

    // Combine URLs into an array
    const urlsToSubmit = [
        `${BASE_URL}/`,
        `${BASE_URL}/trusted`,
        `${BASE_URL}/share`,
        `${BASE_URL}/games`,
        `${BASE_URL}/blog`,
    ];

    blogArticles.forEach(slug => {
        urlsToSubmit.push(`${BASE_URL}/blog/${slug}`);
    });

    gamePages.forEach(slug => {
         urlsToSubmit.push(`${BASE_URL}/games/${slug}`);
    });

    return urlsToSubmit;
}

// ------ MAIN -------
async function main() {
   console.log('\n--- SISTEM GOOGLE INDEXING (TIPSMEGA) ---\n');
   
   // Dapatkan senarai terbaru dari data
   const allUrls = getAllUrls();
   
   // Index semua URLs
   await requestIndexing(allUrls);
   
   console.log('\n✅ PROSES SELESAI!');
}

main().catch(console.error);
