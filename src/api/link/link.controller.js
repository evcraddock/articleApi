import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Link } from '.'

export const create = ({ body, params }, res, next) =>
  Link.create(body)
    .then((link) => link.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ query, select, cursor }, res, next) =>
  Link.find(query, select, cursor)
    .then((links) => links.map((link) => link.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Link.findById(params.id)
    .then(notFound(res))
    .then((link) => link ? link.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
  Link.findById(params.id)
    .then(notFound(res))
    .then((link) => link ? _.merge(link, body).save() : null)
    .then((link) => link ? link.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Link.findById(params.id)
    .then(notFound(res))
    .then((link) => link ? link.remove() : null)
    .then(success(res, 204))
    .catch(next)
