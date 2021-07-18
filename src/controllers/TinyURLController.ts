import express from 'express';

const TinyURLController = express.Router();
import * as HomeService from '../services/TinyURLService';

/* fetch Home */
TinyURLController.get('/encode', HomeService.encode);
TinyURLController.get('/decode/:url', HomeService.decode);
TinyURLController.get('/statistics/:url', HomeService.statistics);
TinyURLController.get('/:url', HomeService.visitUrl);

export default TinyURLController;
