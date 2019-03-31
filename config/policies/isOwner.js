'use strict';

/**
 * `isOwner` policy.
 */

module.exports = async (ctx, next) => {
  const { id, _id, role } = ctx.state.user;
  let userId = id;

  let roleName = role && role.name;
  if (!userId) {
    userId = _id.toHexString();
  }

  if (!roleName) {
    roleName = role;
  }

  if (roleName !== "Administrator") {
    ctx.query.created_by = userId;
  }

  await next();

  if (ctx.params.id) {
    let owner = ctx.response.body.get("created_by")
    if (owner !== userId && role !== "Administrator") {
      return ctx.unauthorized("You are not allowed to perform this action.");
    }
  }
};
