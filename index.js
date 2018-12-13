module.exports = function CmdChannel(m) {
	let currentChannel = 0

	// command
    m.command.add('ch', (p) => {
		// change to specified channel
		changeChannel(p)
	send(`移動到 <font color="#17fdd2">${p}頻道`)
	});
	
    m.command.add('n', (p) => {
		// change to next channel
		changeChannel(currentChannel.channel + 1)
		send(`移動到 <font color="#17fdd2">下個頻道`)
	});
	
	m.command.add('b', (p) => {
		// change to next channel
		changeChannel(currentChannel.channel + 1)
		send(`移動到 <font color="#17fdd2">上個頻道`)
	});
	// code
	m.hook('S_CURRENT_CHANNEL', 2, (e) => { currentChannel = e });

	// helper
	// in case of dungeon/instance, return
	// if 0, let 0 be 10 for convenience
	// if same channel requested, return error message
	// channel index starts at 0, so decrement by 1
	function changeChannel(newChannel) {
		if (currentChannel.channel > 20) return
		if (newChannel == 0) newChannel = 10;
		if (newChannel == currentChannel.channel) {
			send(`相同頻道`);
			return
		}
		newChannel -= 1;
		m.send('C_SELECT_CHANNEL', 1, {
			unk: 1,
			zone: currentChannel.zone,
			channel: newChannel
		});
	}

	function send(msg) { m.command.message(`: ` + msg); }

}
