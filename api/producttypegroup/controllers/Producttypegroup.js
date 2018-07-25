'use strict';

/**
 * Producttypegroup.js controller
 *
 * @description: A set of functions called "actions" for managing `Producttypegroup`.
 */

module.exports = {

  /**
   * Retrieve producttypegroup records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.producttypegroup.search(ctx.query);
    } else {
      return strapi.services.producttypegroup.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a producttypegroup record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.producttypegroup.fetch(ctx.params);
  },

  /**
   * Count producttypegroup records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.producttypegroup.count(ctx.query);
  },

  /**
   * Create a/an producttypegroup record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.producttypegroup.add(ctx.request.body);
  },

  /**
   * Update a/an producttypegroup record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.producttypegroup.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an producttypegroup record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.producttypegroup.remove(ctx.params);
  }
};
