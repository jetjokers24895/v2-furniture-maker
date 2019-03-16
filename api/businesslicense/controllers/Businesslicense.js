'use strict';

/**
 * Businesslicense.js controller
 *
 * @description: A set of functions called "actions" for managing `Businesslicense`.
 */

module.exports = {

  /**
   * Retrieve businesslicense records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.businesslicense.search(ctx.query);
    } else {
      return strapi.services.businesslicense.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a businesslicense record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.businesslicense.fetch(ctx.params);
  },

  /**
   * Count businesslicense records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.businesslicense.count(ctx.query);
  },

  /**
   * Create a/an businesslicense record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const result = await strapi.services.businesslicense.add(ctx.request.body);

    const { created_by } = result;
    const { mail } = strapi.services;

    mail.sendToAdmins({
      subject: 'Người dùng vừa đăng ký một tài khoản',
      html: `
        <div>
          <a href="http://www.mfurniture.vn/users/${created_by.id}">Xem tài khoản</a>
        </div>
      `
    });

    mail.sendTo({
      to: created_by.email,
      subject: '[furnituremaker.vn] Đăng ký tài khoản!',
      html: `
        <div>
          Cảm ơn bạn đã đăng ký!
        </div>
      `
    });

    return result;
  },

  /**
   * Update a/an businesslicense record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.businesslicense.edit(ctx.params, ctx.request.body);
  },

  /**
 * Update a/an businesslicense record.
 *
 * @return {Object}
 */

  changeStatus: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const params = { _id: ctx.params._id };

    const result = await strapi.services.businesslicense.edit(params, {
      ...ctx.request.body,
      status: ctx.params.status
    });

    const { created_by } = result;
    const { mail } = strapi.services;

    mail.sendTo({
      to: created_by.email,
      subject: '[furnituremaker.vn] Đăng ký tài khoản!',
      html: `
          <div>
            Tài khoản của bạn không đáp ứng được yêu cầu, chúng tôi rất tiếc về điều đó!
          </div>
        `
    });

    return result;
  },

  /**
   * Destroy a/an businesslicense record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.businesslicense.remove(ctx.params);
  }
};
