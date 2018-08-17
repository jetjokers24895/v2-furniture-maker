'use strict';

/**
 * Agencylevel.js controller
 *
 * @description: A set of functions called "actions" for managing `Agencylevel`.
 */

module.exports = {

  /**
   * Retrieve agencylevel records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.agencylevel.search(ctx.query);
    } else {
      return strapi.services.agencylevel.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a agencylevel record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.agencylevel.fetch(ctx.params);
  },

  /**
   * Count agencylevel records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.agencylevel.count(ctx.query);
  },

  /**
   * Create a/an agencylevel record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.agencylevel.add(ctx.request.body);
  },

  /**
   * Update a/an agencylevel record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.agencylevel.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an agencylevel record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.agencylevel.remove(ctx.params);
  }
};
