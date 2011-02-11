# Placeholder Labels

This small Javascript method (1.45kb minified) turns labels with the class 'inline' into placeholder attributes for their assigned input with fallback for browsers that do not support HTML5 recommended attributes.

Tested in the following browsers:

* Firefox 3.6
* Firefox 4\*
* Safari 5\*
* Chrome 8\* and 9 \*
* Internet Explorer 7, 8 and 9\*

\* placeholder attribute supported

## How does it work

The method will first search for labels with the class name 'inline', check for native placeholder behaviour and improvise the old fashioned way if that is unavailable.

In the case that there is no native support the function will also add a 'placeholder' class to the input so that you are able to distinguish between a placeholder or real value being present.

The method does not add any listeners to the form.

### Installation

Simply include the Javascript file (minified version recommended for production use) within your page and instantiate a new copy of InlineLabels:

_var labels = new InlineLabel('inline', this.document);_

The first argument is the class name you have applied to your labels, the second argument can be an object or an ID string.

### Credits

* [Modernizr for attribute test](http://www.modernizr.com)
* [Mike Taylr for the HTML 5 input and attribute compatibility tables](http://miketaylr.com/code/input-type-attr.html)
