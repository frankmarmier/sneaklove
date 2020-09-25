document.getElementById('burger-menu').addEventListener('click', () => {
	const menus = Array.from(document.getElementsByClassName('hide'))
	menus.forEach(menu => menu.classList.toggle('show'))
})