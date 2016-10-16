import { Router } from 'express'
import { master, session } from '../../services/passport'
import { create, index, show, update, destroy } from './link.controller'
import { schema } from './link.model'
export Link, { schema } from './link.model'

const router = new Router()
const { title, linktitle, url, banner, author, categories, tags } = schema.tree

router.post('/',
  session({ required: true, roles: ['admin'] }),
  create)

router.get('/',
  index)

router.get('/:id',
  show)

router.put('/:id',
  session({ required: true, roles: ['admin'] }),
  update)

router.delete('/:id',
  session({ required: true, roles: ['admin'] }),
  destroy)

export default router
