#!/usr/bin/env bash
#
# A script for resetting/creating the database bike-rentals.sqlite
# and starting the simulation in Docker containers.
#

cd backend/db/
./reset_db.bash
cd ../../

docker compose up

