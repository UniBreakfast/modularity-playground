module.exports = function prepAPI(params) {
	return {
		'/updates': (req, resp) => {
			let id = req.headers['poll-id'];

			if (!id) {
				id = generateToken();
				resp.setHeader('poll-id', id);
			}

			let poller = pollers[id];
			if (!poller)
				pollers[id] = poller = {
					resp,
					updates: [],
					timer: setTimeout(() => {
						resp.end('{"updates": []}');
						delete poller.resp;
						poller.timer = setTimeout(() => delete poller[id], 600000);
					}, 60000 * 4),
				};
			else {
				clearTimeout(poller.timer);
				if (poller.updates.length) {
					resp.end(JSON.stringify({ updates: poller.updates.splice(0) }));
					poller.timer = setTimeout(() => delete poller[id], 600000);
				} else {
					poller.resp = resp;
					poller.timer = setTimeout(() => {
						resp.end('{"updates": []}');
						delete poller.resp;
						poller.timer = setTimeout(() => delete poller[id], 600000);
					}, 60000 * 4);
				}
			}
		},
	};
};
