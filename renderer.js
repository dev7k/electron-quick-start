const electron = require('electron');

const session = electron.remote.session.defaultSession;
session.cookies.set({
    url: 'http://.localhost',
    name: 'MyCookie',
    value: '1',
    domain: '.localhost',
    httpOnly: true,
    path: '/',
    secure: false
}, () => {
    session.cookies.get({}, (err, cookies) => {
        console.log('Cookies', JSON.stringify(cookies));
    });
    setTimeout(() => {
        location.href = 'http://localhost';
    }, 1000);
});
