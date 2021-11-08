/*
		Topic: Assignment 2 - Digital Agency - Future Island - Data
		Author: Steven Aelbrecht
		Modified: 2021-11-03
*/

const navLinks = [{
		'name': 'Home',
		'link': 'https://www.rockwerchter.be/en/',
		'type': 'internal'
	},
	{
		'name': 'Line-up',
		'link': 'index.html',
		'type': 'internal'
	}, {
		'name': 'Tickets',
		'link': 'https://www.rockwerchter.be/en/tickets',
		'type': 'internal'
	}, {
		'name': 'Praktisch',
		'link': 'https://www.rockwerchter.be/en/',
		'type': 'internal'
	}, {
		'name': 'Camping',
		'link': 'https://www.rockwerchter.be/en/camping',
		'type': 'internal'
	}, {
		'name': 'History',
		'link': 'https://www.rockwerchter.be/en/history',
		'type': 'internal'
	}, {
		'name': 'Rwtv',
		'link': 'https://www.proximus.be/pickx/nl/muziek/festivals/rockwerchter/vod',
		'type': 'external'
	},
	{
		'name': 'Nmw',
		'link': 'http://northwestwalls.be/',
		'type': 'external'
	},
	{
		'name': 'Koop tickets',
		'link': 'https://www.ticketmaster.be/feature/rockwerchter/?language=en-us&utm_source=rockwerchter.be&utm_medium=website&utm_campaign=rw22&_ga=2.143841778.69334452.1636061307-810472132.1635950746',
		'type': 'external'
	},
];

const dataLineUp = [{ // Faith No More
		'id': '3e350abd-b825-4f03-87f4-bad3c116744b',
		'artist': {
			'name': 'Faith No More',
			'synopsis': 'Faith No More have always gone against the flow. The Americans do so with humour, a healthy sense of perspective, and a strong faith in their own talent.  This is not just an exceptional band; they are also of great historical importance. In the 1980s, they were the first to blend metal with funk and hip-hop as the founders of what became known as ‘crossover’. Hits like ‘We Care A Lot’ and ‘Epic’ paved the way for Nirvana, while they also inspired Korn and Limp Bizkit. These musical mavericks next shocked friend and foe alike with a smooth cover of ‘Easy’, the Commodores’ soul classic. This in turn made an impression on bands like System Of A Down and Deftones. The watchword is freedom, the outcome is modern metal. Following five years of inactivity, the San Francisco quintet is once again heading out on a world tour.',
			'social': {
				'website': 'https://www.fnm.com/',
				'facebook': 'https://www.facebook.com/faithnomore',
				'twitter': 'https://www.twitter.com/faithnomore',
				'instagram': 'https://www.instagram.com/faithnomore'
			},
			'picture': {
				'small': 'https://assets.rockwerchter.be/files/cache/medium/files/fnm-1500-60cc6b19a9efc.jpg',
				'large': 'https://assets.rockwerchter.be/files/cache/medium/files/fnm-1500-60cc6b19a9efc.jpg'
			},
			'media': {
				'type': 'youtube', // image or youtube
				'sourceId': 'https://www.youtube.com/embed/ZG_k5CSYKhg'
			},
		},
		'place': {
			'name': 'The Barn' // Main Stage, KluB C, The Barn of The Slope
		},
		'from': 1656783000000, // 02-07-22 > 19.30
		'to': 1656786600000, // 02-07-22 > 20.30
		'createdAt': 1635963000000,
		'modifiedAt': 1635963000000,
		'isHeadliner': true
	},
	{ // Imagine Dragons
		'id': '569a144d-b55e-429d-8b61-0d8bef64f011',
		'artist': {
			'name': 'Imagine Dragons',
			'synopsis': 'Imagine Dragons are coming to Rock Werchter next summer! The American rock band announced their Mercury Tour, which takes them to Rock Werchter on Saturday 2 July. Hits like ‘Radioactive’, ‘Believer’ and ‘Thunder’ and their latest album ‘Mercury – Act 1’ proves that Imagine Dragons are among the biggest bands of their generation. With their swaggering songs full of heavy bass and intense drumming, big emotions and the powerful voice of Dan Reynolds, they will set the Festivalpark on fire. Are you ready?',
			'social': {
				'website': 'https://www.imaginedragonsmusic.com/',
				'facebook': 'https://www.facebook.com/imaginedragons',
				'twitter': 'https://www.twitter.com/imaginedragons',
				'instagram': 'https://www.instagram.com/imaginedragons'
			},
			'picture': {
				'small': 'https://assets.rockwerchter.be/files/cache/medium/files/id-website2000-617be270c6636.jpg',
				'large': 'https://assets.rockwerchter.be/files/cache/medium/files/id-website2000-617be270c6636.jpg'
			},
			'media': {
				'type': 'youtube', // image or youtube
				'sourceId': 'https://www.youtube.com/embed/Y2NkuFIlLEo'
			},
		},
		'place': {
			'name': 'Main Stage' // Main Stage, KluB C, The Barn of The Slope
		},
		'from': 1656702000000, // 01-07-22 > 21.00
		'to': 1656707400000, // 01-07-22 > 22.30
		'createdAt': 1635963000000,
		'modifiedAt': 1635963000000,
		'isHeadliner': true
	},
	{ // Red Hot Chili Peppers
		'id': 'c5d60c70-3449-47e5-aa12-ed98a6fd5d23',
		'artist': {
			'name': 'Red Hot Chili Peppers',
			'synopsis': 'Red Hot Chili Peppers are their own musical planet. The Californians introduced their original hybrid of rock and funk in the 1980s. Their danceable, distinctive and deeply energetic sound have provided a soundtrack that several generations have grown up to. The four-piece reached maturity with the album ‘Blood Sugar Sex Magik’ in 1991 – 30 years ago this year. ‘Give It Away’ and ‘Under The Bridge’ brought them their first taste of global fame, but it was ‘Californication’ (1999) – with ‘Scar Tissue’ and ‘Otherside’ - and ‘By the Way’ (2002) that really took the band to the top. The band have more than left their mark every time they’ve graced the Werchter stage, like when bassist Flea played in the nude in 1996. The group will be at its strongest in 2022, with star guitarist John Frusciante back on board.',
			'social': {
				'website': 'https://redhotchilipeppers.com/',
				'facebook': 'https://www.facebook.com/chilipeppers',
				'twitter': 'https://www.twitter.com/chilipeppers',
				'instagram': 'https://www.instagram.com/chilipeppers'
			},
			'picture': {
				'small': 'https://assets.rockwerchter.be/files/cache/medium/files/rhcp-web-61543fbab0b59.jpg',
				'large': 'https://assets.rockwerchter.be/files/cache/medium/files/rhcp-web-61543fbab0b59.jpg'
			},
			'media': {
				'type': 'youtube', // image or youtube
				'sourceId': 'https://www.youtube.com/embed/Q0oIoR9mLwc'
			},
		},
		'place': {
			'name': 'Main Stage' // Main Stage, KluB C, The Barn of The Slope
		},
		'from': 1656873000000, // 03-07-22 > 20.30
		'to': 1656878400000, // 03-07-22 > 22.00
		'createdAt': 1635963000000,
		'modifiedAt': 1635963000000,
		'isHeadliner': true
	},
	{ // Twenty One Pilots
		'id': '80e26b78-8f00-458b-ad84-a6f30186eb3a',
		'artist': {
			'name': 'Twenty One Pilots',
			'synopsis': 'Twenty One Pilots are among the greatest success stories of the 21st century. The numbers don’t lie. Their breakthrough, ‘Blurryface’ (2015), was the first album of the digital era on which all the songs have gone at least gold in the United States. The single ‘Stressed Out’ made the duo the first rock act to achieve more than a billion streams on Spotify. Drummer Josh Dun and keyboard wizard Tyler Joseph are born entertainers. On stage, this means fancy dress, a burning car and backflips off the piano.  Anything goes. Twenty One Pilots appeared at Werchter for the first time in 2014, early in the day in KluB C. They return as an undisputed top act, bringing the recently-released ‘Scaled and Icy’ with them.',
			'social': {
				'website': 'https://www.twentyonepilots.com/',
				'facebook': 'https://www.facebook.com/twentyonepilots',
				'twitter': 'https://www.twitter.com/twentyonepilots',
				'instagram': 'https://www.instagram.com/twentyonepilots'
			},
			'picture': {
				'small': 'https://assets.rockwerchter.be/files/cache/medium/files/top-1500-60cc6b1984834.jpg',
				'large': 'https://assets.rockwerchter.be/files/cache/medium/files/top-1500-60cc6b1984834.jpg'
			},
			'media': {
				'type': 'youtube', // image or youtube
				'sourceId': 'https://www.youtube.com/embed/2sBRnnnZyFw'
			},
		},
		'place': {
			'name': 'The Slope' // Main Stage, KluB C, The Barn of The Slope
		},
		'from': 1656784800000, // 02-07-22 > 20.00
		'to': 1656789300000, // 02-07-22 > 21.15
		'createdAt': 1635963000000,
		'modifiedAt': 1635963000000,
		'isHeadliner': false
	},
	{ // Pearl Jam
		'id': 'ac669686-9415-487b-b3fa-4632f8d5b9d9',
		'artist': {
			'name': 'Pearl Jam',
			'synopsis': 'Pearl Jam’s summer 2021 European tour has officially been rescheduled for June and July of 2022. The new European tour dates for the summer of 2022 are set. And so the first name for Rock Werchter 2022 is in. On Thursday, June 30, 2022, Pearl Jam will headline the opening day of the festival.',
			'social': {
				'website': 'https://pearljam.com/',
				'facebook': 'https://www.facebook.com/pearljam',
				'twitter': 'https://www.twitter.com/pearljam',
				'instagram': 'https://www.instagram.com/pearljam'
			},
			'picture': {
				'small': 'https://assets.rockwerchter.be/files/cache/medium/files/14686-pearl-jam-032020-6c9a9964-flat-lowres-5f1a952633f63.jpg',
				'large': 'https://assets.rockwerchter.be/files/cache/medium/files/14686-pearl-jam-032020-6c9a9964-flat-lowres-5f1a952633f63.jpg'
			},
			'media': {
				'type': 'youtube', // image or youtube
				'sourceId': 'https://www.youtube.com/embed/qM0zINtulhM'
			},
		},
		'place': {
			'name': 'Main Stage' // Main Stage, KluB C, The Barn of The Slope
		},
		'from': 1656614700000, // 30-06-22 > 20.45
		'to': 1656620100000, // 30-06-22 > 22.15
		'createdAt': 1635963000000,
		'modifiedAt': 1635963000000,
		'isHeadliner': true
	},
];

const festivalDate = 1656597600000;

const socialIcons = [{
		'name': 'Facebook',
		'link': 'http://www.facebook.com/rockwerchterfestival',
		'type': 'facebook'
	},
	{
		'name': 'Twitter',
		'link': 'http://www.twitter.com/rockwerchter',
		'type': 'twitter'
	},
	{
		'name': 'Instagram',
		'link': 'http://instagram.com/rockwerchterfestival',
		'type': 'instagram'
	},
	{
		'name': 'Spotify',
		'link': 'https://play.spotify.com/user/rockwerchterofficial',
		'type': 'spotify'
	},
	{
		'name': 'Youtube',
		'link': 'http://www.youtube.com/user/rockwerchterfestival',
		'type': 'youtube'
	},
]