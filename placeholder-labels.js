/*
 * Created by:  Matt Hinchliffe <http://www.maketea.co.uk>
 * Date:        02/02/2011
 * Modified:    03/02/2011
 * Version:     0.2.0
 */

window.InlineLabel = (function(Class, Target) {

	// Test if placeholder attribute is natively supported
	// - Test taken from work by Mike Taylr <http://miketaylr.com/code/input-type-attr.html> and Modernizr <http://www.modernizr.com>
	function test()
	{
		var input = Target.createElement('input'),
		    support = !! ('placeholder' in input);

		input = null;

		return support;
	};


	// Get labels with specified class
	// - Avoids using getElementsByClassName and searches for single node type with class within a container.
	function get(Class, Tag, Container)
	{
		if (!Class || !Tag)
			return false;

		var Scope = typeof Container == 'string' ? document.getElementById(Container) : document;

		if (!Scope)
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
	};

	// Gather label nodes
	var Labels = get(Class, 'label', Target);

	// Loop through nodes
	for (var i = 0; i < Labels.length; i++)
	{
		// Get label text and for attribute value
		var $_placeholder = Labels[i].firstChild.nodeValue,
			$_target = document.getElementById( Labels[i].getAttribute('for') || Labels[i].getAttribute('htmlFor') );

		if ($_target)
		{
			// Hide label and set text to target placeholder attribute
			Labels[i].style.display = 'none';
			$_target.setAttribute('placeholder', $_placeholder);

			// If native placeholder support is not available available then do it the old fashioned way
			if (!test())
			{
				$_target.value = $_placeholder;
				$_target.className = $_target.className + ' placeholder';

				$_target.onfocus = function()
				{
					if (this.value == this.getAttribute('placeholder'))
					{
						this.value = '';
						this.className = this.className.replace(' placeholder')
					}
				}

				$_target.onblur = function()
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