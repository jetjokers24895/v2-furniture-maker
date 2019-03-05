'use strict';

/**
 * `setOwner` policy.
 */

module.exports = async (ctx, next) => {
  const { _id, id } = ctx.state.user;
  const { body } = ctx.request;

  body.created_by = id || _id.toString();

  await next();
};