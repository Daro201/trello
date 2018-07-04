//VARIABLES
var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
  'X-Client-Id': '3348',
  'X-Auth-Token': '2c1051699979169fe064681182e6138f'
};

//FUNCTION CREATING  NEW COLUMNS
function Column(id, name) {
  	var self = this;

  	this.id = id;
  	this.name = name || 'Not close';
  	this.element = generateTemplate('column-template', { name: this.name, id: this.id });

  	this.element.querySelector('.column').addEventListener('click', function (event) {
	    if (event.target.classList.contains('btn-delete')) {
	      	self.removeColumn();
	    }
	
	  	if (event.target.classList.contains('add-card')) {
  			var cardName = prompt("Enter the name of the card");
 			event.preventDefault();

  			var data = new FormData();
			data.append('name', cardName);
			data.append('bootcamp_kanban_column_id', self.id);

			fetch(baseUrl + '/card', {
    			method: 'POST',
    			headers: myHeaders,
    			body: data,
  			})
  			.then(function(res) {
    			return res.json();
  			})
  			.then(function(resp) {
    			var card = new Card(resp.id, cardName);
    			self.addCard(card);
 	 		});

  			/*self.addCard(new Card(cardName));*/
		}
	});
}

Column.prototype = {
	addCard: function(card) {
	  this.element.querySelector('ul').appendChild(card.element);
	},
	removeColumn: function() {
  		var self = this;
  		fetch(baseUrl + '/column/' + self.id, { method: 'DELETE', headers: myHeaders })
    		.then(function(resp) {
      			return resp.json();
    	})
    	.then(function(resp) {
      		self.element.parentNode.removeChild(self.element);
    	});
	}
};