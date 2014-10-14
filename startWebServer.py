#!/usr/bin/python

import SimpleHTTPServer
import SocketServer
import os

os.chdir("app")

SimpleHTTPServer.SimpleHTTPRequestHandler.extensions_map['.webapp'] = 'application/x-web-app-manifest+json'
httpd = SocketServer.TCPServer(("", 3000), SimpleHTTPServer.SimpleHTTPRequestHandler)
httpd.serve_forever()