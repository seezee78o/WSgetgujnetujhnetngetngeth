var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  //password: "sImj%gI#U24I$&/?<soloI24I$&#$9v,k",
  //database: "auto"
});

con.connect(async function (err) {
  if (err) throw err;


  con.query("CREATE DATABASE achat CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;");
  con.query("CREATE DATABASE auto CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;");


  //con.query(`DROP TABLE uc`);
  // catgory of pross

  sql = `CREATE table ct(
    ID BIGINT UNSIGNED PRIMARY KEY NOT NULL,
    NM VARCHAR( 75 ),
    TY TEXT
    );` ;
      //con.query(sql);
  



  //chat query
  sql = `CREATE TABLE IF NOT EXISTS 0_ ( 
ID BIGINT UNSIGNED PRIMARY KEY NOT NULL,
TY TINYINT NOT NULL,
DL TINYINT NOT NULL,
RP BIGINT NOT NULL,
CO INT NOT NULL,
SN TINYINT NOT NULL,
ME TEXT NOT NULL,
INDEX (CO))` ;
  //con.query(sql);

  // 1 billion user 
  // true for profile picture *
  // 75 char email *
  // 75 char pass *
  // 75 char name *
  // 75 char username *
  // 75 char bio *
  // text char status *
  // set session of char
  // 2048 chat pv *

  //con.query(`DROP TABLE us`);

  sql = `CREATE table us(
ID INT( 10 ) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
EM INT( 10 ),
UN VARCHAR( 32 ),
PS VARCHAR( 75 ),
NM VARCHAR( 55 ),
BI VARCHAR( 75 ),
PP INT( 10 ),
LS INT( 10 ),
CT INT NOT NULL,
SS TEXT,
CH TEXT,
BL TEXT,
INDEX (UN,EM)
);` ;
  //con.query(sql);

  //con.query(`DROP TABLE ip`);
  // anti diddos server
  sql = `CREATE table ip(
IP VARBINARY(16),
TY INT,
TI INT,
INDEX (IP)
);` ;
  con.query(sql);

  //con.query(`DROP TABLE uc`);
  // anti diddos server
  sql = `CREATE table uc(
ID INT( 10 ) PRIMARY KEY,
TY TINYINT,
TI INT
);` ;
  //con.query(sql);

  //con.query(`DROP TABLE mc`);
  // anti diddos server
  sql = `CREATE table mc(
ID INT( 10 ) PRIMARY KEY,
TY TINYINT,
TI INT
);` ;
  //con.query(sql);



  // ID INT 1 billion post
  // NM 256 char name *
  // PP profile 20 pic
  // SC isic of post
  // CT 160 char cat id 40 cat
  // CL 40 color post
  // ST store id 1 billion
  // PR prise int 19
  // OF offer prise persent %
  // SA status of post
  // WR waranty date
  // RA rating number
  // RP ration people of post
  // TI time of post
  // BI bio of post
  // OP option json
  //con.query(`DROP TABLE pt`);
  sql = `CREATE table pt(
ID INT( 10 ) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
NM VARCHAR( 256 ),
PP VARCHAR( 120 ),
SC SMALLINT ,
CT VARCHAR( 770 ),
CL VARCHAR( 160 ),
ST INT( 10 ) ,
PR BIGINT ,
OF BIGINT,
SA TINYINT,
WR SMALLINT,
RA decimal(12,10),
RP INT,
TI INT,
BI TEXT,
OP TEXT,
INDEX (SC,ST,PR)
);` ;
  //con.query(sql);
});




project
user 
cat

