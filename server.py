#!/usr/bin/env python3

from http.server import BaseHTTPRequestHandler, HTTPServer


class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/plain')
        self.end_headers()
        self.wfile.write(b"Hello, world cambiado!\n")
        return


httpd = HTTPServer(('', 8100), RequestHandler)
httpd.serve_forever()
