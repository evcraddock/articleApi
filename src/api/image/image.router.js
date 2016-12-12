import { Router } from 'express'
import { master, session } from '../../services/passport'
import { create, show, destroy } from './image.controller'
import busboy from 'connect-busboy'

const router = new Router()

router.post('/',
	busboy(),
  	session({ required: true, roles: ['admin'] }),
  	create)

router.get('/:id',
  show)

router.delete('/:id',
  session({ required: true, roles: ['admin'] }),
  destroy)

export default router
