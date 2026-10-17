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
