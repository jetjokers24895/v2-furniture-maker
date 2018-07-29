'use strict';

var assert = require('assert');
const root_project = process.cwd();
const fs = require('fs');
const path = require('path');
const Jimp = require('jimp2');

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
    var model = new Array;
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
    
    Jimp.read(file.buffer).then((image) => {
      for (var i = 1; i < 5; i=i*2) {
        var forder_name = name.replace(/.jpg|.png|jpeg|bmp/,'');
        var output_name = forder_name + '_' +(1024/i).toString() + 'x' + (1024/i).toString() + file.ext;
                  // ttao thu muc chứa file
        mkdirSync(path.join(outputPath,forder_name));
                  // set link ảnh
        var link = path.join(outputPath,forder_name,output_name);
        console.log(link);
                  // gán vào list model để insert
        model['img'+ (1024/i).toString()] = link;
        image.resize(1024/i, 1024/i)            // resize
                    .write(link,cb => console.log(cb));} // save
    }).catch((err)=>{
      console.error(err);
    });
            
    
        // return new Promise (resolve => {
        //     resolve(model)
        // });
  }
};