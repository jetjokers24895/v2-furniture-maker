'use strict';

/**
 * Componenttype.js controller
 *
 * @description: A set of functions called "actions" for managing `Componenttype`.
 */

module.exports = {

  /**
   * Retrieve componenttype records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.componenttype.search(ctx.query);
    } else {
      return strapi.services.componenttype.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a componenttype record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.componenttype.fetch(ctx.params);
  },

  /**
   * Count componenttype records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.componenttype.count(ctx.query);
  },

  /**
   * Create a/an componenttype record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.componenttype.add(ctx.request.body);
  },

  /**
   * Update a/an componenttype record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.componenttype.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an componenttype record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.componenttype.remove(ctx.params);
  }
};
