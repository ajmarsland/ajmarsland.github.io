Vue.component('image-list', {
	props: ['images'],
	methods: { sanitizeHtml: function(value) { return CmsHtml.sanitize(value); } },
	template: `<div id="main">
		<article class="thumb" v-for="image in images">
			<a :href="image.url" class="image"><img :src="image.url + '?w=360'" :alt="image.title" /></a>
			<h2>{{image.title}}</h2>
			<div v-html="sanitizeHtml(image.text)"></div>
		</article>
	</div>`
});

Vue.component('about-section', {
	props: ['data'],
	methods: { sanitizeHtml: function(value) { return CmsHtml.sanitize(value); } },
	template: `<section v-if="data">
		<h2>{{data.title}}</h2>
		<div v-html="sanitizeHtml(data.text)"></div>
	</section>`
});

Vue.component('contact-list', {
	props: ['data'],
	template: `
	<ul class="icons" v-if="data">
		<li v-if="data.twitter"><a :href="'https://twitter.com/' + data.twitter" class="icon fa-twitter"><span class="label">Twitter</span></a></li>
		<li v-if="data.facebook"><a :href="'https://facebook.com/' + data.facebook" class="icon fa-facebook"><span class="label">Facebook</span></a></li>
		<li v-if="data.instagram"><a :href="'https://www.instagram.com/' + data.instagram" class="icon fa-instagram"><span class="label">Instagram</span></a></li>
		<li v-if="data.github"><a :href="'https://github.com/' + data.github" class="icon fa-github"><span class="label">GitHub</span></a></li>
		<li v-if="data.dribbble"><a :href="'https://dribbble.com/' + data.dribbble" class="icon fa-dribbble"><span class="label">Dribbble</span></a></li>
		<li v-if="data.linkedin"><a :href="'https://linkedin.com/in/' + data.facebook" class="icon fa-linkedin"><span class="label">LinkedIn</span></a></li>
	</ul>`
});
