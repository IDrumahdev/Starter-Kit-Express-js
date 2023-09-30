import connetedDB from '../Config/database.js';
import users from '../Models/UserModel.js';

export async function setupDatabase(migration) {
    if(migration === "true") {
        try {
            await connetedDB.authenticate();
            console.info(`Database Conneted...`);
            await users.sync();
        } catch (error) {
            console.error(error);
        }
    }
}