import HelperUtils from '../utility/helperUltis';
import partyDb from '../model/partyModel';


/**
 * @class Validate
 * @description Intercepts and validates a given request for parties endpoints
 * @exports Validate
 */

export default class Validate {
  /**
         * @description Get a specific party by id
         * @param {object} req - The request object
         * @param {object} res - The response object
         * @param {function} next - Calls the next function
         * @returns {object} JSON representing the failure message
         * @memberof findById
         */
  static findById(req, res, next) {
    const { id } = req.params;
    if (!Number(id)) {
      return res.status(400).json({
        status: 400,
        error: 'Such endpoint does not exist',
      });
    }
    const foundParty = partyDb.find(party => party.id === Number(id));
    if (!foundParty) {
      return res.status(404).json({
        status: 404,
        error: 'Party Id does not exist',
      });
    }
    return next();
  }

  /**
     * @method validateHqAddress
     * @description Ensures HqAddress is not empty or has character length of >= 10
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} JSON API Response
     */
  static validateHqAddress(req, res, next) {
    const validate = HelperUtils.validate();
    let error = '';
    const { hqAddress } = req.body;

    if (!validate.hqAddress.test(hqAddress)) {
      error = 'Invalid hqAddress format';
    }
    if (!hqAddress || hqAddress === undefined) {
      error = 'hqAddress must be specified';
    }
    if (error) {
      return res.status(404).json({
        status: 404,
        error,
      });
    }
    return next();
  }

  /**
    * @method validateLogoUrl
    * @description Validates LogoUrl passed in the request body
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @returns {object} JSON API Response
    */
  static validateLogoUrl(req, res, next) {
    const validate = HelperUtils.validate();
    let error = '';
    const { logoUrl } = req.body;

    if (!validate.logoUrl.test(logoUrl)) {
      error = 'Invalid party logo';
    }
    if (!logoUrl || logoUrl === undefined) {
      error = 'Logo must be specified';
    }
    if (error) {
      return res.status(404).json({
        status: 404, error,
      });
    }

    return next();
  }

  /**
    * @method validateOfficeType
    * @description Validates Office type passed in the request body
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @returns {object} JSON API Response
    */
  static validateOfficeType(req, res, next) {
    const validate = HelperUtils.validate();
    let error = '';
    const { type } = req.body;
    if (!validate.type.test(type)) {
      error = 'Invalid office type';
    }
    if (!type || type === undefined) {
      error = 'Type must be specified';
    }
    if (error) {
      return res.status(404).json({
        status: 404, error,
      });
    }
    return next();
  }

  /**
    * @method validateName
    * @description Validates firstName passed in the request body
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @returns {object} JSON API Response
    */
  static validateName(req, res, next) {
    const validate = HelperUtils.validate();
    let error = '';
    const { name } = req.body;
    if (!validate.name.test(name)) {
      error = 'Invalid name';
    }
    if (!name || name === undefined) {
      error = 'Party name must be specified';
    }
    if (error) {
      return res.status(404).json({
        status: 404, error,
      });
    }
    return next();
  }

  /**
    * @method validateNames
    * @description Validates firstName passed in the request body
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @returns {object} JSON API Response
    */
  static validateNames(req, res, next) {
    const validate = HelperUtils.validate();
    let error = '';
    const { firstName, lastName } = req.body;
    if (!validate.name.test(firstName)) {
      error = 'Invalid name';
    }
    if (!firstName || firstName === undefined) {
      error = 'Firstname must be specified';
    }
    if (!validate.name.test(lastName)) {
      error = 'Invalid name';
    }
    if (!lastName || lastName === undefined) {
      error = 'Firstname must be specified';
    }
    if (error) {
      return res.status(404).json({
        status: 404, error,
      });
    }
    return next();
  }

  /**
    * @method validatePhoneNumber
    * @description Validates Office type passed in the request body
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @returns {object} JSON API Response
    */
  static validatePhoneNumber(req, res, next) {
    const validate = HelperUtils.validate();
    let error = '';
    const { phoneNumber } = req.body;
    if (!validate.phoneNumber.test(phoneNumber)) {
      error = 'Invalid phonenumber';
    }
    if (!phoneNumber || phoneNumber === undefined) {
      error = 'Phonenumber must be specified';
    }
    if (error) {
      return res.status(400).json({
        status: 400, error,
      });
    }
    return next();
  }

  /**
    * @method validatePassportUrl
    * @description Validates LogoUrl passed in the request body
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    * @returns {object} JSON API Response
    */
  static validatePassportUrl(req, res, next) {
    const validate = HelperUtils.validate();
    let error = '';
    const { passportUrl } = req.body;

    if (!validate.logoUrl.test(passportUrl)) {
      error = 'Invalid passport';
    }
    if (!passportUrl || passportUrl === undefined) {
      error = 'Passport must be specified';
    }
    if (error) {
      return res.status(400).json({
        status: 400, error,
      });
    }

    return next();
  }
}
