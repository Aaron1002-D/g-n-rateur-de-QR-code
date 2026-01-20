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

// ROUTES DE CONNECTION , CREATION ET DECONNEXION USERS
router.get('/connect', [AuthController, 'indexPageConnexion']).as('Auth.connexion')

router.get('/creation', [AuthController, 'indexPageCreation']).as('Auth.creation')

router.get('/accueil', [AuthController, 'indexpageAccueil']).as('Auth.acc')
router.post('/creation', [AuthController, 'handlCreationUser'])
router.get('/connexion', [AuthController, 'handlConnexion'])
router.get('confirm-email', [AuthController, 'confirmEmai']).as('confirm.email')

router.get('/deconnecter', [AuthController, 'handlLogout'])

// ROUTE DE RENVOI DE MAIL SI LE TOKEN N'EST PLUS VALIDE
// router.post('/renvoie', [AuthController, 'renvoimail'])
