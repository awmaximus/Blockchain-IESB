var app = express();
var router = express.Router();
var http = require('http');
var port = process.env.port || 1337;

app.listen(5000, function() {
  console.log('Servidor escutando na porta 5000');
});
