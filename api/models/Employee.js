/**
 * Employee.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    empID: { type: 'number', columnName: 'employeeID',required:true},
    password: { type: 'string', columnName: 'password'},
    fullName:{type:'string', columnName:'fullName'},
    salary:{type:'string', columnName:'salary'},
    tenure:{type:'string', columnName:'tenure'},
    email:{type:'string', columnName:'email'}
   
  },

};

