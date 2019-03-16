'use strict';

/**
 * Issueticket.js controller
 *
 * @description: A set of functions called "actions" for managing `Issueticket`.
 */

module.exports = {

  /**
   * Retrieve issueticket records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.issueticket.search(ctx.query);
    } else {
      return strapi.services.issueticket.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a issueticket record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.issueticket.fetch(ctx.params);
  },

  /**
   * Count issueticket records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.issueticket.count(ctx.query);
  },

  /**
   * Create a/an issueticket record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.issueticket.add(ctx.request.body);
  },

  /**
   * Update a/an issueticket record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.issueticket.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an issueticket record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.issueticket.remove(ctx.params);
  }
};
