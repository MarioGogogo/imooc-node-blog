const  mysql = require('mysql');
const config = require('../conf/default');

const con = mysql.createPool({
	host: config.database.HOST,
	user: config.database.USERNAME,
	password: config.database.PASSWORD,
	database: config.database.DATABASE,
	port: config.database.PORT,
});

const exec = (sql) => {
	return new Promise((resolve, reject) => {
		con.getConnection((err, db) => {
			if (err) {
				reject(err);
			} else {
				db.query(sql, (err, rows) => {
					if (err) {
						reject(err);
					} else {
						console.log('数据',rows);
						resolve(rows);
					}
					// db.release();
				});
			}
		});
	});
};





module.exports ={exec}




// const sql = 'select * from users'

// con.getConnection(function(err, db){
//   if(err){
//       console.error('CONNECTION error: ', err);
//   }
//   else{
//       console.log("CONNECTION SUCCESSFUL!");
//       db.query(sql, function(err, data){
//           if(err){
//               console.log("Query data ERROR!");
//           }
//           console.log(data,data.length);
//       });
//       db.release();
//   }
// });
