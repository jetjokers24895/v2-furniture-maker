'use strict';

/**
 * County.js controller
 *
 * @description: A set of functions called "actions" for managing `County`.
 */

module.exports = {

  /**
   * Retrieve county records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.county.search(ctx.query);
    } else {
      return strapi.services.county.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a county record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.county.fetch(ctx.params);
  },

  /**
   * Count county records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.county.count(ctx.query);
  },

  /**
   * Create a/an county record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.county.add(ctx.request.body);
  },

  /**
   * Update a/an county record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.county.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an county record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.county.remove(ctx.params);
  }
};
