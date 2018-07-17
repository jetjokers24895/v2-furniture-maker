'use strict';

/**
 * Productmodule.js controller
 *
 * @description: A set of functions called "actions" for managing `Productmodule`.
 */

module.exports = {

  /**
   * Retrieve productmodule records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.productmodule.search(ctx.query);
    } else {
      return strapi.services.productmodule.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a productmodule record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.productmodule.fetch(ctx.params);
  },

  /**
   * Count productmodule records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.productmodule.count(ctx.query);
  },

  /**
   * Create a/an productmodule record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.productmodule.add(ctx.request.body);
  },

  /**
   * Update a/an productmodule record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.productmodule.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an productmodule record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.productmodule.remove(ctx.params);
  }
};
