const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const bodyparser = require('body-parser');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const path = require('path');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();
const sgMail = require('@sendgrid/mail');


const app = express();
app.use(bodyparser.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));


const uri = process.env.ATLAS_URI;
let promise = mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true }
);
const connection = mongoose.connection;

let gfs;
connection.once('open', () => {
    gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection('uploads');
})

const storage = new GridFsStorage({
  db: promise,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = 'Seymur Pashayev Resume' + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  // res.json({ file: req.file });
  res.redirect('/');
});

// @route GET /files/:filename
// @desc  Display single file object
app.get('/download', (req, res) => {
  gfs.files.findOne({ filename: 'Seymur Pashayev Resume.pdf' }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    else {
      // detect the content type and set the appropriate response headers.
      let mimeType = file.contentType;
      if (!mimeType) {
          mimeType = mime.lookup(file.filename);
      }
      res.set({
          'Content-Type': mimeType,
          'Content-Disposition': 'attachment; filename=' + file.filename
      });

      const readStream = gfs.createReadStream({
          _id: '5f96639edd3d5a1db02a93e1'
      });
      readStream.on('error', err => {
          // report stream error
          console.log(err);
      });
      // the response will be the file itself.
      readStream.pipe(res);
  }
  });
});

app.get('/', (req, res) => { res.send('Welcome to my api'); }) 
app.post('/api/v1', (req,res) => { 
var data = req.body; 
var smtpTransport = nodemailer.createTransport({ service: 'Gmail', port: 465, auth: { user: 'pashayevseymur42@gmail.com', pass: 'Pashayev1991@@' } }); 
var mailOptions = { from: data.email, to: 'pashayevseymur42@gmail.com', subject: 'PortfolioWebsite', html: `<p>${data.name}</p> <p>${data.email}</p> <p>${data.message}</p>` }; 
smtpTransport.sendMail(mailOptions, (error, response) => { 
  
if(error) { res.send(error) 
}

else { res.send('Success') 
} 
smtpTransport.close(); 

}); 

})


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});