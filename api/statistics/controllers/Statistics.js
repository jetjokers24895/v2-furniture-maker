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

      let totalProduct = 0;
      let totalDiscount = 0;
      let totalTransactionMoney = 0;

      for (let i = 0; i < allOrder.length; i++) {
        const order = allOrder[i];

        totalProduct += order.totalProduct;
        totalDiscount += order.totalDiscount;

        totalTransactionMoney += order.orderTransactions.reduce(
          (total, orderTransaction) => {
            if (!orderTransaction.confirmed) {
              return total;
            }

            return total + orderTransaction.money;
          },
          0
        );
      }

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
