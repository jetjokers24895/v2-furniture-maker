'use strict';

/**
 * Orderdetail.js controller
 *
 * @description: A set of functions called "actions" for managing `Orderdetail`.
 */

module.exports = {

  /**
   * Retrieve orderdetail records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.orderdetail.search(ctx.query);
    } else {
      return strapi.services.orderdetail.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a orderdetail record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.orderdetail.fetch(ctx.params);
  },

  /**
   * Count orderdetail records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.orderdetail.count(ctx.query);
  },

  /**
   * Create a/an orderdetail record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.orderdetail.add(ctx.request.body);
  },

  /**
   * Update a/an orderdetail record.
   *
   * @return {Object}
   */

  update: async (ctx) => {
    return strapi.services.orderdetail.edit(ctx.params, ctx.request.body);
  },
  /**
   * Update a orderdetail quantity.
   *
   * @return {Object}
   */

  updateQuantity: async (ctx) => {
    const {
      quantity,
      product_type,
      productPrice
    } = ctx.request.body;

    try {
      const discountbyQuantities = await strapi.services.discountbyquantity.fetchAll({ productType: product_type });
      const sortedDiscountByQuantities = discountbyQuantities.sort((item1, item2) => item2.quantity - item1.quantity);
      const discoutnByQuantity = sortedDiscountByQuantities.find(o => o.quantity <= quantity);

      const discount = discoutnByQuantity.discountPerProduct * quantity;
      const subTotalPrice = productPrice * quantity;

      return strapi.services.orderdetail.edit(ctx.params, {
        ...ctx.request.body,
        totalDiscountPerProduct: discoutnByQuantity.discountPerProduct,
        discount: discount,
        subTotalPrice: subTotalPrice,
        totalPrice: subTotalPrice - discount
      });

    } catch (error) {
      throw error;
    }
  },
  /**
   * Destroy a/an orderdetail record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.orderdetail.remove(ctx.params);
  }
};
