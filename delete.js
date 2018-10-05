'use strict';

var fs = require('fs');
var settings = require('./valueSettings');
var path = './';
var del = require('del');

// Retrieve
var MongoClient = require('mongodb').MongoClient;
var recordsWithApiKey = [];
var assert = require('assert');

//Connect to the db
MongoClient.connect(settings.URI, function(err, client) {
  if(err) {
    console.dir(err);
  }
  var dbName = client.db(settings.dbName);
  get_all_file_uploaded(client,dbName);
});

function get_all_file_uploaded (client,dbName) { 
  var uploadFileCollection = dbName.collection(settings.uploadFileCollectionName);
  var result = uploadFileCollection.find({}); // query all file uploaded
  result.toArray((err,docs)=> {
    docs.forEach(aRecord => {
      if (JSON.stringify(aRecord.related) == '[]') {
        aRecord.related = [{kind : 'noRelated'}];
        let nameFileInPublic = aRecord.hash + aRecord.ext;
        let nameFolderInResize = aRecord.name.replace(/.jpg|.png|.mtl|.obj/g,'')
        deleteTool.deleteOnDisk(nameFileInPublic,nameFolderInResize);
      }
      try {
        // handle data to store in recordsWithApiKey
        let kind = aRecord.related[0]['kind'];
        let propertyOfRecord = recordsWithApiKey[kind];
        if (typeof propertyOfRecord === 'undefined') {
          recordsWithApiKey[kind] = [aRecord];
        } else {
          recordsWithApiKey[kind].push(aRecord)
        }
      } catch (error) {
        throw new Error('Has a error occour at converting data',error)
      }
    });
    client.close();
    //console.log(recordsWithApiKey);
    /**
     * delete file in recordsWithApiKey
     */
    mainAction(recordsWithApiKey,uploadFileCollection);
  });
}

function deleteOnMongo(_ids) {
  return MongoClient.connect(settings.URI,(err, client) => {
    let db = client.db(settings.dbName);
    assert.notEqual(typeof db, 'undefiend')
    let collection = db.collection(settings.uploadFileCollectionName) 
    //console.log(collection);    
    assert.notEqual(typeof collection, 'undefined');

    _ids.map(_id => collection.deleteOne({
      'id': _id 
    }))

    client.close();
  })
}

function mainAction(listRecords,collection) {
  let keys = Object.keys(listRecords);
  for (let i in keys) {
    let propertyName = keys[i];
    switch (propertyName) {
      case 'noRelated':
        let noRelated = listRecords[propertyName];
        noRelated = noRelated.map(record => record.id);
        //console.log(noRelated);
        deleteOnMongo(noRelated);
        break;
      default:
    }
  }
}

function filterIdToDelete(_idsUsing, _allId) {
  return _allId.filter(_id => _idsUsing.indexOf(_id) < 0)
}

var deleteTool = {
  deleteOnDisk : function (fileName,folderName) {
      // delete at public/upload
      this.deleteInPublic(fileName);
      // delete at public/upload/resize
      this.deleteInResize(folderName);
    },

    //file name is hash+ext of file
  deleteInPublic: function (fileName) {
      fs.readdir(settings.pathToPublic,function(err, items) {
        if (err) throw new Error('can not read dir')
        if (items.indexOf(fileName) >= 0) {
          let pathToDelete = `${settings.pathToPublic}/${fileName}`
          fs.unlinkSync(pathToDelete)
        }
      })
    },

    //folderName is name of file
    deleteInResize: function (folderName) {
      fs.readdir(settings.pathToResize,function(err, items) {
        if (err) throw new Error('can not read dir')
        if (items.indexOf(folderName) >= 0) {
          let pathToDelete = `${settings.pathToResize}/${folderName}`
          del.sync(pathToDelete,{force:true})
        }
      })
    }
}