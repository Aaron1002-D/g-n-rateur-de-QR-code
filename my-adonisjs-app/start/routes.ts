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

router.on('/').render('pages/home').as('landing')

router
  .get('/confirm', async ({ view }) => {
    return view.render('pages/confirm')
  })
  .as('confirm')

router
  .get('/dashboard', [DashboarrsController, 'index'])
  .as('dashboard.page')
  .use(middleware.auth())
// ROUTE DE CONNECTION ET CREATION USERS ET ACCCUEIL
router.get('/connect', [AuthController, 'indexPageConnexion']).as('Auth.connexion')

router.get('/creation', [AuthController, 'indexPageCreation']).as('Auth.creation')

router.get('/accueil', [AuthController, 'indexpageAccueil']).as('Auth.acc').use(middleware.auth())

router.post('/creation', [AuthController, 'handlCreationUser']).use(middleware.guest())
router.post('/connexion', [AuthController, 'handlConnexion']).use(middleware.guest())
router
  .get('confirm-email', [AuthController, 'confirmEmai'])
  .as('confirm.email')
  .use(middleware.guest())
