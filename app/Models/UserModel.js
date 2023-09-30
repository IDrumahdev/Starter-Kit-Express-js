import { Sequelize } from 'sequelize';
import connetedDB from '../Config/database.js';

const { DataTypes } = Sequelize;

const user = connetedDB.define('users',{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    },
    refresh_token:{
        type:DataTypes.TEXT
    },
    email_verified_at: {
        type:DataTypes.DATE
    }
},{
    freezeTableName:true
});

export default user;