'use strict';

/**
 * Accountrequest.js controller
 *
 * @description: A set of functions called "actions" for managing `Accountrequest`.
 */

module.exports = {

  /**
   * Retrieve accountrequest records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.accountrequest.search(ctx.query);
    } else {
      return strapi.services.accountrequest.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a accountrequest record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.accountrequest.fetch(ctx.params);
  },

  /**
   * Count accountrequest records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.accountrequest.count(ctx.query);
  },

  /**
   * Create a/an accountrequest record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.accountrequest.add(ctx.request.body);
  },

  /**
   * Update a/an accountrequest record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.accountrequest.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an accountrequest record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.accountrequest.remove(ctx.params);
  }
};
