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
    const result = await strapi.services.ordertransaction.add(ctx.request.body);

    const { mail } = strapi.services;

    if (result.type === 'deposit') {
      mail.sendToAdmins({
        templateId: 'd-7e25e939f63a4cde8118598d5a2a6ada',
        dynamic_template_data: {
          orderCode: result.order.code,
          link: 'http://mfurniture.vn/orders/detail/' + result.order.id
        }
      });
    } else if (result.type === 'payment') {
      mail.sendToAdmins({
        templateId: 'd-44f52a007b074a308cac247087245c94',
        dynamic_template_data: {
          orderCode: result.order.code,
          link: 'http://mfurniture.vn/orders/detail/' + result.order.id
        }
      });
    }

    return result;
  },

  /**
   * Update a/an ordertransaction record.
   *
   * @return {Object}
   */

  update: async (ctx) => {
    return strapi.services.ordertransaction.edit(ctx.params, ctx.request.body);
  },

  /**
   * Confirm a ordertransaction.
   *
   * @return {Object}
   */

  confirm: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const orderTransactionService = strapi.services.ordertransaction;

    const orderTransaction = await orderTransactionService.fetch(ctx.params);

    if (orderTransaction.confirmed) {
      return ctx.badRequest();
    }

    const result = await orderTransactionService.edit(ctx.params, {
      ...orderTransaction._doc,
      confirmed: true,
      confirmedBy: ctx.state.user
    });

    // #region [Update Order status]
    const orderService = strapi.services.order;
    const fetchOrderParams = { _id: result.order.id };
    const order = await orderService.fetch(fetchOrderParams);

    if (order.status === 'new') {
      const allConfirmedTransaction = await order.orderTransactions.filter(o => o.confirmed === true);
      const totalTransactionMoney = allConfirmedTransaction.reduce(
        (total, transaction) => total + transaction.money,
        0
      );

      if (totalTransactionMoney >= order.depositRequired) {
        orderService.edit(
          fetchOrderParams,
          {
            ...order._doc,
            status: 'confirmed'
          }
        );
      }
    }
    // #endregion

    // #region [Send Email]
    const { mail } = strapi.services;

    if (result.type === 'deposit') {
      const { mail } = strapi.services;
      mail.sendTo({
        to: order.created_by.email,
        templateId: 'd-dc979d9db0294b39912e270202f32c29',
        dynamic_template_data: {
          user: ctx.state.user.fullname,
          depositMoney: result.money,
          orderCode: result.order.code,
          link: 'http://mfurniture.vn/orders/detail/' + order.id
        }
      });
    } else if (result.type === 'payment') {
      mail.sendTo({
        to: order.created_by.email,
        templateId: 'd-25f5df645a29463c9df1dde415fcca9d',
        dynamic_template_data: {
          user: ctx.state.user.fullname,
          depositMoney: result.money,
          orderCode: result.order.code,
          transactionCode: result.code,
          link: 'http://mfurniture.vn/orders/detail/' + order.id
        }
      });
    }
    // #endregion

    return result;
  },

  /**
   * Reject a ordertransaction.
   *
   * @return {Object}
   */

  reject: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const orderTransaction = await strapi.services.ordertransaction.fetch(ctx.params);

    if (orderTransaction.confirmed) {
      return ctx.badRequest();
    }

    const result = await strapi.services.ordertransaction.edit(ctx.params, {
      ...orderTransaction._doc,
      rejected: true,
      rejectReason: ctx.request.body.rejectReason,
      rejectedBy: ctx.state.user
    });

    const { mail } = strapi.services;

    mail.sendTo({
      to: result.created_by.email,
      templateId: 'd-dc979d9db0294b39912e270202f32c29',
      dynamic_template_data: {
        user: ctx.state.user.fullname,
        depositMoney: result.money,
        orderCode: result.order.code,
        transactionCode: result.code,
        link: 'http://mfurniture.vn/orders/detail/' + result.order.id
      }
    });

    return result;
  },

  /**
   * Destroy a/an ordertransaction record.
   *
   * @return {Object}
   */

  destroy: async (ctx) => {
    return strapi.services.ordertransaction.remove(ctx.params);
  }
};
