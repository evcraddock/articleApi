import { Router } from 'express'
import user from './api/user'
import auth from './api/auth'
import article from './api/article'
import link from './api/link'

const router = new Router()

router.use('/users', user)
router.use('/auth', auth)
router.use('/articles', article)
router.use('/links', link)

export default router
