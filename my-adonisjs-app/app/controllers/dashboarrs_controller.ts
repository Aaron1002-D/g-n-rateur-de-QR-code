import type { HttpContext } from '@adonisjs/core/http'
import { rename } from 'fs'

export default class DashboarrsController {
  index({ view }: HttpContext) {
    return view.render('pages/dashboard')
  }
}
