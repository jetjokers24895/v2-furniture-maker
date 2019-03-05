'use strict';

/**
 * `isOwner` policy.
 */

module.exports = async (ctx, next) => {
  const { id, _id, role } = ctx.state.user;
  if (role !== "Administrator") {
    ctx.query.created_by = _id | id;
  }

  await next();
  if (ctx.params.id) {
    let owner = ctx.response.body.get("created_by")
    if (owner !== id && role !== "Administrator") {
      return ctx.unauthorized("You are not allowed to perform this action.");
    }
  }
};
