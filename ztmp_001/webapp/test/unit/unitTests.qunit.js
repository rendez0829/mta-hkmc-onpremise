/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"comhkmctrial/ztmp_001/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
