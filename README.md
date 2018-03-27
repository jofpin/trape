trape (community)
========

People tracker on the Internet: Learn to track the world, to avoid being traced.

---
Trape is a recognition tool that allows you to **track people**, the information you can get is very detailed. We want to teach the world through this, as large Internet companies could monitor you, obtaining information beyond your IP.

![--trape header](https://i.imgur.com/Y0wAPO9.png)

Some benefits
-----------
* One of its most enticing functions is the remote recognition of sessions. You can know where a person has logged in, remotely. This occurs through a Bypass made to the **Same Origin Policy** (**SOP**)
* Currently you can try everything from a web interface. (**The console, becomes a preview of the logs and actions**)
* Registration of victims, requests among other data are obtained in real time.
* If you get more information from a person behind a computer, you can generate a more direct and sophisticated attack. Trape was used at some point to track down criminals and know their **behavior**.
* You can do real time phishing attacks
* Simple hooking attacks
* Mapping
* Important details of the objective
* Capturing credentials
* Open Source Intelligence (**OSINT**)

Recognizes the sessions of the following services
-------
* Facebook
* Twitter
* VK
* Reddit
* Gmail
* tumblr
* Instagram
* Github
* Bitbucket
* Dropbox
* Spotify
* PayPal
* Amazon
* Foursquare (*new*)
* Airbnb (*new*)
* Hackernews (*new*)
* Slack (*new*)
 
How to use it
-------
 First unload the tool.
```
git clone https://github.com/boxug/trape.git
cd trape
python trape.py -h
```
If it does not work, try to install all the libraries that are located in the file **requirements.txt**
```
pip install -r requirements.txt
```

Example of execution
```
Example: python trape.py --url http://example.com --port 8080
```
* In the option **--url** you must put the lure, can be a news page, an article something that serves as a presentation page.
* In the **--port** option you just put the port where you want it to run
* Do you like to monitor your people? Everything is possible with Trape
* Do you want to perform phishing attacks? Everything is possible with Trape
* In the Files directory, located on the path: **/static/files** here you add the files with .exe extension or download files sent to the victim.

Here are some simple videos to use:
-------
**Spanish**: https://www.youtube.com/watch?v=ptyuCQmMKiQ

**English**: https://www.youtube.com/watch?v=FdwyIZhUx3Y

At an international security event in Colombia, called **DragonJAR Security Conference** 2017, a demonstration was made before the launch. You can watch the video here: [https://www.youtube.com/watch?v=vStSEsznxgE](https://www.youtube.com/watch?v=vStSEsznxgE)

Disclaimer
-------
This tool has been published educational purposes in order to teach people how bad guys could track them or monitor them or obtain information from their credentials, we are not responsible for the use or the scope that may have the People through this project.

We are totally convinced that if we teach how vulnerable things are, we can make the Internet a safer place.

Developers or participants
-------
The following people are part of the core of development and research in
Boxug.

This development and others, the participants will be mentioned with name, Twitter and charge.

* Jose Pino - [@jofpin](https://twitter.com/jofpin) - (**Founder at [boxug](https://boxug.com)**) 

Standard Version
-------
Yes, we also have a standard version with more sophisticated features. If you would like to get the standard version or request contact us at hey@boxug.com

Purchase here: https://trape.co

Happy hacking!
-------
I invite you, if you use this tool helps to share, collaborate. Let's make the Internet a safer place, let's report.

-------------


## License

The content of this project itself is licensed under the [Creative Commons Attribution 3.0 license](http://creativecommons.org/licenses/by/3.0/us/deed.en_US), and the underlying source code used to format and display that content is licensed under the [MIT license](http://opensource.org/licenses/mit-license.php).

Copyright, 2017 by [boxug](https://boxug.com) - First Your Security

-------------
