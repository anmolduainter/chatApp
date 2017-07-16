/**
 * Created by anmol on 15/7/17.
 */

const Sequelize=require('sequelize');


const sequelize=new Sequelize(

    {
        host:'localhost',
        username:'someuser',
        database:'somedatabase',
        password:'somepass',
        dialect:'mysql',
        define:{
            underscored:true
        }

    }
);



// const Message=db.define('chats1',{
//
//     id:{
//         type:Sequelize.DataTypes.INTEGER,
//         primaryKey:true,
//         autoIncrement:true,
//     },
//     username:Sequelize.DataTypes.STRING,
//     email:Sequelize.DataTypes.STRING,
//     received:Sequelize.DataTypes.STRING,
//     send:Sequelize.DataTypes.STRING
// });

let db={};

db.Sequelize=Sequelize;
db.sequelize=sequelize;

db.login=require('./models/login.js')(sequelize,Sequelize);
db.messgaes=require('./models/messages.js')(sequelize,Sequelize);



sequelize.sync().then(function () {
    console.log("DataBase is ready");
})


module.exports={
    Message
}





