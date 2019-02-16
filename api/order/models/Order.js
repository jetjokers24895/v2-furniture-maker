'use strict';

const sendMailToAdmins = async ({ subject, text, html }) => {
  try {
    const roles = await strapi.plugins['users-permissions'].services.userspermissions.getRoles();
    const adminRole = roles.find(o => o.name === 'Administrator');
    if (!adminRole) {
      return;
    }

    const adminUsers = await strapi.plugins['users-permissions'].services.user.fetchAll({ role: adminRole });
    const mailConfigs = await strapi.plugins['email'].services.email.getProviderConfig(strapi.config.environment);

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
      })
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * Lifecycle callbacks for the `Order` model.
 */

module.exports = {
  // Before saving a value.
  // Fired before an `insert` or `update` query.
  // beforeSave: async (model) => {},

  // After saving a value.
  // Fired after an `insert` or `update` query.
  // afterSave: async (model, result) => {},

  // Before fetching all values.
  // Fired before a `fetchAll` operation.
  // beforeFetchAll: async (model) => {},

  // After fetching all values.
  // Fired after a `fetchAll` operation.
  afterFetchAll: async (model, results) => {
    console.log(strapi)
  },

  // Fired before a `fetch` operation.
  // beforeFetch: async (model) => {},

  // After fetching a value.
  // Fired after a `fetch` operation.
  // afterFetch: async (model, result) => {},

  // Before creating a value.
  // Fired before an `insert` query.
  // beforeCreate: async (model) => {},

  // After creating a value.
  // Fired after an `insert` query.
  afterCreate: async (model, result) => {
    sendMailToAdmins({
      subject: 'Đơn đặt hàng mới',
      html: `
        <div>
          <a href="admin.furnituremake.vn/orders/detail/${result.id}">Xem đơn hàng</a>
        </div>
      `
    });
  },

  // Before updating a value.
  // Fired before an `update` query.
  // beforeUpdate: async (model) => {},

  // After updating a value.
  // Fired after an `update` query.
  afterUpdate: async (model, result) => {
    sendMailToAdmins({
      subject: 'Đơn đặt hàng đã được cập nhật',
      html: `
        <div>
          <a href="admin.furnituremake.vn/orders/detail/${result.id}">Xem đơn hàng</a>
        </div>
      `
    });
  },

  // Before destroying a value.
  // Fired before a `delete` query.
  // beforeDestroy: async (model) => {},

  // After destroying a value.
  // Fired after a `delete` query.
  // afterDestroy: async (model, result) => {}
};
