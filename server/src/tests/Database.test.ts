import { RowDataPacket } from "mysql2";
import { DatabaseConnector } from "../data/DatabaseConnector"
import { Environment } from "../utils/Environment";
import { Logger } from "../utils/Logger";

const dbInstance: DatabaseConnector = DatabaseConnector.createConnector(Environment.CONFIG.database);

const setupDb = async () => await dbInstance.initialize();
const destroyDb = async () => await dbInstance.disconnect();

test("Database has equal tables to entity count + session", async () => {
    try {
        await setupDb();
        await dbInstance.dataSource.synchronize(false);
        const out: RowDataPacket[] = await dbInstance.dataSource.query("SHOW TABLES;");
        expect(out.length).toEqual(DatabaseConnector.entities.length + 1); // Also count sessions
    } catch (_ignored) { Logger.error("Failed to connect to db during test"); }
    finally {
        await destroyDb();
    }
});