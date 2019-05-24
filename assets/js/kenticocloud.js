var Kc = window['kenticoCloudDelivery'];

var deliveryClient = new Kc.DeliveryClient({
	//
	//
	//
	// insert Kentico Cloud project ID here
	//
	//
	//
	projectId: '7f679bd8-e07a-0226-14fb-5b69be6ad46e'
});



Vue.component('image-list', {
	props: ['images'],
	template: `<div id="main">
		<article class="thumb" v-for="image in images">
			<a :href="image.url" class="image"><img :src="image.url + '?w=360'" :alt="image.title" /></a>
			<h2>{{image.title}}</h2>
			<div v-html="image.text"></div>
		</article>
	</div>`
});

Vue.component('about-section', {
	props: ['data'],
	template: `<section v-if="data">
		<h2>{{data.title}}</h2>
		<div v-html="data.text"></div>
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

const app = new Vue({
 el: '#wrapper',
 data: {
	 images: [],
	 aboutData: null,
	 contactData: null
 },
 created: function(){
	// images
	deliveryClient
		.items()
		.type('home_page', 'image')
		.elementsParameter(['photos', 'title', 'image', 'text'])
		.getPromise()
		.then(response => {
			this.$data.images = response.items[0].photos.map(item => ({
				url: item.image.assets[0].url,
				title: item.title.value,
				text: item.text.value
				}));
			}
		);
		
	// about data
	deliveryClient
		.items()
		.type('about_page')
		.elementsParameter(['title', 'text'])
		.getPromise()
		.then(response => {
			let aboutPage = response.items[0];
			this.$data.aboutData = ({
				title: aboutPage.elements.title.value,
				text: aboutPage.elements.text.value
			});
		});
		
	// contacts data
	deliveryClient
		.items()
		.type('contact')
		.elementsParameter(['twitter', 'facebook', 'instagram', 'github', 'dribbble', 'linkedin'])
		.getPromise()
		.then(response => {
			let contactData = response.items[0];
			this.$data.contactData = ({
				twitter: contactData.elements.twitter.value,
				facebook: contactData.elements.facebook.value,
				instagram: contactData.elements.instagram.value,
				github: contactData.elements.github.value,
				dribbble: contactData.elements.dribbble.value,
				linkedin: contactData.elements.linkedin.value
			});
		});	
 },
 updated: function(){
	 jqueryInitialize();
 }
});
