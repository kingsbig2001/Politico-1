import express from 'express';
import PartyController from '../controller/PartyController';
import Validate from '../middleware/Validator';
import OfficeController from '../controller/OfficeController';
import UserController from '../controller/UserController';
import ValidateUser from '../middleware/ValidateUser';

const router = express.Router();

// Handle all Post request
router.post('/parties', Validate.validateHqAddress, Validate.validateLogoUrl, Validate.validateName, PartyController.createParty);
router.post('/offices', Validate.validateOfficeType, Validate.validateOfficeName,
  OfficeController.createOffice);
router.post('/auth/signup', ValidateUser.validateExistingUser, ValidateUser.validateLoginDetails, ValidateUser.validateProfileDetails,
  UserController.registerUser);

//  Handle all Get request
router.get('/parties', PartyController.getAllParty);
router.get('/parties/:id', Validate.findById, PartyController.getPartyById);
router.get('/offices', OfficeController.getAllOffice);
router.get('/offices/:id', Validate.findById, OfficeController.getOfficeById);

//  Handle all Patch request
router.patch('/parties/:id/name', Validate.findById, PartyController.updateName);

//  Handles all delete request
router.delete('/parties/:id', Validate.findById, PartyController.deletePartyById);

export default router;
