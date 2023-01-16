import axios from 'axios';
require('dotenv').config()

export default async function handler(req, res) {
	// const options = {
	// 	method: 'GET',
	// 	url: url,
	// };
	const url = {
		method: 'GET',
		url: 'https://zozor54-whois-lookup-v1.p.rapidapi.com/',
		params: {domain: `${req.query.keyword}`, format: 'json'},
		headers: {
		  'X-RapidAPI-Key': `${process.env.apiKey}`,
		  'X-RapidAPI-Host': 'zozor54-whois-lookup-v1.p.rapidapi.com'
		}
	  };
	  
	  axios.request(url).then(function (response) {
		res.status(200).json(response.data);
	}).catch(function (error) {
		res.status(500).json(error);
	});
}