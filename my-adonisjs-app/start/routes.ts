/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.on('/').render('pages/home')

// ROUTE DE CONNECTION ET CREATION USERS ET ACCCUEIL
router
  .get('/connect', [AuthController, 'indexConnexion'])
  .as('Auth.connect')
  .use(middleware.guest())

router
  .get('creation', [AuthController, 'indexCreation'])
  .as('Auth.creation')
  .use(middleware.guest())

router.get('/accueil', [AuthController, 'indexAcc']).as('Auth.acc').use(middleware.auth())

router
  .post('/creation', [AuthController, 'handlCreationUser'])
  .use(middleware.guest())
  .as('Auth.creation')
