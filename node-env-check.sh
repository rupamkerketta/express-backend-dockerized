#!/usr/bin/bash

if [ "$NODE_ENV" = "development" ]; then
    echo "NPM INSTALL DEV ..."
    npm install
else
    echo "NPM INSTALL PRODUCTION ..."
    npm install --only=production
fi