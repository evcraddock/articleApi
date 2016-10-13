import { Router } from 'express'
import { basic, master, session } from '../../services/passport'
import { index, showMe, show, create, update, updatePassword, destroy } from './user.controller'
import { schema } from './user.model'
export User, { schema } from './user.model'

const router = new Router()
const { email, password, name, picture, role } = schema.tree

router.get('/',
  session({ required: true, roles: ['admin'] }),
  index)

router.get('/me',
  session({ required: true }),
  showMe)

router.get('/:id',
  show)

router.post('/',
  master(),
  create)

router.put('/:id',
  session({ required: true }),
  update)

router.put('/:id/password',
  basic(),
  updatePassword)

router.delete('/:id',
  session({ required: true, roles: ['admin'] }),
  destroy)

export default router
