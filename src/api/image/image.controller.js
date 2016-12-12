import { success, notFound, servererror } from '../../services/response/'
import { view, upload, remove } from './image.model'

export const create = (req, res, next) => 
  upload(req)
  .then(success(res, 201))
  .catch(servererror(res))

export const show = ({ params }, res, next) => 
  view(params.id)
  .then((file) => {
      res.set('Content-Type', file.contentType);
      res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');

      file.imagestream.pipe(res);
  })
  .then(success(res, 200))
  .catch(servererror(res))

export const destroy = ({ params }, res, next) => 
    remove(params.id)
    .then(success(res, 204))
    .catch(servererror(res));