'use strict';

/**
 * Order.js controller
 *
 * @description: A set of functions called "actions" for managing `Order`.
 */

module.exports = {

  /**
   * Retrieve order records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.order.search(ctx.query);
    } else {
      return strapi.services.order.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a order record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.order.fetch(ctx.params);
  },

  /**
   * Count order records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.order.count(ctx.query);
  },

  /**
   * Create a/an order record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const result = await strapi.services.order.add(ctx.request.body);

    const { mail } = strapi.services;

    mail.sendToAdmins({
      subject: 'Đơn đặt hàng mới',
      html: `
        <div>
          <a href="admin.furnituremaker.vn/orders/detail/${result.id}">Xem đơn hàng</a>
        </div>
      `
    });

    return result;
  },

  /**
   * Update a/an order record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const result = await strapi.services.order.edit(ctx.params, ctx.request.body);

    if (!result.id) {
      return;
    }

    const { mail } = strapi.services;

    mail.sendToAdmins({
      subject: 'Đơn đặt hàng đã được cập nhật',
      html: `
        <div>
          <a href="admin.furnituremaker.vn/orders/detail/${result.id}">Xem đơn hàng</a>
        </div>
      `
    });

    return result;
  },

  /**
   * Destroy a/an order record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.order.remove(ctx.params);
  }
};
