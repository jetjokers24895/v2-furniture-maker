'use strict';

/**
 * Productgroup.js controller
 *
 * @description: A set of functions called "actions" for managing `Productgroup`.
 */

module.exports = {

  /**
   * Retrieve productgroup records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.productgroup.search(ctx.query);
    } else {
      return strapi.services.productgroup.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a productgroup record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.productgroup.fetch(ctx.params);
  },

  /**
   * Count productgroup records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.productgroup.count(ctx.query);
  },

  /**
   * Create a/an productgroup record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.productgroup.add(ctx.request.body);
  },

  /**
   * Update a/an productgroup record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.productgroup.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an productgroup record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.productgroup.remove(ctx.params);
  }
};
