'use strict';

/**
 * Producttypegroup.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all producttypegroups.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('producttypegroup', params);
    // Select field to populate.
    const populate = Producttypegroup.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Producttypegroup
      .find()
      .where(filters.where)
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },

  /**
   * Promise to fetch a/an producttypegroup.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Producttypegroup.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Producttypegroup
      .findOne(_.pick(params, _.keys(Producttypegroup.schema.paths)))
      .populate(populate);
  },

  /**
   * Promise to count producttypegroups.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('producttypegroup', params);

    return Producttypegroup
      .count()
      .where(filters.where);
  },

  /**
   * Promise to add a/an producttypegroup.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Producttypegroup.associations.map(ast => ast.alias));
    const data = _.omit(values, Producttypegroup.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Producttypegroup.create(data);

    // Create relational data and return the entry.
    return Producttypegroup.updateRelations({ id: entry.id, values: relations });
  },

  /**
   * Promise to edit a/an producttypegroup.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Producttypegroup.associations.map(a => a.alias));
    const data = _.omit(values, Producttypegroup.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Producttypegroup.update(params, data, { multi: true });

    // Update relational data and return the entry.
    return Producttypegroup.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an producttypegroup.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Producttypegroup.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Producttypegroup
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Producttypegroup.associations.map(async association => {
        const search = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: data._id } : { [association.via]: { $in: [data._id] } };
        const update = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: null } : { $pull: { [association.via]: data._id } };

        // Retrieve model.
        const model = association.plugin ?
          strapi.plugins[association.plugin].models[association.model || association.collection] :
          strapi.models[association.model || association.collection];

        return model.update(search, update, { multi: true });
      })
    );

    return data;
  },

  /**
   * Promise to search a/an producttypegroup.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('producttypegroup', params);
    // Select field to populate.
    const populate = Producttypegroup.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Producttypegroup.attributes).reduce((acc, curr) => {
      switch (Producttypegroup.attributes[curr].type) {
        case 'integer':
        case 'float':
        case 'decimal':
          if (!_.isNaN(_.toNumber(params._q))) {
            return acc.concat({ [curr]: params._q });
          }

          return acc;
        case 'string':
        case 'text':
        case 'password':
          return acc.concat({ [curr]: { $regex: params._q, $options: 'i' } });
        case 'boolean':
          if (params._q === 'true' || params._q === 'false') {
            return acc.concat({ [curr]: params._q === 'true' });
          }

          return acc;
        default:
          return acc;
      }
    }, []);

    return Producttypegroup
      .find({ $or })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  }
};
