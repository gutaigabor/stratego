#!/bin/bash
# MongoDB Entrypoint

echo "MongoDB Entrypoint called"

# run mongod WITHOUT auth
mongod --smallfiles --dbpath /var/lib/mongodb &
sleep 10

# setup
echo "db.system.version.remove({});" | mongo admin
echo "db.system.version.insert({ '_id' : 'authSchema', 'currentVersion' : 3 });" | mongo admin

# add users
echo "db.createUser({user: '${MONGO_INITDB_ROOT_USERNAME}', pwd: '${MONGO_INITDB_ROOT_PASSWORD}', roles: ['root']});" | mongo admin

# create db of connection with index
echo "use connections;" | mongo admin
echo "db.createCollection('user_connections');" | mongo connections
echo "db.user_connections.createIndex({'user_id': 1});" | mongo connections

# shutdown server WITHOUT auth
mongod --dbpath /var/lib/mongodb --shutdown

# execute any further commands
exec "$@"