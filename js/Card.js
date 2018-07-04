//VARIABLES
var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
  'X-Client-Id': '3348',
  'X-Auth-Token': '2c1051699979169fe064681182e6138f'
};

// KLASA KANBAN CARD
function Card(id, name) {
  	var self = this;
  	this.id = id;
  	this.name = name || 'No way';
  	this.element = generateTemplate('card-template', { description: this.name }, 'li');

  	this.element.querySelector('.card').addEventListener('click', function (event) {
    	event.stopPropagation();

    	if (event.target.classList.contains('btn-delete')) {
      		self.removeCard();
    	}
  	});
}
Card.prototype = {
  removeCard: function() {
    var self = this;

    fetch(baseUrl + '/card/' + self.id, { method: 'DELETE', headers: myHeaders })
      .then(function(resp) {
        return resp.json();
      })
      .then(function(resp) {
        self.element.parentNode.removeChild(self.element);
      })
  }
}