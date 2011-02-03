# Placeholder labels

This small Javascript method (1.45kb minified) turns labels with the class 'inline' into placeholder attributes for their assigned input with Javascript fall back for browsers that do not support HTML5 recommended attributes.

The method will search for labels with an assigned class name (default: 'inline'), check for native behaviour and improvise the old fashioned way if that is unavailable.

In the case that there is no native support the function will also add a 'placeholder' class so that you are able to distinguish between a placeholder or a real value being present.

The method does not add any listeners to the form.

Tested in Firefox 3.6, Firefox 4\*, Safari 5\*, Chrome 8\*, Internet Explorer 7, 8 and 9\* (\* placeholder attribute supported)

## Usage

Simply add the class name 'inline' to a label (bound to a text input or textarea).

### Credits

* [Modernizr for attribute test](http://www.modernizr.com)
* [Mike Taylr for the HTML 5 input and attribute compatibility tables](http://miketaylr.com/code/input-type-attr.html)
