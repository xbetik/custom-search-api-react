'use strict';
const key = 'AIzaSyArSa5yuJRo9-FPUXnTGiu0GIIFt3uLJyk';
const searchEngineId = '004107311362073572255:fhevtij04ds';
const searchImages = 'searchType=image';
const url = 'https://www.googleapis.com/customsearch/v1?key=';

const checkEnterPressed = (event) => {
    if (event.keyCode === 13) {
        search();
    }
};

const search = () => {
    let query = document.getElementById('searchInput').value;

    let images = document.createElement("script");
    images.src = url + key + '&cx=' + searchEngineId + '&q=' + query + '&callback=addImages&' + searchImages;
    document.body.appendChild(images);

    let pages = document.createElement("script");
    pages.src = url + key + '&cx=' + searchEngineId + '&q=' + query + '&callback=addPages';
    document.body.appendChild(pages);
};

const addImages = (response) => {
    for (let i=0; i<response.items.length; i++) {
        let link = response.items[i].link;

        let imageLink = document.createElement('a');
        imageLink.href = link;
        imageLink.target = "_blank";

        let image = document.createElement("img");
        image.src = link;
        image.className = "image";
        imageLink.appendChild(image);
        document.getElementById('images-container').appendChild(imageLink);
    }
};

const addPages = (response) => {
    for (let i=0; i<response.items.length; i++) {
        let item = document.createElement('li');
        let page = document.createElement("p");
        page.innerHTML = '<b>' + response.items[i].title + '</b>';
        page.className = 'name';
        item.appendChild(page);

        let url = document.createElement('a');
        let link = document.createTextNode(response.items[i].formattedUrl);
        url.title = response.items[i].formattedUrl;
        url.href = response.items[i].formattedUrl;
        url.appendChild(link);
        item.appendChild(url);

        let text = document.createElement("p");
        text.innerHTML = response.items[i].snippet;
        item.appendChild(text);

        document.getElementById('pages-list').appendChild(item);
    }
    new List('pages-container', { page: 5, pagination: true });
};
