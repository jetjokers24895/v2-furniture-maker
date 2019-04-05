'use strict';

const shortid = require('shortid');

/**
 * Invitation.js controller
 *
 * @description: A set of functions called "actions" for managing `Invitation`.
 */

module.exports = {

  /**
   * Retrieve invitation records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.invitation.search(ctx.query);
    } else {
      return strapi.services.invitation.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a invitation record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.invitation.fetch(ctx.params);
  },

  /**
   * Count invitation records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.invitation.count(ctx.query);
  },

  /**
   * Create a/an invitation record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return await strapi.services.invitation.add({
      ...ctx.request.body,
      code: shortid.generate()
    });
  },

  /**
   * Update a/an invitation record.
   *
   * @return {Object}
   */

  update: async (ctx) => {
    return strapi.services.invitation.edit(ctx.params, ctx.request.body);
  },

  /**
   * Confirm a/an invitation record.
   *
   * @return {Object}
   */

  confirm: async (ctx) => {
    const { code, email, phone, password } = ctx.request.body;
    const invitation = strapi.services.invitation.fetchAll({ code });

    if (!invitation) {
      return ctx.notFound();
    }

    try {
      const usersPermissions = strapi.plugins['users-permissions'].services;
      const allRole = await usersPermissions.userspermissions.getRoles();
      const authenticationRole = allRole.find(o => o.name === 'Authentication');

      const newUser = await usersPermissions.user.add({
        email,
        password,
        phone,
        username: code,
        confirmed: true,
        fullname: invitation.receiverFullName,
        role: authenticationRole,
      });

      const [startAgencyLevel] = await strapi.services.agencylevel.fetchAll({
        index: 0
      });

      await strapi.services.agency.add({
        name: invitation.receiverAgencyName,
        linkedUser: newUser,
        level: startAgencyLevel
      });

      await strapi.services.invitation.edit(
        ctx.params,
        {
          ...invitation._doc,
          confirmedDate: (new Date()).toISOString()
        }
      );

      return await usersPermissions.jwt.issue({ id: newUser.id, _id: newUser._id });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Destroy a/an invitation record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.invitation.remove(ctx.params);
  }
};
