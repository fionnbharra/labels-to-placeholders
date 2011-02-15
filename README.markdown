# Placeholder Labels

This small Javascript method turns labels with a specified class into placeholder attributes for their related input with Javascript fallback for browsers that do not support HTML5 recommended attributes.

Tested in the following browsers:

* Firefox 3.6 and 4\*
* Safari 5\*
* Chrome 8\* and 9 \*
* Internet Explorer 7, 8 and 9\*

\* placeholder attribute supported

## How does it work

The method will first search for labels with the class name 'inline', check for native placeholder behaviour and improvise the old fashioned way if that is unavailable.

In the case that there is no native support the function will also add a 'placeholder' class to the input so that you are able to distinguish between a placeholder or real value being present.

The method does not add any listeners to the form.

### Installation

Simply include the Javascript file (minified version recommended for production use) within your page and instantiate a new instance of InlineLabels with two arguments:

`var labels = new InlineLabel('inline', document);`

The two arguments are pretty self-explanatory:

1. The class name string you have applied to your labels
2. An object or an ID string (optional)

#### Credits

* [Modernizr for attribute test](http://www.modernizr.com)
* [Mike Taylr for the HTML 5 input and attribute compatibility tables](http://miketaylr.com/code/input-type-attr.html)
