
import { query, body } from 'express-validator';


// Validation middleware for 'getTodos' API
const validateQuery = [
  query('pageNumber').optional().isInt().toInt(),
  query('limit').optional().isInt().toInt(),
  query('order').optional().isIn(['ascending', 'descending']),
  query('status').optional().isIn(['completed']).toBoolean(),
];

// Validation middleware for 'createTodo' API
const validateCreateRequestBody = [
    body('title').notEmpty().isString(),
    body('description').notEmpty().isString()
  ];

// Validation middleware for 'updateTodo' API
  const validateUpdateRequestBody = [
    body('title').optional().isString(),
    body('description').optional().isString(),
    body('status').optional().isBoolean()
  ];

  // Validation middleware for 'registerUser' & 'login' API
  const validateUser=[
     body('email').notEmpty().isEmail(),
     body('password').notEmpty().isString()
  ]

export {validateQuery,validateCreateRequestBody,validateUpdateRequestBody,validateUser}