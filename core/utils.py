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
import sys
import os
import socket
import requests
import http.client
import subprocess
from colorama import init, Style, Fore
init()


class utils:
    def __init__(self):
        pass

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

    @staticmethod
    def ngrok_subprocess(port):
        str_ngrok = './ngrok'
        system_type = os.name
        if "nt" in system_type:
            str_ngrok = './ngrok.exe'
        result = subprocess.check_output([str_ngrok, "http", port])
        print(result)

    @staticmethod
    def trape_config(self):
        utils.Go("\033[H\033[J")
        utils.Go("----------------------------------------------------------")
        utils.Go("" + " " + utils.Color['redBold'] + "TRAPE" + utils.Color['white'] +" {" + utils.Color['yellowBold'] + "stable" + utils.Color['white'] + "}" + utils.Color['white'] + " - " + "Configuration zone to use the software" + " " + "<" + utils.Color['white'])
        utils.Go("----------------------------------------------------------")
        utils.Go("| v" + utils.Color['redBold'] + self.version + utils.Color['white'] + " |")
        utils.Go("--------" + "\n")
        utils.Go(utils.Color['whiteBold'] + "GENERAL CONFIG" + utils.Color['white'])
        utils.Go("------")
        utils.Go("Through this section you will configure the resources required \nfor an effective function of trape, please complete the following steps, below. \nKeep in mind that if the data is incorrect this tool will not work." + utils.Color['white'])
        utils.Go("")
        utils.Go(utils.Color['whiteBold'] + "NGROK TOKEN" + utils.Color['white'])
        utils.Go("------")
        utils.Go("In the next section you must enter your Ngrok token, if you do not have \none register at (" + utils.Color['blueBold'] + "https://ngrok.com" + utils.Color['white'] + "), this data is necessary for the generation of public network tunnels.")
        utils.Go("")
        c_nGrokToken = input(utils.Color['blueBold'] + "-" + utils.Color['white'] + " Enter your ngrok token" + " " + utils.Color['yellow'] + ":~> " + utils.Color['white'])
        utils.Go("")
        utils.Go(utils.Color['whiteBold'] + "GOOGLE API" + utils.Color['white'])
        utils.Go("------")
        utils.Go("You must register with the " + utils.Color['blueBold'] + "Google Console" + utils.Color['white'] + ", and get an API for maps and another for shortening. \nBy having these data you complete the settings")
        utils.Go("")
        c_gMapsToken = input(utils.Color['blueBold'] + "-" + utils.Color['white'] + " What is your Google Maps Api Key?" + " " + utils.Color['yellow'] + ":~> " + utils.Color['white'])
        c_gOoglToken = input(utils.Color['blueBold'] + "-" + utils.Color['white'] + " Enter your Goo.gl (shortener) Api Key (leave it empty if you don't have)" + " " + utils.Color['yellow'] + ":~> " + utils.Color['white'])
        utils.Go("")
        utils.Go(utils.Color['whiteBold'] + "IP INFO API" + utils.Color['white'])
        utils.Go("------")
        utils.Go("You must register with the " + utils.Color['blueBold'] + "https://ipgeolocation.io" + utils.Color['white'] + ", and get an API for geolocation. \nBy having these data you complete the settings")
        utils.Go("")
        c_ipinfo = input(utils.Color['blueBold'] + "-" + utils.Color['white'] + " What is your IP Info Api Key?" + " " + utils.Color['yellow'] + ":~> " + utils.Color['white'])
        utils.Go("")
        utils.Go(utils.Color['greenBold'] + "-" + utils.Color['white'] + " Congratulations! " + utils.Color['greenBold'] + "Successful configuration" + utils.Color['white'] + ", now enjoy Trape!" + utils.Color['white'])
        utils.Go("")
        if (c_nGrokToken != '' and c_gMapsToken != ''):
            v = '{\n\t"ngrok_token" : "' + c_nGrokToken + '",\n\t"gmaps_api_key" : "' + c_gMapsToken + '",\n\t"gshortener_api_key" : "' + c_gOoglToken + '",\n\t"ipinfo_api_key" : "' + c_ipinfo + '"\n}'
            f = open ('trape.config', 'w')
            f.write(v)
            f.close()
        else:
            self.trape_config()

    @staticmethod
    def first_time_message():
        utils.Go("\033[H\033[J")
        utils.Go(utils.Color['whiteBold'] + "  @@@@@@@@@@@@@@@@@@@@@@  ")
        utils.Go(utils.Color['whiteBold'] + " @@@@@@@@@@@@@@@@@@@@@@@@ ")
        utils.Go(utils.Color['whiteBold'] + " @@@@@   @@@@@@@@@@@@@@@@ ")
        utils.Go(utils.Color['whiteBold'] + " @@@@@   @@@@@@@@@@@@@@@@ ")
        utils.Go(utils.Color['whiteBold'] + " @@@@@       @@     @@@@@ ")
        utils.Go(utils.Color['whiteBold'] + " @@@@@       @@     @@@@@ ")
        utils.Go(utils.Color['whiteBold'] + " @@@@@    @@@@@@@@@@@@@@@ ")
        utils.Go(utils.Color['whiteBold'] + " @@@@@    @@@@@     @@@@@ ")
        utils.Go(utils.Color['whiteBold'] + " @@@@@       @@     @@@@@ ")
        utils.Go(utils.Color['whiteBold'] + " @@@@@@@@@@@@@@@@@@@@@@@@ ")
        utils.Go(utils.Color['whiteBold'] + " @@@@@@@@@@@@@@@@@@@@@@@@  ")
        utils.Go(utils.Color['whiteBold'] + "  @@@@@@@@@@@@@@@@@@@@@@  ")
        utils.Go("\t" + utils.Color['white'] + "--" + " " + "v" + utils.Color['redBold'] + "2.0" + utils.Color[
            'white'] + " " + "--" + "\n" + utils.Color['white'])
        utils.Go(utils.Color['whiteBold'] + "WELCOME " + utils.Color['greenBold'] + os.uname()[1].upper() + utils.Color[
            'whiteBold'] + " TO TRAPE" + utils.Color['white'])
        utils.Go("------")
        utils.Go("This is a exclusive version for researchers, or professionals \n"
                 + "who are dedicated to research, we hope you enjoy." + "\n")
        utils.Go(utils.Color['whiteBold'] + "DISCLAIMER" + utils.Color['white'])
        utils.Go("------")
        utils.Go("This is a monitoring and research tool " + utils.Color['whiteBold'] + "OSINT" + utils.Color[
            'white'] + ", which is distributed \nfor educational and investigative purposes, the person who has bought \nor uses this tool is responsible for its proper use or actions committed, \n" +
                 utils.Color['whiteBold'] + "Jose Pino" + utils.Color['white'] + " (" + utils.Color[
                     'blue'] + "@jofpin" + utils.Color[
                     'white'] + ") is not responsible for the use Or the scope that people can have \nthrough this software." + "\n")
        utils.Go(utils.Color['whiteBold'] + "CREATOR" + utils.Color['white'])
        utils.Go("------")
        utils.Go(utils.Color["white"] + "- " + utils.Color["greenBold"] + "NAME: " + utils.Color[
            'white'] + "Jose Pino" + " " + utils.Color['white'])
        utils.Go(utils.Color["white"] + "- " + utils.Color["greenBold"] + "DESCRIPTION: " + utils.Color[
            'white'] + "Hacker recognized by large technology companies")
        utils.Go(utils.Color["white"] + "- " + utils.Color["greenBold"] + "GITHUB: " + utils.Color[
            'white'] + "https://github.com/jofpin")
        utils.Go(utils.Color["white"] + "- " + utils.Color["greenBold"] + "TWITTER: " + utils.Color[
            'white'] + "https://twitter.com/jofpin" + utils.Color['white'] + "\n")
        utils.Go("Press enter to Continue...")
        input()


    @staticmethod
    def checkInet():
        c = http.client.HTTPConnection('www.google.com', timeout=5)
        try:
            c.request("HEAD", "/")
            c.close()
            return True
        except Exception:
            c.close()
            utils.Go("\033[H\033[J")
            utils.Go(utils.Color['whiteBold'] + "[" + utils.Color['redBold'] + "x" + utils.Color['whiteBold'] + "]" + utils.Color['redBold'] + " " + "NOTICE: " + utils.Color['white'] + "Trape needs Internet connection for working" + "\n\t")
            return False

    # Banner trape
    @staticmethod
    def banner():
        utils.Go("\033[H\033[J")
        utils.Go("\t" + utils.Color['redBold'] + " _                           ")
        utils.Go("\t" + utils.Color['redBold'] + "| |_   ____ ____ ____   ____ ")
        utils.Go("\t" + utils.Color['redBold'] + "|  _) / ___) _  |  _ \ / _  )")
        utils.Go("\t" + utils.Color['redBold'] + "| |__| |  ( ( | | | | ( (/ / ")
        utils.Go("\t" + utils.Color['redBold'] + " \___)_|   \_||_| ||_/ \____)")
        utils.Go("\t" + utils.Color['redBold'] + "                |_|" + utils.Color['white'] + " 2018 by " +
                 utils.Color['whiteBold'] + "Jose Pino" + utils.Color['white'] + " (" + utils.Color['blue'] + "@jofpin"
                 + utils.Color['white'] + ")" + utils.Color['white'])
        utils.Go("\t" + "-----------------------------------------------")
        utils.Go(utils.Color['green'] + "\t" + "People tracker on internet for OSINT research " + utils.Color['white'] +
                 "|=-" + utils.Color['white'])
        utils.Go("\t" + "-----------------------------------------------")
        utils.Go("\t" + "| " + utils.Color['white'] + "v" + utils.Color['redBold'] + "2.1" + utils.Color['white'] + " |")
        utils.Go("\t" + "--------" + "\n")

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
    def portScanner(victimIP):                  # TODO: rewrite into full port scan
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
