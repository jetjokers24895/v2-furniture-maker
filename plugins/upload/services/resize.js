'use strict';


const fs = require('fs');
const path = require('path');
const Jimp = require('jimp2');
var assert = require('assert');
const root_project = process.cwd();
// var db = require(root_project + '/config/environments/development/database.json');
// var db_name = db.connections.default.settings.database;
// var link_localhost = 'http://localhost:1337/uploads/resize/';
// var link_vps = 'http://v2-api.furnituremaker.vn/uploads/resize/';
// const link = db_name == 'strapi' ? link_localhost : link_vps;
var model = {};
Array.range = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start);

const mkdirSync = function (dirPath) {
  try {
    fs.mkdirSync(dirPath);} 
  catch (err) {
    if (err.code !== 'EEXIST') throw err;}
};

    // check directory
function statPath(path) {
  try {
    return fs.statSync(path);
  } catch (ex) {
    return false;
  }
}

module.exports = {
  resizeImg: async (file) => {
    var link_image_2000 = path.normalize(root_project+ '/public/' + file.url); //must is absolute link
        //console
    console.log(link_image_2000);
        // var reg = /(?:\/uploads\/).*/g;
        // var reg_action = link_image_2000.match(reg);
        // var name = reg_action.toString().replace(/\/|uploads/g,"");
    var name = file.name;
    assert.equal(name.search('/'), -1);
        // check resize directory exists
    var exist = statPath(root_project+'/public/uploads/resize');
    if (!(exist && exist.isDirectory())) {
      console.log('not exists');
      mkdirSync(root_project + '/public/uploads/resize');
    }
        //set output path
    const outputPath = root_project + '/public/uploads/resize/';
        //resize image
    resize_action(file.buffer,name,outputPath,model,file.ext);
    // return new Promise (resolve => {
    //   resolve(model);
    // });
    return model;
  },
  check_imgage_size_exists : async (_model) => {
    var _size = ['img256','img512','img1024'];
    for (var i in _size) {
      if (typeof _model[i] == 'undefined') {
        _model[i] = 'this Image size dont have';
      }
    }
    return _model;
  }
};

function resize_action(buffer,name,outputPath,model,ext) {
  Jimp.read(buffer).then((image) => {
    var _num_image = check_size(image.bitmap.width,image.bitmap.height);
    // console.log('#width:',image.bitmap.width);
    // console.log('#height:',image.bitmap.height);
    // console.log('#number image:',_num_image);
    if (_num_image == 1) {
      resize(name,outputPath,model,image,256,ext);
    }
    if (_num_image == 2) {
      resize(name,outputPath,model,image,256,ext);
      resize(name,outputPath,model,image,512,ext);
    }
    if (_num_image == 3) {
      resize(name,outputPath,model,image,256,ext);
      resize(name,outputPath,model,image,512,ext);
      resize(name,outputPath,model,image,1024,ext);
    }
    
    // save
  }).catch((err)=>{
    console.error(err);
  });
}

function check_size(width,height) {
  width = parseInt(width);
  height = parseInt(height);
  var _min = Math.min(width,height);
  if (_min > 256)
  {
    if (_min > 512) {
      if (_min > 1024) {
        return 3;
      }
      return 2;
    }
    return 1;
  }
  return 0;
}

function resize(name,outputPath,model,image,size,ext) {
  var forder_name = name.replace(/.jpg|.png|jpeg|bmp/,''); // name: **/Armchair
  var output_name = forder_name + '_' +(size).toString() + 'x' + (size).toString() + ext; // name: **/Armchair/Armchair_256x256
            // ttao thu muc chứa file
  mkdirSync(path.join(outputPath,forder_name));
            // set link ảnh
  var path_image = path.join(outputPath,forder_name,output_name);
  var _link = '/uploads/resize/' + forder_name.toString() + '/' + output_name.toString(); 
            // gán vào list model để insert
  model['img'+ (size).toString()] = _link;
  image.resize(size, size)            // resize
              .write(path_image,cb => console.log(cb));
  // console.log('created image:', size.toString() + 'x' + size.toString());
}