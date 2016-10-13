import { Router } from 'express'
import { login } from './auth.controller'
import { basic, master } from '../../services/passport'

const router = new Router()

router.post('/',
  master(),
  basic(),
  login)

export default router
