'use strict';

/**
 * Design.js controller
 *
 * @description: A set of functions called "actions" for managing `Design`.
 */

module.exports = {

  /**
   * Retrieve design records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.design.search(ctx.query);
    } else {
      return strapi.services.design.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a design record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.design.fetch(ctx.params);
  },

  /**
   * Count design records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.design.count(ctx.query);
  },

  /**
   * Create a/an design record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.design.add(ctx.request.body);
  },

  /**
   * Update a/an design record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.design.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an design record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.design.remove(ctx.params);
  }
};
