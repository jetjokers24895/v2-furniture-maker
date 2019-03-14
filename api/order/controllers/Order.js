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
          <a href="http://www.mfurniture.vn/orders/detail/${result.id}">Xem đơn hàng</a>
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
          subject: 'Yêu cầu thanh toán',
          html: `
          <div>
            <p>Đơn hàng của bạn đã sẵn sàng, vui lòng thanh toán số tiền còn lại để chuyển hàng</p>
            <a href="http://www.mfurniture.vn/orders/detail/${updatedOrder.id}">Xem đơn hàng</a>
          </div>
        `
        });
        break;
      case 'shipping':
        mail.sendTo({
          to: updatedOrder.created_by.email,
          subject: 'Đơn hàng của bạn đã được chuyển đi',
          html: `
          <div>
            <p>Đơn hàng của bạn đang trên đường đến</p>
            <a href="http://www.mfurniture.vn/orders/detail/${updatedOrder.id}">Xem đơn hàng</a>
          </div>
        `
        });
        break;
      case 'done':
        mail.sendTo({
          to: updatedOrder.created_by.email,
          subject: 'Đơn hàng của bạn đã hoàn thành',
          html: `
          <div>
            <p>Đơn hàng của bạn đã hoàn thành, cảm ơn vì đã xử dụng dịch vụ</p>
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
   * Destroy a/an order record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.order.remove(ctx.params);
  }
};
