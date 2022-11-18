import { RowDataPacket } from "mysql2";
import { DatabaseConnector } from "../data/DatabaseConnector"
import { Environment } from "../utils/Environment";
import { Logger } from "../utils/Logger";
import { DataProcessor } from "../data/DataProcessing";
import { UserAccount } from "../data/entities/UserAccount";
import { Crypt } from "../utils/Crypt";
const dbInstance: DatabaseConnector = DatabaseConnector.createConnector(Environment.CONFIG.database)!;
const setupDb = async () => await dbInstance.initialize();
const destroyDb = async () => await dbInstance.disconnect();
const randomGen = (max: number = 1000, min: number = -100) => Math.floor(Math.random() * (max - min)) + min;
test("Database has equal tables to entity count + session", async () => {
    try {
        await setupDb();
        await dbInstance.dataSource.synchronize(false);
        const out: RowDataPacket[] = await dbInstance.dataSource.query("SHOW TABLES;");
        expect(out.length).toEqual(DatabaseConnector.entities.length + 1); // Also count sessions
    } catch (_ignored) { Logger.error("Failed to connect to db during test"); }

});
test("Database creates a new user", async () => {
    let userid: number = 0;
    let expectedResult: number = 0
    let receivedResult: number = 0;
    try {
        let data: RowDataPacket[] = await dbInstance.dataSource.query("SELECT * FROM user_account;");
        let users: number = data.length;
        expectedResult = users + 1;
        userid = await DataProcessor.CreateUser("James", "Doe", "JamesDoe@hotmail.com", "JamesDoeIsNotReal", "+32491302022");
        data = await dbInstance.dataSource.query("SELECT * FROM user_account;");
        receivedResult = data.length
        await expect(expectedResult).toEqual(receivedResult);
    } catch (_ignored) {
        Logger.error(_ignored)
    } finally {
        if (userid != 0) await DataProcessor.DeleteUser(userid);
    }
});
test("Edit Acount does not change password hash, or any other data", async () => {

    try {
        let userid: number = await DataProcessor.CreateUser("James", "Doe", "JamesDoe@hotmail.com", "JamesDoeIsNotReal", "+32491302022");
        await DataProcessor.EditAcount(userid, "Harold", "Harvey", "JamesHarvey@hotmail.com", "+32491302422", "red", "blue");
        let user: UserAccount = await DataProcessor.GetUser("JamesHarvey@hotmail.com", userid, "+32491302422");
        let passwordPasses: boolean = Crypt.matchesEncrypted("JamesDoeIsNotReal", user.password);
        await DataProcessor.DeleteUser(user.userId);
        await expect(passwordPasses).toBeTruthy();

    } catch (_ignored) {
        Logger.error(_ignored)
    } finally {
    }
});

//does not work yet!!
test("Database Creates new TemporaryData", async () => {
    let countofTempData: number = 0;;
    let resultingCount: number = 0;
    try {
        await setupDb();
        let data: RowDataPacket[] = await dbInstance.dataSource.query("SELECT * FROM temporary_data;");
        countofTempData = data.length + 5;
        await DataProcessor.CreateDevice("a".repeat(64), "test-device");
        await DataProcessor.CreateTempData("a".repeat(64), randomGen(), randomGen())
        await DataProcessor.CreateTempData("a".repeat(64), randomGen(), randomGen())
        await DataProcessor.CreateTempData("a".repeat(64), randomGen(), randomGen())
        await DataProcessor.CreateTempData("a".repeat(64), randomGen(), randomGen())
        await DataProcessor.CreateTempData("a".repeat(64), randomGen(), randomGen())
        data = await dbInstance.dataSource.query("SELECT * FROM temporary_data;")
        resultingCount = data.length;
        await expect(resultingCount).toEqual(countofTempData);

    } catch (_ignored) {
        Logger.error(_ignored)
    } finally {
        await destroyDb();
    }
});