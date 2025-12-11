import type { HttpContext } from '@adonisjs/core/http'
import { createUserValidator } from '#validators/auth'
import User from '#models/user'
import stringHelpers from '@adonisjs/core/helpers/string'
import Token from '#models/token'
import { DateTime } from 'luxon'
import mail from '@adonisjs/mail/services/main'

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

    const user = await User.create({ fullName, email, password, isVerified: false })

    const token = stringHelpers.generateRandom(64)
    const url = `http://localhost:3333/confirm-email?token=${token}&email=${email}`

    await Token.create({
      token: token,
      email: email,
      expiresAt: DateTime.now().plus({ minute: 20 }),
    })

    await mail.send((message) => {
      message
        .to(user.email)
        .from('noreply@rac.cd')
        .subject('Confirmation de creation')
        .htmlView('email/confirm-email', { user, url })
    })

    return response.redirect().toRoute('confirm')
  }
}
