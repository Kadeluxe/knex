const Raw = require('./raw');

class RawSqlQuery extends Raw {
  constructor(client, options) {
    super(client);

    this.sqlWrapperOptions = options;
  }

  toSQL(method, tz) {
    const obj = super.toSQL(method, tz);
    obj.method = 'raw-rows';
    obj.transform = this.sqlWrapperOptions;

    return obj;
  }
}

module.exports = {
  RawSqlQuery,
};
