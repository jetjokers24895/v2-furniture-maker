'use strict';

/**
 * Discountbyquantity.js controller
 *
 * @description: A set of functions called "actions" for managing `Discountbyquantity`.
 */

module.exports = {

  /**
   * Retrieve discountbyquantity records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.discountbyquantity.search(ctx.query);
    } else {
      return strapi.services.discountbyquantity.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a discountbyquantity record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.discountbyquantity.fetch(ctx.params);
  },

  /**
   * Count discountbyquantity records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.discountbyquantity.count(ctx.query);
  },

  /**
   * Create a/an discountbyquantity record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.discountbyquantity.add(ctx.request.body);
  },

  /**
   * Update a/an discountbyquantity record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.discountbyquantity.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an discountbyquantity record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.discountbyquantity.remove(ctx.params);
  }
};
