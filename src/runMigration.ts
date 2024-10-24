import dataSource from "./data.source";

async function runMigrations() {
  try {
    await dataSource.initialize();

    await dataSource.runMigrations();

    console.log('Migrations ran successfully!');

    await dataSource.destroy();
  } catch (error) {
    console.error('Error running migrations:', error);
    process.exit(1);
  }
}

runMigrations();