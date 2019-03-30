'use strict';

/**
 * A set of functions called "actions" for `Statistics`
 */

module.exports = {
  profileOverview: async (ctx) => {
    const { id } = ctx.state.user;

    try {
      const orderService = strapi.services.order;
      const allOrder = await orderService.fetchAll({
        created_by: id,
        status: 'done'
      });

      const totalProduct = allOrder.reduce(
        (total, order) => {
          return total + order.totalProduct;
        },
        0
      );

      const totalDiscount = allOrder.reduce(
        (totalDiscount, order) => {
          return totalDiscount + order.totalDiscount;
        },
        0
      );

      const transactionService = strapi.services.ordertransaction;

      const allOrderTransaction = await transactionService.fetchAll({
        created_by: id,
        confirmed: true
      });

      const totalTransactionMoney = allOrderTransaction.reduce(
        (total, orderTransaction) => {
          return total + orderTransaction.money;
        },
        0
      );

      return {
        totalTransactionMoney: totalTransactionMoney,
        orderCount: allOrder.length,
        totalProduct: totalProduct,
        totalDiscount: totalDiscount
      };
    } catch (err) {
      ctx.body = err;
    }
  }
};
