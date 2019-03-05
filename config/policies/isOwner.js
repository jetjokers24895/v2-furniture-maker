'use strict';

/**
 * `isOwner` policy.
 */

module.exports = async (ctx, next) => {
  const { id, role } = ctx.state.user;

  let roleName = role && role.name;
  if (!roleName) {
    roleName = role;
  }

  if (roleName !== "Administrator") {
    ctx.query.created_by = id;
  }

  await next();
  if (ctx.params.id) {
    let owner = ctx.response.body.get("created_by")
    if (owner !== id && role !== "Administrator") {
      return ctx.unauthorized("You are not allowed to perform this action.");
    }
  }
};
