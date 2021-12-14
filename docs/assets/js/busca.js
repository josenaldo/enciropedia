(function () {

    function displaySearchResults(results, store) {
        var searchResults = document.getElementById('search-results');

        if (results.length) { // Are there any results?
            var appendString = '';

            for (var i = 0; i < results.length; i++) { // Iterate over the results
                var item = store[results[i].ref];
                appendString += '<li class="mt-4 result-item">'
                appendString += '<a href="' + item.url + '" class="result-title text-decoration-none">'
                appendString += '<h4 class="mb-0">' + item.title + '</h4>'
                appendString += '</a>';

                appendString += '<p class="result-url small text-muted mb-0 ps-3">' + item.absolute_url + '</p>';

                appendString += '<p class="result-content mb-0 ps-3">' + item.content.substring(0, 150) + '...</p>'
                appendString += '</li>';
            }

            searchResults.innerHTML = appendString;

        } else {
            searchResults.innerHTML = '<li>Nenhum resultado encontrado</li>';
        }
    }

    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');

        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');

            if (pair[0] === variable) {
                return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
            }
        }
    }

    function showPagination() {
        var myPagination = new purePajinate({
            itemsPerPage: 10,
            wrapAround: false,
            pageLinksToDisplay: 5,
            navLabelFirst: '<<',
            navLabelPrev: '&laquo;',
            navLabelNext: '&raquo;',
            navLabelLast: '>>',
            navOrder: ["first", "prev", "num", "next", "last"],
            showFirstLast: false,
            showPrevNext: true,
            hideOnSmall: true,
            containerSelector: '#search-results',
            itemSelector: '.result-item',
            navigationSelector: '.page_navigation',
            defaultClass: 'page-item',
            activeClass: "active",
            disabledClass: "disabled",
            onPageDisplayed: function onPageDisplayed() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }

    function ready(callbackFunc) {
        if (document.readyState !== 'loading') {
            // Document is already ready, call the callback directly
            callbackFunc();
        } else if (document.addEventListener) {
            // All modern browsers to register DOMContentLoaded
            document.addEventListener('DOMContentLoaded', callbackFunc);
        } else {
            // Old IE browsers
            document.attachEvent('onreadystatechange', function () {
                if (document.readyState === 'complete') {
                    callbackFunc();
                }
            });
        }
    }

    function init() {
        var searchTerm = getQueryVariable('query');

        if (searchTerm) {
            document.getElementById('search-box').setAttribute("value", searchTerm);
            document.getElementById('search-box-2').setAttribute("value", searchTerm);

            // Initalize lunr with the fields it will be searching on. I've given title
            // a boost of 10 to indicate matches on this field are more important.
            var idx = lunr(function () {
                this.field('id');
                this.field('url');
                this.field('title', {
                    boost: 10
                });
                this.field('author');
                this.field('category');
                this.field('tags');
                this.field('date');
                this.field('summary');
                this.field('short_name');
                this.field('position');
                this.field('twitter');
                this.field('facebook');
                this.field('instagram');
                this.field('github');
                this.field('content');

                for (var key in window.store) {
                    this.add({
                        'id': key,
                        'url': window.store[key].url,
                        'title': window.store[key].title,
                        'author': window.store[key].author,
                        'category': window.store[key].category,
                        'tags': window.store[key].tags,
                        'date': window.store[key].date,
                        'summary': window.store[key].summary,
                        'short_name': window.store[key].short_name,
                        'position': window.store[key].position,
                        'twitter': window.store[key].twitter,
                        'facebook': window.store[key].facebook,
                        'instagram': window.store[key].instagram,
                        'github': window.store[key].github,
                        'content': window.store[key].content,
                    });
                }
            });

            var results = idx.search(searchTerm); // Get lunr to perform a search

            displaySearchResults(results, window.store); // We'll write this in the next section

            ready(function () {
                showPagination();

                var list = document.querySelector('#pagination-wrapper ul');
                list.classList.add("pagination");
                // list.classList.add("pagination-lg");
                list.classList.add("justify-content-center");

                let links = list.querySelectorAll("li a");

                links.forEach(function (el) {
                    el.classList.add("page-link")
                })
            });
        }
    }

    var searchTerm = getQueryVariable('query');
    if (searchTerm) {
        document.getElementById('search-loading').classList.add('visible');
        document.getElementById('search-loading').classList.remove('invisible');
    } else {
        document.getElementById('search-loading').classList.add('invisible');
        document.getElementById('search-loading').classList.remove('visible');
    }
    // window.setTimeout(init, 5000);
    init();
})();