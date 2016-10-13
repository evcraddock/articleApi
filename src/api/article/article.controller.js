import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Article } from '.'

export const create = (req, res, next) =>
  Article.create(req.body)
    .then((article) => article.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ query, select, cursor }, res, next) =>
  Article.find(query, select, cursor)
    .sort({'publishDate': 'desc'})
    .then((articles) => articles.map((article) => article.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Article.findById(params.id)
    .then(notFound(res))
    .then((article) => article ? article.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ body, params }, res, next) =>
  Article.findById(params.id)
    .then(notFound(res))
    .then((article) => article ? _.merge(article, body).save() : null)
    .then((article) => article ? article.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Article.findById(params.id)
    .then(notFound(res))
    .then((article) => article ? article.remove() : null)
    .then(success(res, 204))
    .catch(next)
