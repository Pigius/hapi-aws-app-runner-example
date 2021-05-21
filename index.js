const Hapi = require('hapi');
const Inert = require('inert');

const server = new Hapi.Server();
server.connection({ port: 8000 });
server.register(Inert, () => {});

const getDayFromDate = (dateString) => {
    const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday'];
    const date = new Date(Date.parse(dateString)); 
    const dayIndex = date.getDay();
    const day = DAYS[dayIndex];
    return day;
};


const helloPostHandler = function(request, reply) {
    console.log('getDayFromDate handler invoked!');
    const dayResponse = `This date was on ${getDayFromDate(request.payload.date)}`
    reply({ 
        date: request.payload.date,
        day: dayResponse
    });
}

server.route([
    {
       method: 'POST',
        path: '/hello',
        handler: helloPostHandler
    }
]);

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
 });
 