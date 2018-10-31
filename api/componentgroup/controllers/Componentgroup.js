'use strict';

/**
 * Componentgroup.js controller
 *
 * @description: A set of functions called "actions" for managing `Componentgroup`.
 */

module.exports = {

  /**
   * Retrieve componentgroup records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.componentgroup.search(ctx.query);
    } else {
      return strapi.services.componentgroup.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a componentgroup record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.componentgroup.fetch(ctx.params);
  },

  /**
   * Count componentgroup records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.componentgroup.count(ctx.query);
  },

  /**
   * Create a/an componentgroup record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.componentgroup.add(ctx.request.body);
  },

  /**
   * Update a/an componentgroup record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.componentgroup.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an componentgroup record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.componentgroup.remove(ctx.params);
  }
};
