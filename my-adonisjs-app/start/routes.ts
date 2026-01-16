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
import vine from '@vinejs/vine'
import DashboarrsController from '#controllers/dashboarrs_controller'

router.on('/').render('pages/home')

router
  .get('/confirm', async ({ view }) => {
    return view.render('pages/confirm')
  })
  .as('confirm')

router.get('/dashboard', [DashboarrsController, 'index'])
// ROUTE DE CONNECTION ET CREATION USERS ET ACCCUEIL
router
  .get('/connect', [AuthController, 'indexPageConnexion'])
  .as('Auth.connect')
  .use(middleware.guest())

router
  .get('creation', [AuthController, 'indexPageCreation'])
  .as('Auth.creation')
  .use(middleware.guest())

router.get('/accueil', [AuthController, 'indexpageAccueil']).as('Auth.acc').use(middleware.auth())

router.post('/creation', [AuthController, 'handlCreationUser']).use(middleware.guest())
