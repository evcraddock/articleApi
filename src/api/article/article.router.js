import { Router } from 'express'
import { master, session } from '../../services/passport'
import { create, index, show, update, destroy } from './article.controller'
import { schema } from './article.model'
export Article, { schema } from './article.model'

const router = new Router()
const { title, url, publishDate, content, banner, author, categories, tags } = schema.tree

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
