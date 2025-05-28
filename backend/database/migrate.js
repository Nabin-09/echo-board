require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');


async function runMigration() {
 const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true 
});


  const schemaPath = path.join(__dirname, 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');

  await connection.query(schema);
  console.log('✅ Database migration complete.');
  await connection.end();
}

runMigration().catch((err) => {
  console.error('❌ Migration failed:', err.message);
});

runMigration();
