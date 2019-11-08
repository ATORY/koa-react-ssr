/* eslint-disable no-unused-expressions */

class Validator {
  constructor(param = {}, fields = []) {
    this.fields = fields;
    this.param = param;
    this.errors = [];
  }

  check() {
    this.fields.forEach(({ field, required = false }) => {
      const value = this.param[field];
      if (!required) return;
      if (!value) {
        this.errors.push({
          msg: `${field} is empty`,
        });
      }
    });
    return this.errors;
  }
}

module.exports = (category, fields) => async (ctx, next) => {
  switch (category) {
    case 'query': {
      const param = ctx.query;
      const errors = new Validator(param, fields).check();
      if (errors.length !== 0) ctx.throw(400, JSON.stringify(errors));
      else await next();
      break;
    }
    case 'body': {
      const param = ctx.request.body;
      const errors = new Validator(param, fields).check();
      if (errors.length !== 0) ctx.throw(400, JSON.stringify(errors));
      else await next();
      break;
    }
    case 'headers': {
      await next();
      break;
    }
    default:
      await next();
  }
};
