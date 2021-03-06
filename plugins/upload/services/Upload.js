'use strict';

/**
 * Upload.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

const fs = require('fs');
const _ = require('lodash');
const toArray = require('stream-to-array');
const uuid = require('uuid/v4');
// const add_model = require('./add_link_to_model');

(function() {
  var childProcess = require('child_process');
  var oldSpawn = childProcess.spawn;
  function mySpawn() {
    console.log('spawn called');
    console.log(arguments);
    var result = oldSpawn.apply(this, arguments);
    return result;
  }
  childProcess.spawn = mySpawn;
})();

module.exports = {
  bufferize: async files => {
    if (_.isEmpty(files) === 0) {
      throw 'Missing files.';
    }

    // files is always an array to map on
    files = _.isArray(files) ? files : [files];

    // transform all files in buffer
    return Promise.all(
      files.map(async stream => {
        const parts = await toArray(fs.createReadStream(stream.path));
        const buffers = parts.map(
          part => _.isBuffer(part) ? part : Buffer.from(part)
        );

        return {
          name: stream.name,
          hash: uuid().replace(/-/g, ''),
          ext: stream.name.split('.').length > 1 ? `.${_.last(stream.name.split('.'))}` : '',
          buffer: Buffer.concat(buffers),
          mime: stream.type,
          size: (stream.size / 1000).toFixed(2)
        };
      })
    );
  },

  upload: async (files, config) => {
    // Get upload provider settings to configure the provider to use.
    const provider = _.find(strapi.plugins.upload.config.providers, { provider: config.provider });

    if (!provider) {
      throw new Error(`The provider package isn't installed. Please run \`npm install strapi-upload-${config.provider}\``);
    }
    const actions = provider.init(config);  
    // Execute upload function of the provider for all files.
    return Promise.all(
      files.map(async file => {
        await actions.upload(file);
        /**
         * block code resize
         */
        var list_exten_image = ['.jpg','.png','.jpeg','.bmp'];
        // if file exten is image -> resize
        if ( list_exten_image.indexOf(file.ext) >= 0){
          var _model = await strapi.plugins['upload'].services.resize.resizeImg(file);
          _model = await strapi.plugins['upload'].services.resize.check_imgage_size_exists(_model);
          file['img256x256'] = _model['img256'];
          file['img512x512'] = _model['img512'];
          file['img1024x1024'] = _model['img1024'];
        }
        // console.log(pair_value);
        // var model_name = file.related[0].ref;
        // console.log(model_name)
        // strapi.services[model_name].edit()
        // await strapi.services[model_name].edit(strapi.models[model_name],pair_value);
        // for (var i in pair_value) {
        //   await strapi.services[model_name].edit(strapi.models[model_name],pair_value[i]);
        //   // console.log(strapi.models[model_name][i]);
        //   // console.log(pair_value[i]);
        // }
        // console.log(model);
        // console.log(file.related[0].ref);
        // Remove buffer to don't save it.
        // console.log(file);
        // console.log(file.buffer);
        /**
         * endblock code resize
         */
        delete file.buffer;
        

        file.provider = provider.provider;
        return await strapi.plugins['upload'].services.upload.add(file);
      })
    );
  },

  add: async (values) => {
    // Use Content Manager business logic to handle relation.
    if (strapi.plugins['content-manager']) {
      return await strapi.plugins['content-manager'].services['contentmanager'].add({
        model: 'file'
      }, values, 'upload');
    }

    return strapi.query('file', 'upload').create(values);
  },

  edit: async (params, values) => {
    // Use Content Manager business logic to handle relation.
    if (strapi.plugins['content-manager']) {
      params.model = 'file';
      params.id = (params._id || params.id);
      //jet-console
      console.log(params);
      console.log(values);
      return await strapi.plugins['content-manager'].services['contentmanager'].edit(params, values, 'upload');
    }

    return strapi.query('file', 'upload').update(_.assign(params, values));
  },

  fetch: (params) => {
    return strapi.query('file', 'upload').findOne(_.pick(params, ['_id', 'id']));
  },

  fetchAll: (params) => {
    return strapi.query('file', 'upload').find(strapi.utils.models.convertParams('file', params));
  },

  count: async () => {
    return await strapi.query('file', 'upload').count();
  },

  remove: async (params, config) => {
    const file = await strapi.plugins['upload'].services.upload.fetch(params);

    // get upload provider settings to configure the provider to use
    const provider = _.cloneDeep(_.find(strapi.plugins.upload.config.providers, {provider: config.provider}));
    _.assign(provider, config);
    const actions = provider.init(config);

    // execute delete function of the provider
    if (file.provider === provider.provider) {
      await actions.delete(file);
    }

    // Use Content Manager business logic to handle relation.
    if (strapi.plugins['content-manager']) {
      params.model = 'file';
      params.id = (params._id || params.id);

      await strapi.plugins['content-manager'].services['contentmanager'].delete(params, {source: 'upload'});
    }

    return strapi.query('file', 'upload').delete(params);
  },

  uploadToEntity: async function (params, files, source) {
    // Retrieve provider settings from ddatabase.
    const config = await strapi.store({
      environment: strapi.config.environment,
      type: 'plugin',
      name: 'upload'
    }).get({ key: 'provider' });

    const model = source && source !== 'content-manager' ?
      strapi.plugins[source].models[params.model]:
      strapi.models[params.model];

    // Asynchronous upload.
    await Promise.all(
      Object.keys(files)
        .map(async attribute => {
          // Bufferize files per attribute.
          const buffers = await this.bufferize(files[attribute]);
          const enhancedFiles = buffers.map(file => {
            const details = model.attributes[attribute];

            // Add related information to be able to make
            // the relationships later.
            file[details.via] = [{
              refId: params.id,
              ref: params.model,
              source,
              field: attribute,
            }];

            return file;
          });

          // Make upload async.
          return this.upload(enhancedFiles, config);
        })
    );
  }
};
