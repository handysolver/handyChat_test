 
 
// //   var connection = require('./../config');
// //   var express = require('express')
// //   var multer  = require('multer')
// //   var cors  = require('cors')
// //   var fs  = require('fs')
// //   var path  = require('path')
// //   var Loki  = require('lokijs')

 

// //   // setup
// // const DB_NAME = 'handydash';
// // const COLLECTION_NAME = 'images';
// // const UPLOAD_PATH = 'uploads';
// // const upload = multer({ dest: `${UPLOAD_PATH}/`});
// // const db = new Loki(`${UPLOAD_PATH}/${DB_NAME}`, { persistenceMethod: 'fs' });





// // // app
// // const app = express();
// // app.use(cors());

// // module.exports.app.post('/profile', upload.single('avatar'), async (req, res) => {
// //     try {
// //         const col = await loadCollection(COLLECTION_NAME, db);
// //         const data = col.insert(req.file);

// //         db.saveDatabase();
// //         res.send({ id: data.$loki, fileName: data.filename, originalName: data.originalname });
// //     } catch (err) {
// //         res.sendStatus(400);
// //     }
// // })


  



  
       
//     //  // File input field name is simply 'file'
//     //  upload.single('file') 
//     //  var file = __dirname + '/' + req.file.filename;
 
//     //  console.log(req.file.filename)
 
//     //  console.log(file)
//     //  fs.rename(req.file.path, file, function(err) {
//     //    if (err) {
//     //      console.log(err);
//     //      res.send(500);
//     //    } else {
//     //      res.json({
//     //        message: 'File uploaded successfully',
//     //        filename: req.file.filename
//     //      });
//     //    }
//     //  });



// // var uploads = {};

// //  // set your env variable CLOUDINARY_URL or set the following configuration
// //  cloudinary.config({ 
// //   cloud_name: 'sample', 
// //   api_key: '874837483274837', 
// //   api_secret: 'a676b67565c6767a6767d6767f676fe1' 
// // });
// // console.log( "** ** ** ** ** ** ** ** ** Uploads ** ** ** ** ** ** ** ** ** **");

  
  
// // module.exports. cloudinary.uploader.upload(req.files.myImage.path,function(result) { 
// //     console.log(result);

// //     console.log("* "+image.public_id);
// //     console.log("* "+image.url);
// // },
// //   {
// //     public_id: 'sample_id', 
// //     crop: 'limit',
// //     width: 2000,
// //     height: 2000,
// //     eager: [
// //       { width: 200, height: 200, crop: 'thumb', gravity: 'face',
// //         radius: 20, effect: 'sepia' },
// //       { width: 100, height: 150, crop: 'fit', format: 'png' }
// //     ],                                     
// //     tags: ['special', 'for_homepage']
// //   }      
// // )

 


// // Upload Image 
  
// var multer  = require('multer')
// var cors  = require('cors')
// var fs  = require('fs')
// var path  = require('path')
// var Loki  = require('lokijs')
// var del  = require('del')
// var express=require("express");
// var app = express();

// // setup
// const DB_NAME = 'db.json';
// const COLLECTION_NAME = 'images';
// const UPLOAD_PATH = 'uploads';
// const upload = multer({ dest: `${UPLOAD_PATH}/`});
// const db = new Loki(`${UPLOAD_PATH}/${DB_NAME}`, { persistenceMethod: 'fs' });
 
 
// app.use(cors());


// module.exports.uploadPic  =  function(req, res){ 
    
//     upload.single('avatar'), async (req, res) => {
//   try {
//       const col = await loadCollection(COLLECTION_NAME, db);
//       const data = col.insert(req.file);

//       db.saveDatabase();
//       res.send({ id: data.$loki, fileName: data.filename, originalName: data.originalname });
//   } catch (err) {
//       console.log(err)
//       res.sendStatus(400);
//   } 
// }
// }

 
// const imageFilter = function (req, file, cb) {
//     // accept image only
//     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//         return cb(new Error('Only image files are allowed!'), false);
//     }
//     cb(null, true);
// };

// const loadCollection = function (colName, db) {
//     return new Promise(resolve => {
//         db.loadDatabase({}, () => {
//             const _collection = db.getCollection(colName) || db.addCollection(colName);
//             resolve(_collection);
//         })
//     });
// }

// const cleanFolder = function (folderPath) {
//     // delete files inside folder but not the folder itself
//     del.sync([`${folderPath}/**`, `!${folderPath}`]);
// };


