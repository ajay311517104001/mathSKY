const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const authAdmin = require("./routes/admin/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const adminProduct = require("./routes/admin/Product");
const adminQaset = require("./routes/admin/Qaset");
const mcqList =require("./routes/McqList")
const cors = require("cors");
const { spawn } = require('child_process');
const path = require('path');
const cron = require('node-cron');
const fs = require('fs')
const { google } = require('googleapis')

// const {s3} =require('./googleKey')
const GOOGLE_API_FOLDER_ID = '1iUssIxJnh54BYL99t7iW5sQhvPI84QKz'
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());

// ------------------------- DB BACKUP --------------------------
/* 
Basic mongo dump and restore commands, they contain more options you can have a look at man page for both of them.
1. mongodump --db=mathsky --archive=./mathsky.gzip --gzip
2. mongorestore --db=rbac_tutorial --archive=./rbac.gzip --gzip
Using mongodump - without any args:
  will dump each and every db into a folder called "dump" in the directory from where it was executed.
Using mongorestore - without any args:
  will try to restore every database from "dump" folder in current directory, if "dump" folder does not exist then it will simply fail.
*/

const DB_NAME = 'mathsky';
const ARCHIVE_PATH =  `./mathsky.gzip`

 cron.schedule('*/5 * * * * *', () => backupMongoDB());
//mongodump  --uri mongodb+srv://mathsky:hitmeup123@cluster0.0iwn3ig.mongodb.net/mathsky  --archive=./mathsky.gzip --gzip
//mongorestore  --uri mongodb+srv://centum:centum123@cluster0.tu0krbu.mongodb.net/  --nsInclude="*" --archive=./mathsky.gzip --gzip




async function uploadFile(){
  try{
      const auth = new google.auth.GoogleAuth({
          keyFile: './googleKey.json',
          scopes: ['https://www.googleapis.com/auth/drive']
      })

      const driveService = google.drive({
          version: 'v3',
          auth
      })

      const todaysdate =()=>{
        var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;
return 'mathsky'+today+'.gzip'
      }
      const fileMetaData = {
          'name': todaysdate(),
          'parents': [GOOGLE_API_FOLDER_ID]
      }

      const media = {
          mimeType: '	application/gzip',
          body: fs.createReadStream('./mathsky.gzip')
      }

      const response = await driveService.files.create({
          resource: fileMetaData,
          media: media,
          field: 'id'
      })
      return response.data.id

  }catch(err){
      console.log('Upload file error', err)
  }
}

function backupMongoDB() {
  const child = spawn('mongodump', [
    `--uri=mongodb+srv://mathsky:hitmeup123@cluster0.0iwn3ig.mongodb.net`,
    `--archive=${ARCHIVE_PATH}`,
    '--gzip',
  ]);

  child.stdout.on('data', (data) => {
    console.log('stdout:\n', data);
  });
  child.stderr.on('data', (data) => {
    console.log('stderr:\n', Buffer.from(data).toString());
  });
  child.on('error', (error) => {
    console.log('error:\n', error);
  });
  child.on('exit', (code, signal) => {
    if (code) console.log('Process exit with code:', code);
    else if (signal) console.log('Process killed with signal:', signal);
    else{
      console.log('Backup is successfull ✅');
      uploadFile()
      .then((data)=> console.log("the response is ",data))
    } 
  });
}





// ------------------ API Routes -------------------

app.get('/', (req, res) => res.send('server is up & Running!'))
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/mcqList", mcqList);

// ------------  Admin Api Routes -------------------
app.use("/api/admin", authAdmin);
app.use("/api/admin", adminProduct);
app.use("/api/admin", adminQaset);



app.listen(process.env.PORT || 8001, () => {
  console.log("Backend server is running!");
});
