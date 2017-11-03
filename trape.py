#!/usr/bin/env python
# -*- coding: utf-8 -*-
#**
#
##########################################
# Trape | People tracker on the Internet #
##########################################
#
# Learn to track the world, to avoid being traced
#
# @version     1.0.0
# @link        https://github.com/boxug/trape
# @author      Jose Pino, @jofpin | Jhonathan Espinosa, @st4nn (Members of Boxug Team)
# @copyright   2017 by boxug / <hey@boxug.com>
#
# This file is the boot in Trape.
# For full copyright information this visit: https://github.com/boxug/trape
#
#**
#
###############################################
                                              #
from core.utils import utils                  #
from core.trape import Trape
from core.db import Database                  
try:                                          #
    import flask                              #
    import flask_socketio                     #
except:                                       ############################################
    utils.Go("\t\nPlease install requirements.txt libraries, you can do it executing:")  #
    utils.Go("\t\npip install -r requirements.txt")  #####################################
######################################################

# We generalize the main class of <trape>
trackPeople = Trape()

# call class database
generateData = Database()

# check OS
trackPeople.loadCheck()

# Request root home to run <trape> with all permissions
trackPeople.rootConnection()

# Call the creation of the database when you open this file.
generateData.loadDatabase()

if __name__ == "__main__":
        try:
        	# General expression this is expressed after the root
        	trackPeople.main()
        except Exception as error:
        	# Result of error
        	utils.Go(utils.Color['white'] + "[" + utils.Color['redBold'] + "x" + utils.Color['white'] + "]" + utils.Color['red'] + " " + "Error:" + " " + utils.Color['white'] + "%s" % error)
