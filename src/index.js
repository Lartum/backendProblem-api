const express = require('express')
const app = express()
const fs = require('fs')
const uuid = require('uuid')
const multer = require('multer')
const { parse } = require('fast-csv')

const upload = multer({
    dest: 'uploads/',
    fileFilter(req, file, cb) {
        if (!file.originalname.match('.csv')) {
            return cb(new Error('Upload a csv file'))
        }
        cb(undefined, true)
    }
})

const port = process.env.PORT

let streams = {}

app.post('/upload', upload.single('file'), (req, res, next) => {
  const streamID = uuid.v4();
  streams[streamID] = fs.createReadStream(req.file.path).pipe(parse()) //pseudo-code
  streams[streamID].on('data', (row) =>{
    console.log(row)
  })
  streams[streamID].on('end', () =>{
    console.log('streaming of data has finished')
  })
  res.status(201).send(streamID)
  })

app.post('/upload/:id', (req, res, next) => {
  const { id } = req.params; // this is the uuid we made before
  const { action } = req.query;
  if (action === 'pause') {
    streams[id].pause();
    streams[id].isPaused() ? console.log('Paused the stream') : console.log('not paused')
  }
  if (action === 'stop') {
    streams[id].stop();
    delete streams[id];
  }
  if (action === 'resume') {
    streams[id].resume();
  }
})


app.listen(port , () =>{
    console.log('server started on ' + port)
})