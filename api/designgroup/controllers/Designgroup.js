'use strict';

/**
 * Designgroup.js controller
 *
 * @description: A set of functions called "actions" for managing `Designgroup`.
 */

module.exports = {

  /**
   * Retrieve designgroup records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.designgroup.search(ctx.query);
    } else {
      return strapi.services.designgroup.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a designgroup record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.designgroup.fetch(ctx.params);
  },

  /**
   * Count designgroup records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.designgroup.count(ctx.query);
  },

  /**
   * Create a/an designgroup record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.designgroup.add(ctx.request.body);
  },

  /**
   * Update a/an designgroup record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.designgroup.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an designgroup record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.designgroup.remove(ctx.params);
  }
};
