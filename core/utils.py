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
import random
import hashlib
import threading
import sys
import os
import socket
import time
import requests, json
from colorama import init , Style,Fore
import http.client
init()

class utils:
    # Functions 1to get is right
    def __init__(self):
        pass

    # Simplification print
    @staticmethod
    def Go(string):
        print(string)

    # All color for design terminal UI
    Color = {
      "cyan": Style.NORMAL+Fore.CYAN,
      "cyanBold": Style.BRIGHT+Fore.CYAN,
      "blue": Fore.BLUE,
      "blueBold": Style.BRIGHT+Fore.BLUE,
      "red": Style.NORMAL+Fore.RED,
      "redBold": Style.BRIGHT+Fore.RED,
      "green": Style.NORMAL+Fore.GREEN,
      "greenBold": Style.BRIGHT+Fore.GREEN,
      "white": Style.NORMAL+Fore.WHITE,
      "whiteBold": Style.BRIGHT+Fore.WHITE,
      "yellow": Style.NORMAL+Fore.YELLOW,
      "yellowBold": Style.BRIGHT+Fore.YELLOW
    }

    # Text in bold, lines and end.
    Text = {
      "underline": Style.NORMAL+Fore.YELLOW,
      "bold": Style.BRIGHT,
      "end": Style.NORMAL+Fore.WHITE
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
        utils.Go("\t" + utils.Color['redBold'] + "                |_|" + utils.Color['white'] + " 2018 by " + utils.Color['whiteBold'] + "Jose Pino" + utils.Color['white'] + " (" + utils.Color['blue'] + "@jofpin" + utils.Color['white'] + ")" + utils.Color['white'])
        utils.Go("\t" + "-----------------------------------------------")
        utils.Go(utils.Color['green'] + "\t" + "People tracker on internet for OSINT research " + utils.Color['white'] + "|=-" + utils.Color['white'])
        utils.Go("\t" + "-----------------------------------------------")
        utils.Go("\t" + "| " + utils.Color['white'] + "v" + utils.Color['redBold'] + "2.1" + utils.Color['white'] + " |")    
        utils.Go("\t" + "--------" + "\n")

    # Loader with console cleaning and OS checking    
    @staticmethod
    def checkOS():
        if "posix" in os.name:
            os.system("clear")
            pass
        elif "nt" in os.name:
            pass
            #os.system("cls")
            #utils.Go("Currently there is no support for Windows.")
        else:
            pass
        utils.Go("Loading" + " " + utils.Color['blue'] + "trape" + utils.Color['white'] + "...")
        time.sleep(0.4)

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
        listPorts = [0, 21, 22, 23, 25, 42, 43, 53, 67, 79, 80, 102, 110, 115, 119, 123, 135, 137, 143, 161, 179, 379, 389, 443, 445, 465, 636, 993, 995, 1026, 1080, 1090, 1433, 1434, 1521, 1677, 1701, 1720, 1723, 1900, 2409, 2082, 2095, 3101, 3306, 3389, 3390, 3535, 4321, 4664, 5190, 5500, 5631, 5632, 5900, 65535, 7070, 7100, 8000, 8080, 8880, 8799, 9100]
        results = []
        for port in listPorts:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(0.2)
            result = sock.connect_ex((clientIP, port))
            sys.stdout.flush()
            if result == 0:
                results.append(str(port))
        return ",".join(results)

    # Local port check to allow trape to run    
    @staticmethod
    def checkPort(port):
        try:
            clientIP = socket.gethostbyname('127.0.0.1')
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(0.1)
            result = sock.connect_ex((clientIP, port))
            sys.stdout.flush()
            if result == 0:
                return False
            else:
                try:
                    if int(port) > 0 and int(port) < 65535:
                        return True
                    else:
                        return False
                except Exception as e:
                    return False
        except Exception as e:
            return False

    @staticmethod
    def checkUrl(url):
        c = http.client.HTTPConnection(url, timeout=5)
        try:
            c.request("HEAD", "/")
            c.close()
            return True
        except Exception as e:
            c.close()
            return False

    # Goo.gl shortener service
    @staticmethod
    def gShortener(api_key, p_url):
        url = "https://www.googleapis.com/urlshortener/v1/url?key=" + api_key
        payload = '{"longUrl":"' + p_url + '"}'
        headers = {'content-type': 'application/json'}
        r = requests.post(url, data=payload, headers=headers)
        return r

    # Autocompletion
    @staticmethod
    def niceShell(text, state):
        matches = [i for i in commands if i.startswith(text)]
        if state < len(matches):
            return matches[state]
        else:
            return None
