/*
 * Created by:  Matt Hinchliffe <http://www.maketea.co.uk>
 * Date:        02/02/2011
 * Modified:    04/02/2011
 * Version:     0.3.0
 */

function InlineLabel(Class, Target)
{
	// Test if placeholder attribute is natively supported
	// - Test taken from work by Mike Taylr <http://miketaylr.com/code/input-type-attr.html> and Modernizr <http://www.modernizr.com>
	this.test = function()
	{
		var fake = Target.createElement('input');
		return !! ('placeholder' in fake);
	}

	// Get labels with specified class
	// - Avoids using getElementsByClassName and searches for single node type with class within a container.
	this.get = function(Class, Tag, Container)
	{
		var Scope = typeof Container == 'string' ? document.getElementById(Container) : Container;

		if (!Scope || typeof Scope != 'object')
			return;

		var Elements = Scope.getElementsByTagName(Tag), Results = [];

		for (var i = 0; i < Elements.length; i++)
		{
			var String = Elements[i].getAttribute('class') || Elements[i].getAttribute('className');

			if (String && String.indexOf(Class) > -1)
					Results.push(Elements[i]);
		}

		return Results;
	}

	// Create publically accessible object
	this.Labels = this.get(Class, 'label', Target) || [];

	// Loop through nodes
	for (var i = 0; i < this.Labels.length; i++)
	{
		// Get label text and for attribute value
		var Placeholder = this.Labels[i].firstChild.nodeValue,
		    Input = document.getElementById( this.Labels[i].getAttribute('for') || this.Labels[i].getAttribute('htmlFor') );

		// Test for attribute is bound to a text input or text area
		if (Input && (Input.nodeName.toLowerCase() == 'textarea' || Input.type == 'text'))
		{
			// Hide label and set text to target placeholder attribute
			this.Labels[i].style.display = 'none';
			Input.setAttribute('placeholder', Placeholder);

			// Provide Javascript fallback for browsers that do not support the placeholder attribute
			if (!this.test())
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

}