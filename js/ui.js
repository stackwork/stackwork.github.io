(function (window, document) {

    function toggleClass(element, className) {
        var classes = element.className.split(/\s+/),
            length = classes.length,
            i = 0;

        for(; i < length; i++) {
          if (classes[i] === className) {
            classes.splice(i, 1);
            break;
          }
        }
        // The className is not found
        if (length === classes.length) {
            classes.push(className);
        }

        element.className = classes.join(' ');
    }

    var layout   = document.getElementById('layout');

    menuLink.onclick = function (e) {
        e.preventDefault();
        toggleClass(layout, 'menu-activated');
    };

}(this, this.document));
