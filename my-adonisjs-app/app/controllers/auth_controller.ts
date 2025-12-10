import type { HttpContext } from '@adonisjs/core/http'
import { createUserValidator } from '#validators/auth'
import User from '#models/user'

export default class AuthController {
  indexConnexion({ view }: HttpContext) {
    return view.render('pages/connection')
  }

  indexCreation({ view }: HttpContext) {
    return view.render('pages/creation')
  }

  indexAcc({ view }: HttpContext) {
    return view.render('pages/accueil')
  }

  async handlCreationUser({ request, response }: HttpContext) {
    const { fullName, email, password } = await request.validateUsing(createUserValidator)

    const user = await User.create({ fullName, email, password })

    response.redirect().toRoute('Auth.acc', { user })
  }
}
