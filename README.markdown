# Placeholder Labels

This small Javascript method turns labels with a specified class into placeholder attributes for their related input with Javascript fallback for browsers that do not support HTML5 recommended attributes with no dependencies.

Tested in the following browsers:

* Firefox 3.6 and 4\*
* Safari 5\*
* Chrome 8\* and 9 \*
* Internet Explorer 7, 8 and 9\*

\* placeholder attribute supported

## How does it work

The method will first search for associated labels, check for native placeholder behaviour (using [Modernizr](http://www.modernizr.com) if available) and improvise the old fashioned way via Javascript events if unavailable.

In the case that there is no native support the function will also add a 'placeholder' class to the input so that you are able to distinguish between a placeholder or user entered value being present.

### Installation

Text inputs and textareas require an associated label -- even if the label is hidden -- so make sure your labels and inputs form a valid pair. By default the script will only select labels with the class 'inline':

	<label for="my_input" class="inline">Insert text</label>
	<input type="text" id="my_input" name="myinput" />

Include the Javascript file (minified version recommended for production use) within your page and instantiate a new instance of InlineLabels:

	var labels = new InlineLabels();

The `InlineLabels` method can take two optional arguments:

1. The class name you have applied to your labels (`string`)
2. An object reference or an ID string to only search for labels within a parent node (`string`|`object`)

To select all labels within a certain form you could do as follows:

	var labels = new InlineLabels('', 'formID');

or

	var my_form = document.getElementByID('my_form'),
	    labels = new InlineLabels(null, my_form);

Styling placeholders requires some rather horrible browser-specific 'shadow DOM' selectors which means some code repetition for now. The script also applies the class name 'placeholder' to each target element in browsers where native placeholder behaviour is not supported:

	::-webkit-input-placeholder {
		color:#f00;
	}
	input:-moz-placeholder, textarea:-moz-placeholder {
		color:#f00;
	}
	input.placeholder, textarea.placeholder {
		color:#f00;
	}

#### Credits

* [Modernizr for attribute test](http://www.modernizr.com)
* [Mike Taylr for the HTML 5 input and attribute compatibility tables](http://miketaylr.com/code/input-type-attr.html)
