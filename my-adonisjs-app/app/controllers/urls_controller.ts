import type { HttpContext } from '@adonisjs/core/http'
import Url from '#models/url'
import QRCode from 

export default class UrlsController {
  // page d'accueil formulaire
  async homes({ view }: HttpContext) {
    return view.render('/pages/homes')
  }

  //creer un short link + QR code

  async shorten({ request, response }: HttpContext) {
    const originalUrl = request.input('url')

    // generer un code court

    const shortCode = Math.random().toString(36).substring(2, 8)
  }
}
