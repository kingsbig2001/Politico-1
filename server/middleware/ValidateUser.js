import HelperUtils from '../utility/helperUltis';
import databaseConnection from '../model/databaseConnection';

/**
 * @class ValidateUser
 * @description Intercepts and validates a given request for user endpoints
 * @exports ValidateUser
 */
class ValidateUser {
  /**
   * @method validateProfileDetails
   * @description Validates profile details of the user upon registration
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static validateProfileDetails(req, res, next) {
    const validate = HelperUtils.validate();
    const {
      firstname, lastname, phonenumber, email, passporturl, password,
    } = req.body;
    let error;
    if (!validate.name.test(firstname)) {
      error = 'You need to include a valid firstname';
    }
    if (!firstname || firstname === undefined) {
      error = 'firstname must be specified';
    }
    if (!validate.name.test(lastname)) {
      error = 'You need to include a valid last name';
    }
    if (!lastname || lastname === undefined) {
      error = 'lastname must be specified';
    }
    if (!validate.phonenumber.test(phonenumber)) {
      error = 'You need to include a valid phone number';
    }
    if (!phonenumber || phonenumber === undefined) {
      error = 'phonenumber must be specified';
    }
    if (!email || !validate.email.test(email)) {
      error = 'You need to include a valid email';
    }
    if (!email || email === undefined) {
      error = 'Email must be specified';
    }
    if (!passporturl || !validate.logoUrl.test(passporturl)) {
      error = 'You need to include a valid passport';
    }
    if (password === '' || typeof password === 'undefined') {
      error = 'Password must be specified';
    }
    if (!password) {
      error = 'Password field cannot be empty';
    }
    if (!validate.hqAddress.test(password)) {
      error = 'Password is invalid';
    }
    if (error) {
      return res.status(400).json({ status: 400, error });
    }
    if (password.length < 5) {
      error = 'Password strength is too low';
      return res.status(400).json({ status: 400, error });
    }

    return next();
  }

  /**
   * @method validateLoginDetails
   * @description Validates login details (email and password) of a user upon login/registration
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static validateLoginDetails(req, res, next) {
    const validate = HelperUtils.validate();
    const { email, password } = req.body;
    const path = req.url.trim().split('/')[2];
    let error;
    let status;

    const query = 'SELECT id, email, password, isadmin FROM users WHERE email = $1';

    if (!validate.email.test(email)) {
      error = 'The email you provided is invalid';
    } if (!password) {
      error = 'You need to provide a password';
    } if (error) {
      status = 404;
      return res.status(status).json({ status, error });
    }

    if (path === 'login') {
      return databaseConnection.query(query, [email], (err, dbRes) => {
        if (dbRes.rowCount < 1) {
          return res.status(404).json({
            status: 404,
            error: 'Sorry, the email account you provided does not exist',
          });
        }

        const hashedPassword = dbRes.rows[0].password;
        const verifyPassword = HelperUtils.verifyPassword(`${password}`, hashedPassword);
        if (!verifyPassword) {
          error = 'Sorry, the password for the given email is incorrect';
          status = 401;
        }
        if (error) {
          return res.status(status).json({ status, error });
        }

        const userReq = dbRes.rows[0];
        req.user = { id: userReq.id, email: userReq.email, isadmin: userReq.isadmin };
        return next();
      });
    }

    return next();
  }

  /**
   * @method validateExistingUser
   * @description Validates user login/registration
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static validateExistingUser(req, res, next) {
    const userEmail = {
      text: 'SELECT * FROM users WHERE email = $1;',
      values: [req.body.email],
    };
    return databaseConnection.query(userEmail, (error, dbRes) => {
      if (dbRes.rows[0]) {
        return res.status(409).json({
          status: 409,
          error: 'User with email already exist',
        });
      }
      return next();
    });
  }
}

export default ValidateUser;
