import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Link } from '.'

export const create = ({ body, params }, res, next) =>
  Link.create(body)
    .then((link) => link.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ query, select, cursor }, res, next) => {
  let q = Link.find({}, select, cursor);
  for(var key in query) {
    if (key == 'categories' || key == 'tags') {
      if (Array.isArray(query[key])) {
        q.where(key).in(query[key])
      } else {
        q.where(key).in([query[key]])
      }
    }
    else {
      q.where(key).equals(query[key]);
    }
  }

  q
    .then((links) => links.map((link) => link.view()))
    .then(success(res))
    .catch(next)
  };

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
