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

    mail.sendTo({
      to: result.created_by.email,
      templateId: 'd-9e484f35e2ab472bac1d86d497c59d34',
      dynamic_template_data: {
        user: ctx.state.user.fullname,
        orderCode: result.code,
        depositAmount: result.depositRequired,
        link: 'http://mfurniture.vn/orders/detail/' + result.id
      }
    });

    mail.sendToAdmins({
      templateId: 'd-4ee6f563b37c42529ff7bfe066cbd0d6',
      dynamic_template_data: {
        orderCode: result.code,
        link: 'http://mfurniture.vn/orders/detail/' + result.id
      }
    });

    return result;
  },

  /**
   * Update a/an order record.
   *
   * @return {Object}
   */

  update: async (ctx) => {
    const { _id, field } = ctx.params;
    const targetOrder = await strapi.services.order.fetch({ _id });
    let updatedOrder;

    const { mail } = strapi.services;
    switch (field) {
      case 'shippingDate':
        updatedOrder = await strapi.services.order.edit(
          ctx.params,
          {
            ...targetOrder._doc,
            status: ctx.request.body['shippingDate']
          }
        );

        mail.sendTo({
          to: updatedOrder.created_by.email,
          subject: 'Ngày giao hàng đã được thay đổi',
          html: `
            <div>
              <p>Ngày giao hàng đã được thay đổi, vui lòng kiểm tra</p>
              <p>
                Ngày dự kiến: ${targetOrder.shippingDate}
                <br>
                Ngày thay Đổi: ${updatedOrder.shippingDate}
              </p>
              <a href="http://www.mfurniture.vn/orders/detail/${updatedOrder.id}">Xem đơn hàng</a>
            </div>
          `
        });
        break;
      default:
        break;
    }

    return updatedOrder;
  },

  /**
   * Update a/an order record.
   *
   * @return {Object}
   */
  updateStatus: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const { _id, status } = ctx.params;
    const targetOrder = await strapi.services.order.fetch({ _id });

    if (targetOrder.status === status) {
      return targetOrder;
    }

    const updatedOrder = await strapi.services.order.edit(
      { _id },
      {
        ...targetOrder._doc,
        status: status
      }
    );

    const { mail } = strapi.services;
    switch (status) {
      case 'payment':
        mail.sendTo({
          to: updatedOrder.created_by.email,
          templateId: 'd-a17abe5e0c54414b8edb56d97e815706',
          dynamic_template_data: {
            user: ctx.state.user.fullname,
            orderCode: updatedOrder.code,
            link: 'http://mfurniture.vn/orders/detail/' + updatedOrder.id
          }
        });
        break;
      case 'shipping':
        mail.sendTo({
          to: updatedOrder.created_by.email,
          templateId: 'd-27f540f2b8d64faab57f4ac541b6647c',
          dynamic_template_data: {
            user: ctx.state.user.fullname,
            orderCode: updatedOrder.code,
            link: 'http://mfurniture.vn/orders/detail/' + updatedOrder.id
          }
        });
        break;
      case 'done':
        mail.sendTo({
          to: updatedOrder.created_by.email,
          templateId: 'd-27f540f2b8d64faab57f4ac541b6647c',
          dynamic_template_data: {
            link: 'http://mfurniture.vn/dashboard'
          }
        });
        break;
      default:
        break;
    }

    return updatedOrder;
  },

  /**~
   * Destroy a/an order record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.order.remove(ctx.params);
  }
};
