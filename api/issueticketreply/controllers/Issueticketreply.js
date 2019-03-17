'use strict';

/**
 * Issueticketreply.js controller
 *
 * @description: A set of functions called "actions" for managing `Issueticketreply`.
 */

module.exports = {

  /**
   * Retrieve issueticketreply records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.issueticketreply.search(ctx.query);
    } else {
      return strapi.services.issueticketreply.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a issueticketreply record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.issueticketreply.fetch(ctx.params);
  },

  /**
   * Count issueticketreply records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.issueticketreply.count(ctx.query);
  },

  /**
   * Create a/an issueticketreply record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.issueticketreply.add(ctx.request.body);
  },

  /**
   * Update a/an issueticketreply record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.issueticketreply.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an issueticketreply record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.issueticketreply.remove(ctx.params);
  }
};
