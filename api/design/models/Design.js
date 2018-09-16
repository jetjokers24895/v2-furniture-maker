'use strict';


/**
 * Lifecycle callbacks for the `Design` model.
 */

module.exports = {
  // Before saving a value.
  // Fired before an `insert` or `update` query.
  // beforeSave: async (model) => {},

  // After saving a value.
  // Fired after an `insert` or `update` query.
  // afterSave: async (model, result) => {},

  // Before fetching all values.
  // Fired before a `fetchAll` operation.
  // beforeFetchAll: async (model) => {},

  // After fetching all values.
  // Fired after a `fetchAll` operation.
  // afterFetchAll: async (model, results) => {},

  // Fired before a `fetch` operation.
  // beforeFetch: async (model) => {},

  // After fetching a value.
  // Fired after a `fetch` operation.
  // afterFetch: async (model, result) => {},

  // Before creating a value.
  // Fired before an `insert` query.
  // beforeCreate: async (model) => {
  //   var link_image_2000 = path.normalize(root_project+ '/public/uploads/' + model.name_image); //must is absolute link
  //   var reg = /(?:\/uploads\/).*/g;
  //   var reg_action = link_image_2000.match(reg);
  //   var name = reg_action.toString().replace(/\/|uploads/g,"");
  //   assert.equal(name.search("/"), -1);
  //   const outputPath = root_project + '/public/uploads/resize/';
  //   for (var i = 1; i < 5; i=i*2) {
  //       var output_name = (1024/i).toString()+ '_' + name;
  //       var forder_name = name.replace(/.jpg|.png|jpeg|bmp/,"");
  //       mkdirSync(path.join(outputPath,forder_name));
  //       var link = path.join(outputPath,forder_name,output_name);
  //       console.log(link);

  //       model['img'+ (1024/i).toString()] = link;
  //       imgTool.resize({
  //         srcPath: link_image_2000,
  //         dstPath: link,
  //         format: link_image_2000.slice(link_image_2000.length-3,link_image_2000.length),
  //         width: 1024/i,
  //         height: 1024/i,
  //       }, function(err,stdout,stderr) {
  //           if(err) {
  //             throw err;
  //           };
  //       });
  //   }
  // },
  // beforeCreate: async (model) => {
    // console.log(strapi.plugins.upload.controllers);
    // console.log(model);
    // var result = await strapi.plugins['upload'].services.upload.fetchAll({
    //   id : {
    //     contain: model.id.slice(0,-1)
    //   },
    //   select: ['url']
    // });
    // console.log(result);
  // },
  

  // After creating a value.
  // Fired after an `insert` query.
  // afterCreate: async (model, result) => {
  //   console.log("after:",model);
  //   console.log(result);
  // },

  // Before updating a value.
  // Fired before an `update` query.
  // beforeUpdate: async (model) => {
  //   console.log("model",model);
  // },

  // After updating a value.
  // Fired after an `update` query.
  // afterUpdate: async (model, result) => {},

  // Before destroying a value.
  // Fired before a `delete` query.
  // beforeDestroy: async (model) => {},

  // After destroying a value.
  // Fired after a `delete` query.
  // afterDestroy: async (model, result) => {}
};

// { file:
//   { [Function: model]
//     hooks: Kareem { _pres: [Map], _posts: [Map] },
//     base:
//      Mongoose {
//        connections: [Array],
//        models: [Object],
//        modelSchemas: [Object],
//        options: [Object],
//        _pluralize: [Function: pluralize],
//        plugins: [Array] },
//     modelName: 'UploadFile',
//     model: [Function: model],
    // db:
    //  NativeConnection {
    //    base: [Mongoose],
    //    collections: [Object],
    //    models: [Object],
    //    config: [Object],
    //    replica: false,
    //    options: null,
    //    otherDbs: [],
    //    relatedDbs: {},
    //    states: [Object],
    //    _readyState: 1,
    //    _closeCalled: false,
    //    _hasOpened: true,
    //    _listening: false,
    //    _connectionOptions: [Object],
    //    name: 'strapi',
    //    host: '127.0.0.1',
    //    port: 27017,
    //    user: null,
    //    pass: null,
    //    client: [MongoClient],
    //    '$initialConnection': [Promise],
    //    _events: [Object],
    //    _eventsCount: 2,
    //    db: [Db] },
    // discriminators: undefined,
    // '$appliedMethods': true,
    // '$appliedHooks': true,
    // schema:
    //  Schema {
    //    obj: [Object],
    //    paths: [Object],
    //    aliases: {},
    //    subpaths: {},
    //    virtuals: [Object],
    //    singleNestedPaths: {},
    //    nested: {},
    //    inherits: {},
    //    callQueue: [],
    //    _indexes: [],
    //    methods: [Object],
    //    methodOptions: {},
    //    statics: {},
    //    tree: [Object],
    //    query: {},
    //    childSchemas: [Array],
    //    plugins: [Array],
    //    s: [Object],
    //    _userProvidedOptions: [Object],
    //    options: [Object],
    //    '$globalPluginsApplied': true },
    // collection:
    //  NativeCollection {
    //    collection: [Collection],
    //    opts: [Object],
    //    name: 'upload_file',
    //    collectionName: 'upload_file',
    //    conn: [NativeConnection],
    //    queue: [],
    //    buffer: false,
    //    emitter: [EventEmitter] },
    // Query: { [Function] base: [Query] },
    // '$__insertMany': [Function],
    // '$init': Promise { null, catch: [Function] },
    // beforeCreate: [AsyncFunction: beforeCreate],
    // afterCreate: [AsyncFunction: afterCreate],
    // connection: 'default',
    // info: { name: 'file', description: '' },
    // options: { timestamps: true },
    // attributes:
    //  { name: [Object],
    //    hash: [Object],
    //    ext: [Object],
    //    mime: [Object],
    //    size: [Object],
    //    url: [Object],
    //    provider: [Object],
    //    related: [Object] },
    // globalId: 'UploadFile',
    // collectionName: 'upload_file',
    // globalName: 'UploadFile',
    // orm: 'mongoose',
    // client: undefined,
    // associations: [ [Object] ],
    // loadedModel:
    //  { name: [Object],
    //    hash: [Object],
    //    ext: [Object],
    //    mime: [Object],
    //    size: [Object],
    //    url: [Object],
    //    provider: [Object],
    //    related: [Array] },
    // primaryKey: '_id',
    // _attributes:
    //  { name: [Object],
    //    hash: [Object],
    //    ext: [Object],
    //    mime: [Object],
    //    size: [Object],
    //    url: [Object],
    //    provider: [Object],
    //    related: [Object] },
    // updateRelations: [AsyncFunction: update] } }