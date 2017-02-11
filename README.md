# article API
Nodejs Express REST service for serving news articles

To run in docker:
docker-compose up

To create docker image:
docker build -t "mustang-news-service:1.0" .

Build to Dist folder:
npm run build -- will clean, transpose and copy files

Push to cloud foundry:
cf push -- from dist folder
