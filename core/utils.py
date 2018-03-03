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
import random
import hashlib
import threading
import sys
import os
import socket
import time

class utils:
    # Functions 1to get is right
    def __init__(self):
        pass

    # Simplification print
    @staticmethod
    def Go(string):
        print string

    # All color for design terminal UI
    Color = {
      "purple": "\033[95m",
      "purpleBold": "\033[01;95m",
      "cyan": "\033[36m",
      "cyanBold": "\033[01;36m",
      "blue": "\033[94m",
      "blueBold": "\033[01;34m",
      "red": "\033[91m",
      "redBold": "\033[01;31m",
      "green": "\033[92m",
      "greenBold": "\033[01;32m",
      "white": "\033[0m",
      "whiteBold": "\033[01;37m",
      "yellow": "\033[93m",
      "yellowBold": "\033[01;33m"
    }

    # Text in bold, lines and end.
    Text = {
      "underline": "\033[4m",
      "bold": "\033[1m",
      "end": "\033[0m"
    }

    # Banner trape
    @staticmethod
    def banner():
        utils.Go("\033[H\033[J")
        utils.Go("\t" + utils.Color['redBold'] + " _                           ")
        utils.Go("\t" + utils.Color['redBold'] + "| |_   ____ ____ ____   ____ ")
        utils.Go("\t" + utils.Color['redBold'] + "|  _) / ___) _  |  _ \ / _  )")
        utils.Go("\t" + utils.Color['redBold'] + "| |__| |  ( ( | | | | ( (/ / ")
        utils.Go("\t" + utils.Color['redBold'] + " \___)_|   \_||_| ||_/ \____)")
        utils.Go("\t" + utils.Color['white'] + "  v1.0.0     " + utils.Color['redBold'] + "   |_|" + utils.Color['white'] + "by " + utils.Color['blue'] + "@boxug" + utils.Color['white'])
        utils.Go("\t" + "------------------------------")
        utils.Go(utils.Color['green'] + "\t" + "People tracker on the Internet" + utils.Color['white'])
        utils.Go("\t" + "------------------------------" + "\n")

    # Loader with console cleaning and OS checking    
    @staticmethod
    def checkOS():
        if "linux" in sys.platform or sys.platform == "darwin":
            os.system("clear")
            utils.Go("Loading" + " " + utils.Color['blue'] + "trape" + utils.Color['white'] + "...")
            time.sleep(0.4)
            pass
        elif "win" in sys.platform:
            os.system("cls")
            utils.Go("Currently there is no support for Windows.")
        else:
            pass

    # Generates a unique token of up to 30 characters.
    @staticmethod
    def generateToken(length=8):
        chars = list('ABCDEFGHIJKLMNOPQRSTUVWYZabcdefghijklmnopqrstuvwyz01234567890')
        random.shuffle(chars)
        chars = ''.join(chars)
        sha1 = hashlib.sha1(chars.encode('utf8'))
        token = sha1.hexdigest()
        return token[:length]

    # Simple port scan for the victim or user    
    @staticmethod
    def portScanner(victimIP):
        clientIP = socket.gethostbyname(victimIP)
        listPorts = [0, 21, 22, 23, 80, 8080, 3389]
        results = []
        for port in listPorts:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(0.1)
            result = sock.connect_ex((clientIP, port))
            sys.stdout.flush()
            if result == 0:
                results.append(str(port))
        return ",".join(results)

    # Local port check to allow trape to run    
    @staticmethod
    def checkPort(port):
        clientIP = socket.gethostbyname('127.0.0.1')
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(0.1)
        result = sock.connect_ex((clientIP, port))
        sys.stdout.flush()
        if result == 0:
            return False
        else:
            return True
