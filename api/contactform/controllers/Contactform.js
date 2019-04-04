'use strict';

/**
 * Contactform.js controller
 *
 * @description: A set of functions called "actions" for managing `Contactform`.
 */

module.exports = {

  /**
   * Retrieve contactform records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.contactform.search(ctx.query);
    } else {
      return strapi.services.contactform.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a contactform record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.contactform.fetch(ctx.params);
  },

  /**
   * Count contactform records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.contactform.count(ctx.query);
  },

  /**
   * Create a/an contactform record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    strapi.services.contactform.add(ctx.request.body);
    ctx.redirect('http://mfurniture.vn/');
    return;
  },

  /**
   * Update a/an contactform record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.contactform.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an contactform record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.contactform.remove(ctx.params);
  }
};
