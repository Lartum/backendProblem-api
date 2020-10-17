<h1>Description</h1>
<p>The endpoints were tested on postman</p>
<p>The file tested was 850mb csv file</p>
<p>fast-csv file handles the parsing of csv file data line by line and stores it as an array</p>
<p>The file is handled with node stream</p>
<p>The /upload endpoint starts a stream and responds with the streamID that was just started</p>
<p>The /upload/:id?action='' endpoint requires the id and action to be commited on the given id stream</p>

<h1>Endpoints</h1>
<h3>/upload</h3>
<p>It uses Multer to get the file from a user</p>
<p>the body contains a form-data</p>
<p>key = 'file', value=the file to be uploaded</p>
<p>response: the stream Id </p>

<h3>/upload/:id?action=''</h3>
<p>this takes only a paramter and a query string</p>
<p>id: take the id recieved from the /upload endpoint and pass it</p>
<p>action: stop || resume || pause</p>