'use strict';

/**
 * Agency.js controller
 *
 * @description: A set of functions called "actions" for managing `Agency`.
 */

module.exports = {

  /**
   * Retrieve agency records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.agency.search(ctx.query);
    } else {
      return strapi.services.agency.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a agency record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.agency.fetch(ctx.params);
  },

  /**
   * Count agency records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.agency.count(ctx.query);
  },

  /**
   * Create a/an agency record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const { body } = ctx.request;
    const { linkedUser } = body;

    const result = await strapi.services.agency.add(ctx.request.body);

    const usersPermissions = strapi.plugins['users-permissions'].services;
    const linkedUserEntity = await usersPermissions.user.fetch({ id: linkedUser });

    UpdateLicenseStatus: {
      await strapi.services.businesslicense.edit(
        { _id: body.businessLicense },
        {
          ...result.businessLicense._doc,
          status: 'accepted'
        }
      );
    }

    UpdateUserRole: {

      const roles = await usersPermissions.userspermissions.getRoles();
      const authenticatedRole = roles.find(o => o.name === 'Authenticated');

      await usersPermissions.user.edit({ id: linkedUser }, { ...linkedUserEntity, role: authenticatedRole });
    }

    SendMailToLinkedUser: {
      const { mail } = strapi.services;

      mail.sendTo({
        to: linkedUserEntity.email,
        subject: 'Tài khoản của bạn đã được xác nhận',
        html: `
          <div>
            <a href="admin.furnituremaker.vn/auth/login">Đăng nhập</a>
          </div>
        `
      });
    }

    return result;
  },

  /**
   * Update a/an agency record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.agency.edit(ctx.params, ctx.request.body);
  },

  /**
   * Destroy a/an agency record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.agency.remove(ctx.params);
  }
};
