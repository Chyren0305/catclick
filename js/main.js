/* ==== Model ==== */
var model = {
    currentCat: null,
    times: 'time',
    cats: [{
        clickCount: 0,
        name: 'Ruby',
        title: 'Meow',
        src: 'img/cat1.jpg'
    }, {
        clickCount: 0,
        name: 'Money',
        title: 'I\'m Watch You!',
        src: 'img/cat2.jpg'
    }, {
        clickCount: 0,
        name: 'Lovely',
        title: 'TwoKitten',
        src: 'img/cat3.jpg'
    }, {
        clickCount: 0,
        name: 'Moon Moon',
        title: '¡¡I\'m a cat!!',
        src: 'img/moon.jpg'
    }, {
        clickCount: 0,
        name: 'Tiger',
        title: 'Yo check out',
        src: 'img/cat5.jpg'
    }, ]
}


/* ======= Controller ======= */

var controller = {
    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // initial
        catListView.init();
        catView.init();
        adminView.init();
    },
    getCurrentCat: function() {
        return model.currentCat;
    },
    getCats: function() {
        return model.cats;
    },
    getTimes: function(){
        return model.times;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },
    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    },
    decrementCounter: function() {
        // body...
        model.currentCat.clickCount--;
        catView.render();
    },
    Reset: function() {
        model.currentCat.clickCount = 0;
        catView.render();
    },
    adminToggle: function toggle(e, id) {

        adminEdit.style.display = (adminEdit.style.display == 'block') ? 'none' : 'block';

        // save it for hiding
        toggle.adminEdit = adminEdit;

        // stop the event right here
        // if (e.stopPropagation) {
        //     e.stopPropagation();
        //     e.cancelBubble = true;
        //     return false;
        // }
    },
    adminOpen: function() {
        adminEdit.style.display = 'block';
    },
    //saves new cat data when save button is clicked.
    adminSave: function() {
        model.currentCat.name = adminName.value;
        model.currentCat.title = adminTitle.value;
        // model.currentCat.src = adminImg.value;
        model.currentCat.clickCount = adminCounter.value;
        catView.render();
        catListView.render();
    },
    adminCancel: function() {
        adminEdit.style.display = 'none';
    }


}


/* ======= View ======= */
var catElem = document.getElementById('catBox');
var catName = document.getElementById('cat-name');
var catTitle = document.getElementById('cat-title');
var catStatus = document.getElementById('cat-status');
var catImg = document.getElementById('cat-img');
var catCount = document.getElementById('cat-counter');
var catTimes = document.getElementById('cat-times');
var catReset = document.getElementById('cat-reset');

var adminElem = document.getElementById('adminBtn');
var adminName = document.getElementById('admin-name');
var adminEdit = document.getElementById('edit');
var adminName = document.getElementById('admin-name');
var adminTitle = document.getElementById('admin-title');
var adminImg = document.getElementById('admin-img');
var adminCounter = document.getElementById('admin-counter');
var adminSubmit = document.getElementById('admin-submit');
var adminCancel = document.getElementById('admin-cancel');

var catView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = catElem;
        this.catName = catName;
        this.catTitle = catTitle;
        this.catImg = catImg;
        this.catCount = catCount;
        this.catTimes = catTimes;
        this.catReset = catReset;

        // on click, increment the current cat's counter
        this.catImg.addEventListener('click', function() {
            controller.incrementCounter();
        });
        // on click, increment the current cat's counter
        this.catReset.addEventListener('click', function() {
            controller.Reset();
        });

        // render this view (update the DOM elements with the right values))
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat 
        var currentCat = controller.getCurrentCat();

        this.catCount.textContent = currentCat.clickCount;
        this.catName.textContent = currentCat.name;
        this.catTitle.textContent = currentCat.title;

        this.catTimes.textContent = controller.getTimes();

        this.catImg.src = currentCat.src;

        // click times change Title
        var clicks = this.catCount.textContent;


        var title = this.catTitle.textContent;
        
        if (clicks > 1){
            this.catTimes.textContent = 'times'
        }    

        if (clicks < 10 && clicks > 5) {
            this.catTitle.textContent = 'Reborn';
        } else if (clicks < 20 && clicks > 10) {
            this.catTitle.textContent = 'Infant';
        } else if (clicks < 40 && clicks > 20) {
            this.catTitle.textContent = 'Child';
        } else if (clicks < 60 && clicks > 40) {
            this.catTitle.textContent = 'Teen';
        } else if (clicks < 80 && clicks > 60) {
            this.catTitle.textContent = 'Adult';
        } else if (clicks > 81) {
            this.catTitle.textContent = 'Old';
        } else {
            return this.catTitle.textContent;
        }

    }

};


var catListView = {
    init: function() {

        // store the DOM element for easy access later
        this.catList = document.getElementById('cat-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cat, elem;

        // get the cats we'll be rendering from the controller
        var cats = controller.getCats();

        // empty the cat list
        this.catList.innerHTML = '';

        // loop over the cats
        for (var i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('button');
            elem.textContent = cat.name;
            /* 
              on click, setCurrentCat and render the catView
              (this uses our closure-in-a-loop trick to connect the value
              of the cat variable to the click event function)
            */
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    controller.setCurrentCat(catCopy);
                    // controller.incrementCounter();
                    catView.render();
                    adminView.render();
                }
            })(cat));

            // finally, add the element to the list
            this.catList.appendChild(elem);
        }


    }
};

var adminView = {
    init: function() {

        this.adminElem = adminElem;


        // store pointers to our DOM elements for easy access later
        this.adminEdit = adminEdit;

        this.adminName = adminName;
        this.adminTitle = adminTitle;
        // this.adminImg = adminImg;
        this.adminCounter = adminCounter;
        this.adminSubmit = adminSubmit;
        this.adminCancel = adminCancel;

        // on click, toggle the edit 
        this.adminElem.addEventListener('click', function() {
            controller.adminToggle();
        });
        this.adminSubmit.addEventListener('click', function() {
            controller.adminSave();
        });
        this.adminCancel.addEventListener('click', function() {
            controller.adminCancel();
        });

        // render this view (update the DOM elements with the right values)
        this.render();


    },
    render: function() {
        // store pointers to our DOM elements for easy access later
        this.catName = catName;
        this.catTitle = catTitle;

        // update the DOM elements with values from the current cat 
        var currentCat = controller.getCurrentCat();

        this.catName.textContent = currentCat.name;
        this.catTitle.textContent = currentCat.title;

        this.adminName.value = currentCat.name;
        this.adminTitle.value = currentCat.title;
        // this.adminImg.value = currentCat.src;
        this.adminCounter.value = catCount.textContent;


    }

};

//make it go! 
controller.init();


