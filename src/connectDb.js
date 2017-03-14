const { dbLink } = require('./config');
const db = require('mongoose').connect(dbLink);

db.connection.on("error", function (error) {  
    console.log("数据库连接失败：" + error); 
}); 

db.connection.on("open", function () {  
    console.log("数据库连接成功"); 
});