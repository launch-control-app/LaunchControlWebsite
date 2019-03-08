/* Creation Date: Saturday, March 2nd 2019
 * Original Author: Nathan 
 * Contents of file: JWT auth secret
 */
module.exports = {
    secret: process.env.JWTSECRET || 'test-jwt-secret',
};