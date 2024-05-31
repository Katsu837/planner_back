const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firstName: {type: DataTypes.STRING, allowNull: false},
    secondName: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    activationLink: {type: DataTypes.STRING, allowNull: false},
    isActivated: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    photo: {type: DataTypes.STRING, defaultValue: "default.png"}
})

const Token = sequelize.define('token', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    refreshToken: {type: DataTypes.STRING(500), unique: true, allowNull: false}
})

const Schedule = sequelize.define('schedule',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, notNull: true, defaultValue: "My schedule"},
    participants: {type: DataTypes.ARRAY(DataTypes.INTEGER), notNull: true}
})

const Event = sequelize.define('event',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    type: {type: DataTypes.STRING, allowNull: false},
    repeat: {type: DataTypes.STRING},
    address: {type: DataTypes.STRING}
})

const EventDate = sequelize.define('eventDate', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    start_date: {type: DataTypes.DATE, allowNull: false},
    end_date: {type: DataTypes.DATE, allowNull: false},
})


User.hasOne(Token, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
})
Token.belongsTo(User)

User.hasMany(Schedule, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
})
Schedule.belongsTo(User)

Schedule.hasMany(Event, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
})
Event.belongsTo(Schedule)

Event.hasOne(EventDate, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
})
EventDate.belongsTo(Event)


module.exports = {
    User,
    Token,
    Schedule,
    Event,
    EventDate
}