'use strict';

/**
 * Productdiscount.js controller
 *
 * @description: A set of functions called "actions" for managing `Productdiscount`.
 */

module.exports = {

  /**
   * Retrieve productdiscount records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.productdiscount.search(ctx.query);
    } else {
      return strapi.services.productdiscount.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a productdiscount record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.productdiscount.fetch(ctx.params);
  },

  /**
   * Count productdiscount records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.productdiscount.count(ctx.query);
  },

  /**
   * Create a/an productdiscount record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.productdiscount.add(ctx.request.body);
  },

  /**
   * Update a/an productdiscount record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.productdiscount.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an productdiscount record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.productdiscount.remove(ctx.params);
  }
};
