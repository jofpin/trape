user:~$ python3 trape.py --help
usage: python3 trape.py -u <> -p <> [-h] [-v] [-u URL] [-p PORT]
                                              [-ak ACCESSKEY] [-l LOCAL]
                                              [--update] [-n] [-ic INJC]

optional arguments:
  -h, --help            show this help message and exit
  -v, --version         show program's version number and exit
  -u URL, --url https://youtube.com/shorts/jRjVaw1Idhg?si=cPovyN7y1CF1c64j URL     Put the web page url to clone
  -p PORT, --port 8080 PORT  Insert your port
  -ak ACCESSKEY, --accesskey ACCESSKEY
                        Insert your custom key access
  -l LOCAL, --local LOCAL
                        Insert your home file
  -n, --ngrok https://ngrok.com/          Insert your ngrok Authtoken
  -ic INJC, --injectcode INJC
                        Insert your custom REST API path
  -ud UPDATE, --update UPDATE
                        Update trape to the latest version
