class SqlWrapper {
  constructor(sql, bindings) {
    this.sql = sql;
    this.bindings = bindings;
    this.options = {
      assert: false,
      single: false,
    };
  }

  single() {
    this.options.single = true;

    return this;
  }

  assert() {
    this.options.assert = true;

    return this;
  }

  static fromTemplateString(literals, args) {
    let string = literals[0];
    const bindings = [];

    for (let i = 0; i < args.length; ++i) {
      const literal = literals[i + 1];
      const placeholder = args[i];

      bindings.push(placeholder);
      string += '?';

      string += literal;
    }

    return new SqlWrapper(string, bindings);
  }
}

function sql(arg0, ...args) {
  if (Array.isArray(arg0) && 'raw' in arg0) {
    return SqlWrapper.fromTemplateString(arg0, args);
  }

  return new SqlWrapper(arg0, args);
}

module.exports = { SqlWrapper, sql };
