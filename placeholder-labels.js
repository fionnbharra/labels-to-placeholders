/*
 * Created by:  Matt Hinchliffe <http://www.maketea.co.uk>
 * Date:        02/02/2011
 * Modified:    03/02/2011
 * Version:     0.2.2
 */

window.InlineLabel = (function(Class, Target) {

	// Test if placeholder attribute is natively supported
	// - Test taken from work by Mike Taylr <http://miketaylr.com/code/input-type-attr.html> and Modernizr <http://www.modernizr.com>
	function test()
	{
		var node = Target.createElement('input');
		return !! ('placeholder' in node);
	}


	// Get labels with specified class
	// - Avoids using getElementsByClassName and searches for single node type with class within a container.
	function get(Class, Tag, Container)
	{
		if (!Class || !Tag)
			return false;

		var Scope = typeof Container == 'string' ? document.getElementById(Container) : Container;

		if (typeof Scope != 'object')
			return false;

		var Elements = Scope.getElementsByTagName(Tag), Results = [];

		if (!Elements)
			return false;

		for (var i = 0; i < Elements.length; i++)
		{
			var String = Elements[i].getAttribute('class') || Elements[i].getAttribute('className');

			if (String)
			{
				if (String.indexOf(Class) > -1)
					Results.push(Elements[i]);
			}
		}

		return Results;
	}

	// Gather label nodes
	var Labels = get(Class, 'label', Target);

	// Loop through nodes
	for (var i = 0; i < Labels.length; i++)
	{
		// Get label text and for attribute value
		var Placeholder = Labels[i].firstChild.nodeValue,
		    Input = document.getElementById( Labels[i].getAttribute('for') || Labels[i].getAttribute('htmlFor') );

		// Test for attribute is bound to a text input or text area
		if (Input && (Input.nodeName.toLowerCase() == 'textarea' || Input.type == 'text'))
		{
			// Hide label and set text to target placeholder attribute
			Labels[i].style.display = 'none';
			Input.setAttribute('placeholder', Placeholder);

			// If native placeholder support is not available available then do it the old fashioned way
			if (!test())
			{
				Input.value = Placeholder;
				Input.className = Input.className + ' placeholder';

				Input.onfocus = function()
				{
					if (this.value == this.getAttribute('placeholder'))
					{
						this.value = '';
						this.className = this.className.replace(' placeholder', '');
					}
				}

				Input.onblur = function()
				{
					if (!this.value || this.value == '')
					{
						this.value = this.getAttribute('placeholder');
						if (this.className.indexOf('placeholder' == -1))
							this.className = this.className + ' placeholder';
					}
				}
			}
		}
	}

})('inline', this.document);