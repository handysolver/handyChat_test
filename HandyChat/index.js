var express=require("express");
var bodyParser=require('body-parser');
var app = express();
var http = require('http').Server(app);
 
var authenticateController=require('./controllers/authenticate-controller');
var registerController=require('./controllers/register-controller');
var SocketIoManager = require('/Users/hsm3/Node Projects/HandyChat/controllers/SocketIoManager');
 
var allfunctions = require('./controllers/functions');
// var uploader = require('./controllers/image-uploader');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
/* route to handle login and registration */
app.post('/api/register',registerController.register);  
app.post('/api/login',authenticateController.login);
app.get('/api/get_users',allfunctions.getAllUsers);
app.post('/api/get_teams',allfunctions.getTeams);
app.post('/api/create_group',allfunctions.createGroup);
app.post('/api/get_team_users',allfunctions.getTeamUsers);
app.post('/api/add_members',allfunctions.addMembersToTeam);

 
app.listen(8012)  
SocketIoManager.showWelcome()
  


 app.get('/', function(req, res){
    res.send('<h1>Welcome - SocketChat Server</h1>');
  });
  
  

// Upload Image 
  
var multer  = require('multer')
var cors  = require('cors') 
var fs  = require('fs')
var path  = require('path')
var Loki  = require('lokijs')
var del  = require('del')


// setup
const DB_NAME = 'db.json';
const COLLECTION_NAME = 'images';
const UPLOAD_PATH = 'uploads';
const upload = multer({ dest: `${UPLOAD_PATH}/`});
const db = new Loki(`${UPLOAD_PATH}/${DB_NAME}`, { persistenceMethod: 'fs' });
 
 
app.use(cors());

 app.post('/upload_image', upload.single('avatar'), async (req, res) => {
  try {
      const col = await loadCollection(COLLECTION_NAME, db);
      const data = col.insert(req.file);

      db.saveDatabase();
      res.send({ id: data.$loki, fileName: data.filename, originalName: data.originalname });
  } catch (err) {
      console.log(err)
      res.sendStatus(400);
  } 
})

 
const imageFilter = function (req, file, cb) {
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const loadCollection = function (colName, db) {
    return new Promise(resolve => {
        db.loadDatabase({}, () => {
            const _collection = db.getCollection(colName) || db.addCollection(colName);
            resolve(_collection);
        })
    });
}

const cleanFolder = function (folderPath) {
    // delete files inside folder but not the folder itself
    del.sync([`${folderPath}/**`, `!${folderPath}`]);
};

 



// get Image by Id
app.get('/get_images/:id', async (req, res) => {
    try {
        const col = await loadCollection(COLLECTION_NAME, db);
        const result = col.get(req.params.id);

        if (!result) {
            res.sendStatus(404);
            return;
        };

        res.setHeader('Content-Type', result.mimetype);
        fs.createReadStream(path.join(UPLOAD_PATH, result.filename)).pipe(res);
    } catch (err) {
        res.sendStatus(400);
    }
})


