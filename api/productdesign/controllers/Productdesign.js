'use strict';

/**
 * Productdesign.js controller
 *
 * @description: A set of functions called "actions" for managing `Productdesign`.
 */

module.exports = {

  /**
   * Retrieve productdesign records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.productdesign.search(ctx.query);
    } else {
      return strapi.services.productdesign.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a productdesign record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.productdesign.fetch(ctx.params);
  },

  /**
   * Count productdesign records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.productdesign.count(ctx.query);
  },

  /**
   * Create a/an productdesign record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.productdesign.add(ctx.request.body);
  },

  /**
   * Update a/an productdesign record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.productdesign.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an productdesign record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.productdesign.remove(ctx.params);
  }
};
