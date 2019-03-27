'use strict';

/**
 * `Notification` service.
 */

module.exports = {
  send: ({ userId, url, content, type }) => {
    const notificationRef = strapi.notificationRef.child(`/${userId}`);
    notificationRef.put().set({
      useId: userId,
      content: content,
      url: url,
      type: type,
      viewed: false,
      createdAt: (new Date).toISOString()
    });
  }
};
