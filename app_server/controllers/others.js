/* GET homepage*/
const about = (req, res) => {
	res.render('generic-text', {
		title: 'About',
		description: 'Loc8r a été créé pour aider les gens à trouver où bosser',
		moreText: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos pariatur, quasi quia accusamus commodi incidunt nesciunt dolores veritatis consequatur sunt. Natus nam ducimus sed animi recusandae nulla iste sit cum.'
	});
};

module.exports = {
	about
};