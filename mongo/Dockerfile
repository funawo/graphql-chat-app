FROM mongo
COPY scripts/createUser.js /docker-entrypoint-initdb.d/
ENV MONGO_INITDB_ROOT_USERNAME=admin
ENV MONGO_INITDB_ROOT_PASSWORD=admin
ENV MONGO_INITDB_DATABASE=chat_app

CMD ["mongod", "--auth"]
