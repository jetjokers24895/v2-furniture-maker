'use strict';

const _ = require('lodash');
const shortid = require('shortid');

const isInvitationExpried = (invitation) => {
  const expirationDate = new Date(invitation.expirationDate);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const isExpired = expirationDate < now;
  return isExpired;
};

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
   * Retrieve a invitation record by code.
   *
   * @return {Object}
   */

  findOneByCode: async (ctx) => {
    const invitation = await strapi.services.invitation.fetch({ code: ctx.params.code });

    const isExpired = isInvitationExpried(invitation);

    if (!!invitation.joinedDate || isExpired) {
      return ctx.badRequest();
    }

    return invitation;
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
    const now = new Date();
    now.setDate(now.getDate() + 7);

    return await strapi.services.invitation.add({
      ...ctx.request.body,
      code: shortid.generate(),
      expirationDate: now.toISOString()
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

  join: async (ctx) => {
    const invitation = await strapi.services.invitation.fetch(ctx.params);

    const isExpired = isInvitationExpried(invitation);

    if (invitation.joinedDate || isExpired) {
      return ctx.badRequest();
    }

    if (!invitation) {
      return ctx.notFound();
    }

    const { email, password } = ctx.request.body;

    try {
      const usersPermissions = strapi.plugins['users-permissions'].services;
      const allRole = await usersPermissions.userspermissions.getRoles();
      const authenticationRole = allRole.find(o => o.name === 'Authenticated');

      const newUser = await usersPermissions.user.add({
        email,
        password,
        phone: invitation.receiverPhone,
        username: invitation.code,
        fullName: invitation.receiverFullName,
        role: authenticationRole,
        invitation: invitation,
        confirmed: true
      });

      const [startAgencyLevel] = await strapi.services.agencylevel.fetchAll({
        index: 0
      });

      await strapi.services.agency.add({
        name: invitation.receiverAgencyName,
        city: invitation.receivercity,
        county: invitation.receiverCounty,
        address: invitation.receiverAddress,
        phone: invitation.receiverPhone,
        email: newUser.email,
        linkedUser: newUser,
        level: startAgencyLevel
      });

      await strapi.services.invitation.edit(
        ctx.params,
        {
          ...invitation._doc,
          joinedDate: (new Date()).toISOString()
        }
      );

      // #region [Send mails]
      strapi.services.mail.sendToAdmins({
        templateId: 'd-91e53eef5aee419aa5bb7a6ab87f32d4',
        dynamic_template_data: {
          newUserFullname: newUser.fullname,
          newUserEmail: newUser.mail,
          link: 'http://design.mfurniture.vn/acccounts?email=' + newUser.email
        }
      });
      // #endregion

      ctx.send({
        jwt: usersPermissions.jwt.issue(_.pick(newUser.toJSON ? newUser.toJSON() : newUser, ['_id', 'id'])),
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Destroy a/an invitation record.
   *
   * @return {Object}
   */

  destroy: async (ctx) => {
    return strapi.services.invitation.remove(ctx.params);
  }
};
