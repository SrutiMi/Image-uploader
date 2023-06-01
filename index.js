const express = require('express')
const path = require('path');
const multer = require('multer');

const app = express();

app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'));
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

app.post('/uploads', upload.single('image'), function (req, res) {
   
   res.send('File uploaded successfully');
});





app.listen(3000,()=>{
    console.log('Server is listening on port 3000...');
})
