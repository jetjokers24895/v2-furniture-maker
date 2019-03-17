'use strict';

/**
 * Issueticket.js controller
 *
 * @description: A set of functions called "actions" for managing `Issueticket`.
 */

module.exports = {

  /**
   * Retrieve issueticket records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.issueticket.search(ctx.query);
    } else {
      return strapi.services.issueticket.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a issueticket record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.issueticket.fetch(ctx.params);
  },

  /**
   * Count issueticket records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.issueticket.count(ctx.query);
  },

  /**
   * Create a/an issueticket record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    let newIssueTitket;
    try {
      newIssueTitket = await strapi.services.issueticket.add(ctx.request.body);
      return newIssueTitket;

    } catch (error) {
      throw error;
    } finally {
      const { mail } = strapi.services;

      mail.sendToAdmins({
        subject: 'Người dùng vừa tạo một yêu cầu hỗ trợ',
        html: `
          <div>
            <p>
            Mã yêu cầu: <b>${newIssueTitket.code}</b>
            </p>
            <a href="http://www.mfurniture.vn/issues/${newIssueTitket.id}">Xem yêu cầu</a>
          </div>
        `
      });
    }
  },

  /**
   * Update a/an issueticket record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.issueticket.edit(ctx.params, ctx.request.body);
  },

  /**
 * Close a/an issueticket record.
 *
 * @return {Object}
 */

  close: async (ctx) => {
    const target = await strapi.services.issueticket.fetch(ctx.params);

    try {
      const result = await strapi.services.issueticket.edit(
        ctx.params,
        {
          ...target._doc,
          status: 'close'
        }
      );

      return result;
    } catch (error) {
      throw error;
    } finally {
      const { mail } = strapi.services;

      const isAuthorClosing = ctx.state.user.id === target.created_by.id;

      if (isAuthorClosing) {
        mail.sendToAdmins({
          subject: 'Người dùng vừa đóng một yêu cầu hỗ trợ',
          html: `
            <div>
              <p>
              Mã yêu cầu: <b>${target.code}</b>
              </p>
              <a href="http://www.mfurniture.vn/issues/${target.id}">Xem yêu cầu</a>
            </div>
          `
        });
      }
    }
  },

  /**
   * Destroy a/an issueticket record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.issueticket.remove(ctx.params);
  }
};
