import { Router } from 'express'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './link.controller'
import { schema } from './link.model'
export Link, { schema } from './link.model'

const router = new Router()
const { title, linktitle, url, banner, author, categories, tags } = schema.tree

router.post('/',
  master(),
  create)

router.get('/',
  index)

router.get('/:id',
  show)

router.put('/:id',
  master(),
  update)

router.delete('/:id',
  master(),
  destroy)

export default router
