import { Router } from 'express'
import { master, session } from '../../services/passport'
import { create, show, destroy } from './image.controller'
import busboy from 'connect-busboy'

const router = new Router()

router.post('/:articleId', busboy(), session({ required: true, roles: ['admin'] }), create)

router.get('/:articleId/:filename', show)

router.delete('/:id', session({ required: true, roles: ['admin'] }), destroy)

export default router
