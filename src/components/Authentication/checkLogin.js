
const checkLogin = (token) => (
	fetch('https://gettaxiapp.herokuapp.com/api/auth', 
	{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({ token })
	})
	.then(res => res.json())
); 

module.exports = checkLogin;