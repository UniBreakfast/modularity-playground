let username;

setNameBtn.onclick = () => {
	const name = setNameInp.value.trim();

	if (name) {
		username = name;
		setNameModal.remove();
		next();
	} else {
		setNameInp.value = 'Ошибка!';
	}
};

function next() {}
