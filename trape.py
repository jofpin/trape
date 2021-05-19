#!/usr/bin/env python3.8
# -*- coding: utf-8 -*-
# **
#
##########################################
# Trape | People tracker on the Internet #
##########################################
#
# Learn to track the world, to avoid being traced
#
# @version     2.1
# @link        https://github.com/jofpin/trape
# @author      Jose Pino (@jofpin)
# @copyright   2018 by Jose Pino / <jofpin@gmail.com>
#
# This file is the boot in Trape.
# For full copyright information this visit: https://github.com/jofpin/trape
#
# **
#
###############################################

from flask_socketio import SocketIO
from core.utils import utils  #
from core import trape, db, app

try:
    import flask
    import flask_socketio
    import os
except:
    utils.Go("\t\nPlease install requirements.txt libraries, you can do it executing:")
    utils.Go("\t\npip install -r requirements.txt")


if __name__ == "__main__":
    trape.load_config()
    trape.process_arguments()

    if db.firstTime:
        db.create_database()
        utils.first_time_message()
    trape.header()
    import core.user
    import core.stats
    from core.sockets import Sockets
    socketio = SocketIO(app)
    socketio.on_namespace(Sockets('/trape'))
    try:
        socketio.run(app, host='0.0.0.0', port=trape.app_port, debug=False)
    except KeyboardInterrupt:
        socketio.stop()
        exit(0)


