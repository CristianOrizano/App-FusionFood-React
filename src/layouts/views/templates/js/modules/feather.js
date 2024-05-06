// Usage: https://feathericons.com/
import feather from 'feather-icons';

document.addEventListener('DOMContentLoaded', () => {
	try {
		setTimeout(() => {
			feather.replace();
		}, 100);
	} catch (e) {
		console.log('You might have made a typo with one of the feather icons');
		console.log(e);
	}
});

window.feather = feather;
