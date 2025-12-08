import { max } from "pg/lib/defaults";
import database from "/infra/database.js";
import migrationRunner from "node-pg-migrate";
import { join } from "path";

export default async function migrations(req, res) {
  console.log(req.method);

  const defaultMigrationOptions = {
    databaseUrl: process.env.DATABASE_URL,
    dryRun: true,
    dir: join(process.cwd(), "infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  if (req.method === "GET") {
    const pendingMigrations = await migrationRunner(defaultMigrationOptions);
    return res.status(200).json(pendingMigrations);
  } else if (req.method === "POST") {
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dryRun: false,
    });
    if (migratedMigrations.length > 0) {
      return res.status(201).json(migratedMigrations);
    }
    return res.status(200).json(migratedMigrations);
  }

  return res.status(405).json({ error: "Method not allowed" }).end();
}
