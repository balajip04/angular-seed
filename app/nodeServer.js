/**
 * Created by balaajiparthasarathy on 3/16/17.
 */
app.get('/test', function(req, res) {
console.log('Invoked');
    res.set('Access-Control-Allow-Origin', '*');
});