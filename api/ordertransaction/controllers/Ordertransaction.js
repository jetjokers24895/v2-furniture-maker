'use strict';

/**
 * Ordertransaction.js controller
 *
 * @description: A set of functions called "actions" for managing `Ordertransaction`.
 */

module.exports = {

  /**
   * Retrieve ordertransaction records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.ordertransaction.search(ctx.query);
    } else {
      return strapi.services.ordertransaction.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a ordertransaction record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.ordertransaction.fetch(ctx.params);
  },

  /**
   * Count ordertransaction records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.ordertransaction.count(ctx.query);
  },

  /**
   * Create a/an ordertransaction record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.ordertransaction.add(ctx.request.body);
  },

  /**
   * Update a/an ordertransaction record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.ordertransaction.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an ordertransaction record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.ordertransaction.remove(ctx.params);
  }
};
