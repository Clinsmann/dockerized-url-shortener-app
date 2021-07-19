import express from 'express';

const TinyURLController = express.Router();
import * as TinyURLService from '../services/TinyURLService';

/* fetch Home */
TinyURLController.get('', TinyURLService.healthCheck);
TinyURLController.get('/encode', TinyURLService.encode);
TinyURLController.get('/decode/:url', TinyURLService.decode);
TinyURLController.get('/statistics/:url', TinyURLService.stats);
TinyURLController.get('/:url', TinyURLService.visitUrl);

export default TinyURLController;
