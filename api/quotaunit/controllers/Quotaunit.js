'use strict';

/**
 * Quotaunit.js controller
 *
 * @description: A set of functions called "actions" for managing `Quotaunit`.
 */

module.exports = {

  /**
   * Retrieve quotaunit records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.quotaunit.search(ctx.query);
    } else {
      return strapi.services.quotaunit.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a quotaunit record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.quotaunit.fetch(ctx.params);
  },

  /**
   * Count quotaunit records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.quotaunit.count(ctx.query);
  },

  /**
   * Create a/an quotaunit record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.quotaunit.add(ctx.request.body);
  },

  /**
   * Update a/an quotaunit record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.quotaunit.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an quotaunit record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.quotaunit.remove(ctx.params);
  }
};
