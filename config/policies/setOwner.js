'use strict';

/**
 * `setOwner` policy.
 */

module.exports = async (ctx, next) => {
  const { _id } = ctx.state.user;
  const { body } = ctx.request;

  body.createdBy = _id.toString();

  await next();
};