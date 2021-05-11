// Querying
const excluded_fields = ['select', 'sort', 'page', 'limit', 'include_usersAndChairs', 'from', 'to'];

function checkMatching(property) {
  return (property === 'lt' || property === 'lte'
      || property === 'gt' || property === 'gte' || false);
}

function formatQuery(query) {
  Object.keys(query)
    .forEach((objKey) => {
      const assumedAsObject = query[objKey];
      if (typeof assumedAsObject === 'object') {
        Object.keys(assumedAsObject)
          .forEach((key) => {
            if (checkMatching(key)) {
              const value = assumedAsObject[key];
              delete assumedAsObject[key];
              assumedAsObject[`$${key}`] = value;
            }
          });
      }
    });
  return query;
}

exports.buildQuery = (query) => {
    const result = { ...query };
    excluded_fields.forEach((field) => delete result[field]);
    Object.keys(result).forEach((k) => {
      if (~result[k].indexOf(',')) {
        result[k] = { $in: result[k].split(',') };
      }
    });
    return formatQuery(result);
};