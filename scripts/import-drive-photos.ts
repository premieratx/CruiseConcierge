import { importPhotosFromDrive, listFilesInFolder } from '../server/googleDriveImport';

const FOLDER_ID = '1zECkoIqJDXV86Psq36k2KzO6r10wolK4';

async function main() {
  console.log('Listing files in Google Drive folder...');
  
  try {
    const files = await listFilesInFolder(FOLDER_ID);
    console.log(`Found ${files.length} image files:`);
    files.forEach((f, i) => console.log(`  ${i + 1}. ${f.name}`));
    
    if (files.length === 0) {
      console.log('No files to import.');
      return;
    }
    
    console.log('\nImporting photos...');
    const result = await importPhotosFromDrive(FOLDER_ID);
    
    console.log(`\nImport complete!`);
    console.log(`  Imported: ${result.imported.length} files`);
    console.log(`  Errors: ${result.errors.length}`);
    
    if (result.imported.length > 0) {
      console.log('\nImported files:');
      result.imported.forEach(f => console.log(`  - ${f}`));
    }
    
    if (result.errors.length > 0) {
      console.log('\nErrors:');
      result.errors.forEach(e => console.log(`  - ${e}`));
    }
  } catch (error: any) {
    console.error('Import failed:', error.message);
    process.exit(1);
  }
}

main();
