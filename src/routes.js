import { Router } from 'express'
import user from './api/user'
import auth from './api/auth'
import article from './api/article'
import link from './api/link'
import image from './api/image'

const router = new Router()

router.use('/users', user)
router.use('/auth', auth)
router.use('/articles', article)
router.use('/links', link)
router.use('/images', image)

export default router
