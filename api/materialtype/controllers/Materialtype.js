'use strict';

/**
 * Materialtype.js controller
 *
 * @description: A set of functions called "actions" for managing `Materialtype`.
 */

module.exports = {

  /**
   * Retrieve materialtype records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.materialtype.search(ctx.query);
    } else {
      return strapi.services.materialtype.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a materialtype record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.materialtype.fetch(ctx.params);
  },

  /**
   * Count materialtype records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.materialtype.count(ctx.query);
  },

  /**
   * Create a/an materialtype record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.materialtype.add(ctx.request.body);
  },

  /**
   * Update a/an materialtype record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.materialtype.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an materialtype record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.materialtype.remove(ctx.params);
  }
};
