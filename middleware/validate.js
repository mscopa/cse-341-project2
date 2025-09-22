const validator = require('../helpers/validate');

const saveParticipant = (req, res, next) => {
  const validationRule = {
    first_name: 'required|string|max:50',
    last_name: 'required|string|max:50',
    birthday: 'required|string',
    gender: 'required|in:male,female,other',
    email: 'required|email',
    tshirt_size: 'required|in:XS,S,M,L,XL,XXL',
    approval_status: 'required|in:approved,pending,rejected',
    stake: 'required|string|max:100',
    ward: 'required|string|max:100',
    attended: 'boolean',
    bishop_email: 'required|email',
    bishop_name: 'required|string|max:100',
    is_member: 'boolean'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveParticipant
};