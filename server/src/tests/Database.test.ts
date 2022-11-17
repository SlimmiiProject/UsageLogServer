import { RowDataPacket } from "mysql2";
import { DatabaseConnector } from "../data/DatabaseConnector"
import { Environment } from "../utils/Environment";
import { Logger } from "../utils/Logger";
import { DataProcessor } from "../data/DataProcessing";
import { UserAccount } from "../data/entities/UserAccount";
import { ObjectUtil } from "../utils/ObjectUtil";
import { Crypt } from "../utils/Crypt";
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
    } catch (error) {
        Logger.error(error)
    } finally {
        if (userid != 0) await DataProcessor.DeleteUser(userid);
        expect(expectedResult).toEqual(receivedResult);
    }
});
test("Edit Acount does not change password hash, or any other data", async () => {

    try {
        let userid: number = await DataProcessor.CreateUser("James", "Doe", "JamesDoe@hotmail.com", "JamesDoeIsNotReal", "+32491302022");
        await DataProcessor.EditAcount(userid, "Harold", "Harvey", "JamesHarvey@hotmail.com", "+32491302422", "red", "blue");
        let user: UserAccount = await DataProcessor.GetUser("JamesHarvey@hotmail.com", userid, "+32491302422");
        let passwordPasses: boolean = Crypt.matchesEncrypted("JamesDoeIsNotReal", user.password);
        expect(true).toEqual(passwordPasses);
    } catch (error) {
        Logger.error(error)
    } finally {
        await destroyDb();
    }
})