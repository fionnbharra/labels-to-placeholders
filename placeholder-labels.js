/*
 * Created by:  Matt Hinchliffe <http://www.maketea.co.uk>
 * Date:        02/02/2011
 * Modified:    08/04/2011
 * Version:     1.0.0 beta 2
 */

function InlineLabels(Class, Target)
{
	Class = Class === undefined ? 'inline' : Class;
	Target = Target || document;

	// Test if placeholder attribute is natively supported
	// - Test taken from work by Mike Taylr <http://miketaylr.com/code/input-type-attr.html> and Modernizr <http://www.modernizr.com>
	this.test = function()
	{
		if (window.Modernizr && window.Modernizr.input)
		{
			return Modernizr.input.placeholder;
		}
		else
		{
			var fake = document.createElement('input');
			return !! ('placeholder' in fake);
		}
	};

	// Get labels. Optionally filter by specified class or within container.
	// - Avoids using getElementsByClassName and searches for single node type with class within a container.
	this.get = function(Class, Tag, Container)
	{
		var Scope = typeof Container == 'string' ? document.getElementById(Container) : Container;

		if (!Scope || typeof Scope != 'object')
		{
			return;
		}

		var Elements = Scope.getElementsByTagName(Tag), Results = [];

		if (Class)
		{
			for (var i = 0; i < Elements.length; i++)
			{
				var String = Elements[i].getAttribute('class') || Elements[i].getAttribute('className');

				if (String && String.indexOf(Class) > -1)
				{
					Results.push(Elements[i]);
				}
			}

			return Results;
		}

		return Elements;
	};

	// Apply event listener helper
	this.bind = function(target, event, handler)
	{
		if (target.addEventListener)
		{
			target.addEventListener(event, handler, false);
		}
		else
		{
			target.attachEvent('on' + event, handler);
		}
	};

	// Event method are abstracted to avoid instantiation within a loop
	this.contrive = function(target)
	{
		target.value = Placeholder;
		target.className = Input.className + ' placeholder';

		this.bind(target, 'focus', function()
		{
			if (target.value == target.getAttribute('placeholder'))
			{
				target.value = '';
				target.className = target.className.replace(' placeholder', '');
			}
		});

		this.bind(target, 'blur', function()
		{
			if (!target.value || target.value === '')
			{
				target.value = target.getAttribute('placeholder');
				if (target.className.indexOf('placeholder' == -1))
				{
					target.className = target.className + ' placeholder';
				}
			}
		});
	};

	// Create publicly accessible object
	this.Labels = this.get(Class, 'label', Target) || [];
	this.Native = this.test();

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
			if (!this.Native)
			{
				this.contrive(Input);
			}
		}
	}

}