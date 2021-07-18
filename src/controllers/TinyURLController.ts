import express from 'express';

const HomeController = express.Router();
import * as HomeService from '../services/HomeService';

/* fetch Home */
HomeController.get('/encode', HomeService.encode);
HomeController.get('/decode/:url', HomeService.decode);
HomeController.get('/statistics/:url', HomeService.statistics);
HomeController.get('/:url', HomeService.visitUrl);

export default HomeController;
