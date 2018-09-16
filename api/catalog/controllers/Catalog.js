'use strict';

/**
 * Catalog.js controller
 *
 * @description: A set of functions called "actions" for managing `Catalog`.
 */

module.exports = {

  /**
   * Retrieve catalog records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.catalog.search(ctx.query);
    } else {
      return strapi.services.catalog.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a catalog record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.catalog.fetch(ctx.params);
  },

  /**
   * Count catalog records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.catalog.count(ctx.query);
  },

  /**
   * Create a/an catalog record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.catalog.add(ctx.request.body);
  },

  /**
   * Update a/an catalog record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.catalog.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an catalog record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.catalog.remove(ctx.params);
  }
};
