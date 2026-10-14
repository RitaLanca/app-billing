// Writes db.json for json-server with data relative to today.
// Run with Node >= 22.18 (native TypeScript type stripping): `npm run generate-db`
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { generateDemoData } from '../src/demo/generateDemoData.ts';

const dbPath = fileURLToPath(new URL('../db.json', import.meta.url));

const db = {
  $schema: './node_modules/json-server/schema.json',
  ...generateDemoData(new Date()),
};

writeFileSync(dbPath, JSON.stringify(db, null, 2) + '\n');
console.log(`db.json generated for ${new Date().toDateString()}`);
