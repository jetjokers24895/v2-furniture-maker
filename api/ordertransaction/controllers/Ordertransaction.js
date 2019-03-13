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
    const { user } = ctx.state;
    const result = await strapi.services.ordertransaction.add(ctx.request.body);

    const { mail } = strapi.services;

    mail.sendToAdmins({
      subject: '[Đơn hàng] Giao dịch được tạo',
      html: `
        <div>
          <p>
            Từ tài khoản: ${user.email}
            <br>
            Mã giao dịch: <b>${result.code}</b>
          </p>
          <a href="http://www.mfurniture.vn/orders/detail/${result.order.id}">Xem đơn hàng</a>
        </div>
      `
    });

    return result;
  },

  /**
   * Update a/an ordertransaction record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.ordertransaction.edit(ctx.params, ctx.request.body);
  },

  /**
   * Confirm a ordertransaction.
   *
   * @return {Object}
   */

  confirm: async (ctx, next) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const orderTransaction = await strapi.services.ordertransaction.fetch(ctx.params);

    if (orderTransaction.confirmed) {
      return ctx.badRequest();
    }

    const result = await strapi.services.ordertransaction.edit(ctx.params, {
      ...orderTransaction._doc,
      confirmed: true,
      confirmedBy: ctx.state.user
    });

    const { mail } = strapi.services;

    mail.sendTo({
      to: result.created_by.email,
      subject: '[Đơn hàng] Giao dịch được xác nhận',
      html: `
        <div>
          <p>
            Mã giao dịch: <b>${result.code}</b>
          </p>
          <a href="http://www.mfurniture.vn/orders/detail/${result.order.id}">Xem đơn hàng</a>
        </div>
      `
    });
    
    return result;
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