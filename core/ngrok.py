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
import sys
import os, platform
import subprocess
import socket
import os.path as path
from multiprocessing import Process

class ngrok(object):
	def __init__(self, authtoken, port, nT, hash):
		if authtoken:
			self.token = authtoken
		else:
			print("Can't use Ngrok without a valid token")
		system_type = os.name
		system_name = platform.system()
		system_architecture = platform.architecture()[0]

		str_ngrok = './ngrok'
		if "nt" in system_type:
			str_ngrok = './ngrok.exe'
		
		if path.exists(str_ngrok):
			pass
		else:
			import urllib.request, urllib.error, urllib.parse

			if "posix" in system_type:
				if "arwin" in system_name:
					if "64" in system_architecture:
						download_link = "https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-darwin-amd64.zip"
					else:
						download_link = "https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-darwin-386.zip"
				else:
					if "64" in system_architecture:
						download_link = "https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip"
					else:
						download_link = "https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-386.zip"
			elif "nt" in system_type:
				if "64" in system_architecture:
					download_link = "https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-windows-amd64.zip"
				else:
					download_link = "https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-windows-386.zip"
			else:
				sys.exit(0)
            
			filename = "ngrok.zip"
			
			download = urllib.request.urlopen(download_link)
			saved_file=open(filename,"b+w")
			saved_file.write(download.read())
			saved_file.close()
			
			result = subprocess.check_output(["unzip", filename]) 
			os.remove(filename)

		subprocess.check_output([str_ngrok, "authtoken", authtoken]) 
		
		if nT > 0:
			pNg = Process(target=start_ngrok, args=(str(port), hash, 1))
			pNg.start()

def start_ngrok(port, hash, f=0):
	if f != 0:
		str_ngrok = './ngrok'
		system_type = os.name
		if "nt" in system_type:
			str_ngrok = './ngrok.exe'
		result = subprocess.check_output([str_ngrok, "http", port])
		print(result)
