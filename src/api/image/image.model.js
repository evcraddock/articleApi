import fs from 'fs'
import Gridfs from 'gridfs-stream'
import mongoose from 'mongoose'

export const upload = (req) => {
  return new Promise((resolve, reject) => { 

    if (!req.busboy) {
      throw new Error("No file was supplied");
      return;
    } 

    var articleId = req.params.articleId;

    req.pipe(req.busboy);

    req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {

          var id = mongoose.Types.ObjectId();
          var gfs = new Gridfs(mongoose.connection.db, mongoose.mongo);
          var writeStream = gfs.createWriteStream({
            _id: id,
            filename: filename,
            mode: 'w',
            content_type: mimetype,
            root: articleId
          });

          file.pipe(writeStream);

          writeStream.on("error", function(err) {
            reject(err);
            return;
          });
          
          resolve(
              { 
                  _id: id,
                  articleId: articleId,
                  filename: filename,
                  contentType: mimetype
              }
          );     
    }); 
  });
}

export const view = (articleId, filename) => {
  return new Promise((resolve, reject) => { 
    var gfs = new Gridfs(mongoose.connection.db, mongoose.mongo);

    gfs.collection(articleId).find({
      filename: filename
    }).toArray(function(err, files){
        
      if (err) {
        reject(err);
        return;
      }

      if (files.length == 0) {
        resolve()
        return;
      }
      
      let file = files[0];

      let readStream = gfs.createReadStream({
        id: file._id,  
        filename: file.filename
      });
      
      resolve(
        { 
            _id: file._id,
            filename: file.filename,
            articleId: articleId,
            contentType: file.contentType,
            imagestream: readStream
        }
      );
    });
  });
}

export const remove = (id) => {
  return new Promise((resolve, reject) => { 
    var gfs = new Gridfs(mongoose.connection.db, mongoose.mongo);
    gfs.remove({ _id: id });

    resolve(
      {
        _id: id
      }
    );
  });
}