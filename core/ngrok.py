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
import sys
import os
import platform
import subprocess
import os.path as path
from multiprocessing import Process


def download_ngrok(authtoken):
    import urllib.request
    import urllib.parse
    system_type = os.name
    system_name = platform.system()
    system_architecture = platform.architecture()[0]
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
    saved_file = open(filename, "b+w")
    saved_file.write(download.read())
    saved_file.close()

    subprocess.check_output(["unzip", filename])
    os.remove(filename)
    subprocess.check_output(["./ngrok", "authtoken", authtoken])

def start_ngrok(x, _):
    print(subprocess.check_output(["./ngrok", "http", x]))

class Ngrok(object):
    def __init__(self, authtoken, port):
        str_ngrok = './ngrok'
        if not path.exists(str_ngrok):
            if authtoken == "":
                return
            download_ngrok(authtoken)
        pg = Process(target=start_ngrok, args=(str(port), 0))
        pg.start()
