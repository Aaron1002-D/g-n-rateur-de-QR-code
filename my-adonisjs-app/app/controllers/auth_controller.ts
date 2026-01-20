import type { HttpContext } from '@adonisjs/core/http'
import { connexionUserValidator, createUserValidator } from '#validators/auth'
import User from '#models/user'
import stringHelpers from '@adonisjs/core/helpers/string'
import Token from '#models/token'
import { DateTime } from 'luxon'
import mail from '@adonisjs/mail/services/main'

export default class AuthController {
  indexPageConnexion({ view }: HttpContext) {
    return view.render('pages/connection')
  }

  indexPageCreation({ view }: HttpContext) {
    return view.render('pages/creation')
  }

  indexpageAccueil({ view }: HttpContext) {
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

    console.log(user.email)

    return response.redirect().toRoute('confirm', { user })
  }

  async confirmEmai({ request, response, view, auth }: HttpContext) {
    const { email, token } = request.qs()

    const tokenRecord = await Token.query().where('token', token).andWhere('email', email).first()

    if (!tokenRecord || tokenRecord.isUsed || tokenRecord.expiresAt <= DateTime.now()) {
      return response.badRequest('Lien invalide ou expiré')
    }

    const user = await User.findBy('email', email)

    if (user) {
      user.isVerified = true
      await user.save()
    }

    await tokenRecord.delete()

    await auth.use('web').login(user)

    return view.render('pages/dashboard', { user })
  }

  async handlConnexion({ request, response, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(connexionUserValidator)

    const user = await User.verifyCredentials(email, password)

    if (!user) {
      return response.redirect().toRoute('landing')
    }

    if (!user.isVerified) {
      return response.redirect().toRoute('landing')
    }

    await auth.use('web').login(user)
    return response.redirect().toRoute('dashboard.page')
  }

  async handlLogout({ response, auth }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('landing')
  }

  // async renvoimail({ response, request, auth }: HttpContext) {
  //   const user = await User.query().where('isVerified', false).first()
  // }
}
