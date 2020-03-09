'use strict';
const API_KEY = 'AIzaSyArSa5yuJRo9-FPUXnTGiu0GIIFt3uLJyk';
const API_ID = '004107311362073572255:fhevtij04ds';
const API_URL = 'https://www.googleapis.com/customsearch/v1';
const API_IMAGES = 'searchType=image';

function checkEnterPressed(event) {
    if (event.keyCode === 13) {
        search();
    }
}

function search() {
    document.getElementsByClassName('image').remove();
    document.getElementsByClassName('page-list-items').remove();
    updateResults();
}

function updateResults() {
    let query = document.getElementById('searchInput').value;
    fetch(API_URL + '?q=' + query + '&cx=' + API_ID + '&key=' + API_KEY + '&' + API_IMAGES)
      .then((response) => {
          return response.json();
      })
      .then((data) => {
          updateImageResults(data)
      });
    fetch(API_URL + '?q=' + query + '&cx=' + API_ID + '&key=' + API_KEY)
      .then((response) => {
          return response.json();
      })
      .then((data) => {
          updatePageResults(data)
      });
}

function updateImageResults(data) {
    data.items.forEach(item => {
        let image = document.createElement("img");
        image.src = item.link;
        image.className = "image";
        document.getElementById('images-container').appendChild(image);
    })
}

function updatePageResults(data){
    data.items.forEach(item => {
        let pageListItem = document.createElement('li');
        pageListItem.className = "page-list-items";
        let page = document.createElement("p");
        page.innerHTML = '<b>' + item.title + '</b>';
        pageListItem.appendChild(page);

        let url = document.createElement('a');
        let link = document.createTextNode(item.formattedUrl);
        url.title = item.formattedUrl;
        url.href = item.formattedUrl;
        url.appendChild(link);
        pageListItem.appendChild(url);

        let text = document.createElement("p");
        text.innerHTML = item.snippet;
        pageListItem.appendChild(text);

        document.getElementById('pages-list').appendChild(pageListItem);
    });
    new List('pages-container', { page: 5, pagination: true });
}

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
};

NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
};

