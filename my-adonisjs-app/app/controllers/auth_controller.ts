import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  indexConnexion({ view }: HttpContext) {
    return view.render('pages/connection')
  }

  indexCreation({ view }: HttpContext) {
    return view.render('pages/creation')
  }
}
