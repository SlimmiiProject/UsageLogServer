import { RowDataPacket } from "mysql2";
import { DatabaseConnector } from "../data/DatabaseConnector"
import { Environment } from "../utils/Environment";
import { Logger } from "../utils/Logger";
import { DataProcessor } from "../data/DataProcessing";
const dbInstance: DatabaseConnector = DatabaseConnector.createConnector(Environment.CONFIG.database)!;
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
    }
});
test("Database creates a new user", async () => {
    let userid: number = 0;
    let expectedResult: number = 0
    let receivedResult: number = 0;
    try {
        await setupDb();
        await dbInstance.dataSource.synchronize(false);
        let data: RowDataPacket[] = await dbInstance.dataSource.query("SELECT * FROM user_account;");
        let users: number = data.length;
        console.log(users)
        expectedResult = users + 1;
        userid = await DataProcessor.CreateUser("James", "Doe", "JamesDoe@hotmail.com", "JamesDoeIsNotReal", "+32491302022");
        data = await dbInstance.dataSource.query("SELECT * FROM user_account;");
        receivedResult = data.length
    } catch (error) {
        Logger.error(error)
    } finally {
        if (userid != 0) await DataProcessor.DeleteUser(userid);
        expect(expectedResult).toEqual(receivedResult);
        await destroyDb();
    }
})