'use strict';

/**
 * Components.js controller
 *
 * @description: A set of functions called "actions" for managing `Components`.
 */

module.exports = {

  /**
   * Retrieve components records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.components.search(ctx.query);
    } else {
      return strapi.services.components.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a components record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.components.fetch(ctx.params);
  },

  /**
   * Count components records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.components.count(ctx.query);
  },

  /**
   * Create a/an components record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.components.add(ctx.request.body);
  },

  /**
   * Update a/an components record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.components.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an components record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.components.remove(ctx.params);
  }
};
