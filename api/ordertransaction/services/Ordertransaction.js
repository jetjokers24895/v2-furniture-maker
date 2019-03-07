'use strict';

/**
 * Ordertransaction.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all ordertransactions.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('ordertransaction', params);
    // Select field to populate.
    const populate = Ordertransaction.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Ordertransaction
      .find()
      .where(filters.where)
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(filters.populate || populate);
  },

  /**
   * Promise to fetch a/an ordertransaction.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Ordertransaction.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Ordertransaction
      .findOne(_.pick(params, _.keys(Ordertransaction.schema.paths)))
      .populate(populate);
  },

  /**
   * Promise to count ordertransactions.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('ordertransaction', params);

    return Ordertransaction
      .count()
      .where(filters.where);
  },

  /**
   * Promise to add a/an ordertransaction.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Ordertransaction.associations.map(ast => ast.alias));
    const data = _.omit(values, Ordertransaction.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Ordertransaction.create(data);

    // Create relational data and return the entry.
    return Ordertransaction.updateRelations({ id: entry.id, values: relations });
  },

  /**
   * Promise to edit a/an ordertransaction.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Ordertransaction.associations.map(a => a.alias));
    const data = _.omit(values, Ordertransaction.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Ordertransaction.update(params, data, { multi: true });

    // Update relational data and return the entry.
    return Ordertransaction.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an ordertransaction.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Ordertransaction.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Ordertransaction
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Ordertransaction.associations.map(async association => {
        try {
          if (!association.via || !data._id || association.dominant) {
            return true;
          }

          const search = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: data._id } : { [association.via]: { $in: [data._id] } };
          const update = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: null } : { $pull: { [association.via]: data._id } };

          // Retrieve model.
          const model = association.plugin ?
            strapi.plugins[association.plugin].models[association.model || association.collection] :
            strapi.models[association.model || association.collection];
          const result = await model.update(search, update, { multi: true });
          return result;
        } catch (error) {
          console.log(error);
        }
      })
    );

    return data;
  },

  /**
   * Promise to search a/an ordertransaction.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('ordertransaction', params);
    // Select field to populate.
    const populate = Ordertransaction.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Ordertransaction.attributes).reduce((acc, curr) => {
      switch (Ordertransaction.attributes[curr].type) {
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

    return Ordertransaction
      .find({ $or })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  }
};
