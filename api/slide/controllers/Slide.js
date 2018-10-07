'use strict';

/**
 * Slide.js controller
 *
 * @description: A set of functions called "actions" for managing `Slide`.
 */

module.exports = {

  /**
   * Retrieve slide records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.slide.search(ctx.query);
    } else {
      return strapi.services.slide.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a slide record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.slide.fetch(ctx.params);
  },

  /**
   * Count slide records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.slide.count(ctx.query);
  },

  /**
   * Create a/an slide record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.slide.add(ctx.request.body);
  },

  /**
   * Update a/an slide record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.slide.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an slide record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.slide.remove(ctx.params);
  }
};
