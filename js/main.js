(function (window) {
	$.getJSON('https://gamemonetize.com/feed.php?format=0&num=200&page=1', function (res) {
		console.log(res, 'res')
		window.hs.games = res;
	});
})(window);
