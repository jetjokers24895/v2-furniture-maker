'use strict';

/**
 * Promotion.js controller
 *
 * @description: A set of functions called "actions" for managing `Promotion`.
 */

module.exports = {

  /**
   * Retrieve promotion records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.promotion.search(ctx.query);
    } else {
      return strapi.services.promotion.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a promotion record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.promotion.fetch(ctx.params);
  },

  /**
   * Count promotion records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.promotion.count(ctx.query);
  },

  /**
   * Create a/an promotion record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.promotion.add(ctx.request.body);
  },

  /**
   * Update a/an promotion record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.promotion.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an promotion record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.promotion.remove(ctx.params);
  }
};
