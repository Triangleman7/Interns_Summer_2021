from http.server import BaseHTTPRequestHandler, HTTPServer
 
hostname = 'localhost'
port = 8000
 
class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        name_returned = '''
{
  "requests": [
    {
      "satelliteId": "sat2",
      "message": "first message",
      "length": "100 minutes",
      "value": 100,
      "id": 1,
      "month": 2,
      "day": 15,
      "year": 2021,
      "category": "commercial",
      "hours": 16,
      "minutes": 0
    },
    {
      "satelliteId": "sat1",
      "message": "mymessage",
      "length": "45 minutes",
      "value": "5",
      "id": 2,
      "month": 8,
      "day": 29,
      "year": 2022,
      "category": "SOH",
      "hours": 5,
      "minutes":0
    }
  ]
}
        '''
 
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin","*")
        self.end_headers()
        self.wfile.write(name_returned.encode('UTF-8'))
 
 
def run(server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler):
    server_address = (hostname, port)
    httpd = server_class(server_address, handler_class)
    httpd.serve_forever()
 
run()
