'use strict';

/**
 * A set of functions called "actions" for `Profile`
 */

module.exports = {
  updateUser: async (ctx) => {
    const { _id } = ctx.request.body;
    const currentUser = ctx.state.user;
    if (currentUser.id !== _id) {
      return ctx.notFound();
    }

    try {
      const usersPermissions = strapi.plugins['users-permissions'].services;
      const result = await usersPermissions.user.edit(
        { id: _id },
        {
          ...ctx.request.body,
          password: undefined,
          username: currentUser.username
        }
      );

      return result;
    } catch (err) {
      ctx.body = err;
    }
  },

  changePassword: async (ctx) => {
    const { user } = ctx.state;
    const userId = user.id || user._id.toHexString();

    const { oldPassword, newPassword } = ctx.request.body;

    const usersPermissions = strapi.plugins['users-permissions'].services;

    const validate = await usersPermissions.user.validatePassword(oldPassword, user.password);

    if (!validate) {
      return ctx.notFound();
    }

    try {
      const result = await usersPermissions.user.edit(
        { id: userId },
        {
          ...ctx.state.user,
          password: newPassword
        }
      );

      return result;
    } catch (err) {
      ctx.body = err;
    }
  }
};
