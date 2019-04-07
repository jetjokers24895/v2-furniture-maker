'use strict';

const makeCode = async () => {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  for (var i = 0; i < 3; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  const code = 'EX' + text;

  const existWithTheCode = await strapi.services.material.fetchAll({ code });
  if(existWithTheCode.length) {
    return makeCode();
  }

  return code;
};

/**
 * Material.js controller
 *
 * @description: A set of functions called "actions" for managing `Material`.
 */

module.exports = {

  /**
   * Retrieve material records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.material.search(ctx.query);
    } else {
      return strapi.services.material.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a material record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.material.fetch(ctx.params);
  },

  /**
   * Count material records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.material.count(ctx.query);
  },

  /**
   * Create a/an material record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.material.add(ctx.request.body);
  },

  /**
   * Create external a/an material record.
   *
   * @return {Object}
   */

  createExternal: async (ctx) => {
    let code = await makeCode();

    return strapi.services.material.add({
      ...ctx.request.body,
      name: ctx.request.body.displayName,
      price: 0,
      external: true,
      code: code
    });
  },

  /**
   * Update a/an material record.
   *
   * @return {Object}
   */

  update: async (ctx) => {
    return strapi.services.material.edit(ctx.params, ctx.request.body);
  },

  /**
   * Destroy a/an material record.
   *
   * @return {Object}
   */

  destroy: async (ctx) => {
    return strapi.services.material.remove(ctx.params);
  }
};
