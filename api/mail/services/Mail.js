'use strict';

/**
 * `Mail` service.
 */

let mailConfigs;

module.exports = {
  sendTo: async ({ to, subject, text, html }) => {
    try {
      if (!mailConfigs) {
        mailConfigs = await strapi.plugins['email'].services.email.getProviderConfig(strapi.config.environment);
      }

      await strapi.plugins['email'].services.email.send({
        to: to,
        from: mailConfigs.sendgrid_default_from,
        replyTo: mailConfigs.sendgrid_default_replyto,
        subject: subject,
        text: text,
        html: html
      });
    } catch (error) {
      console.log(error);
    }
  },
  sendToAdmins: async ({ subject, text, html }) => {
    try {
      const roles = await strapi.plugins['users-permissions'].services.userspermissions.getRoles();
      const adminRole = roles.find(o => o.name === 'Administrator');
      if (!adminRole) {
        return;
      }

      const adminUsers = await strapi.plugins['users-permissions'].services.user.fetchAll({ role: adminRole });

      if (!mailConfigs) {
        mailConfigs = await strapi.plugins['email'].services.email.getProviderConfig(strapi.config.environment);
      }

      for (const adminUser of adminUsers) {
        if (!adminUser.email) {
          continue;
        }

        await strapi.plugins['email'].services.email.send({
          to: adminUser.email,
          from: mailConfigs.sendgrid_default_from,
          replyTo: mailConfigs.sendgrid_default_replyto,
          subject: subject,
          text: text,
          html: html
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
};