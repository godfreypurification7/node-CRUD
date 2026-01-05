const Joi = require('joi');

exports.signupSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(60)
    .required()
    .email({ tlds: { allow: ['com', 'net'] } }),

  password: Joi.string()
    .required()
    .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/))
    .messages({
      'string.pattern.base': 'Password must contain uppercase, lowercase, number, special character and be at least 8 characters long'
    })
});

exports.signinSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(60)
    .required()
    .email({ tlds: { allow: ['com', 'net'] } }),

  password: Joi.string()
    .required()
    .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/))
    .messages({
      'string.pattern.base': 'Password must contain uppercase, lowercase, number, special character and be at least 8 characters long'
    })
});

exports.acceptCodeSchema=Joi.object({
    email: Joi.string()
    .min(6)
    .max(60)
    .required()
    .email({ tlds: { allow: ['com', 'net'] }, 
    }),
    providedCode:Joi.number().required()

});

exports.changePasswordSchema = Joi.object({
  oldPassword: Joi.string()
    .required()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)
    .messages({
      'string.pattern.base':
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character',
    }),

  newPassword: Joi.string()
    .required()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)
    .messages({
      'string.pattern.base':
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character',
    }),
});
exports.acceptFPCodeSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(60)
    .required()
    .email({ tlds: { allow: ['com', 'net'] } }),
  providedCode: Joi.number().required(),
  newPassword: Joi.string()
    .required()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$'))
});

exports.createPostSchema = Joi.object({
  title: Joi.string()
    .min(6)
    .max(60)
    .required()
  ,
  description: Joi.string()
    .min(6)
    .max(600)
    .required()
    ,
    userId:Joi.string().required(),
});
