const approuter = require('@sap/approuter');
const cfenv = require('cfenv');

const getConfigPath = () => {
	try {
		const { isLocal } = cfenv.getAppEnv();
		const options = { xsappConfig: null, destinations: null };
		if (isLocal) {
			console.log(`실행환경: localhost`);
			options.xsappConfig = require("./xs-app-local.json");
		} else {
			console.log(`실행환경: cloud foundry`);
			options.xsappConfig = require("./xs-app.json");
		}
		return options;
	} catch (error) {
		return error;
	}
};

try {
	const { xsappConfig, destinations } = getConfigPath();
	const { isLocal, ['app']: appEnv } = cfenv.getAppEnv();
	const env = isLocal ? 'localhost' : appEnv.space_name === 'prd' ? appEnv.space_name : 			
appEnv.application_name.split('-').reverse()[0];
	const port = process.env.PORT || 5000;
	const ar = approuter();
	ar.start({ port: port, xsappConfig }, () => {
		console.log('start approuter');
	});
} catch (error) {
	console.log(error);
}