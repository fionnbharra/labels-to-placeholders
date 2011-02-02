/*
 * Created by:  Matt Hinchliffe <http://www.maketea.co.uk>
 * Date:        02/02/2011
 * Modified:    02/02/2011
 * Version:     0.1
 */

/**
 * getElementsByClassName
 *
 * A simple getElementsByClassName extension that can filter results by tag name
 *
 * @param string Class      Class name to find
 * @param string Tag        Node type to filter by
 * @param string Container  ID of parent node
 * @return bool|object
 */
function getElementsByClassName (Class, Tag, Container)
{
	if (!Class || !Tag)
		return false;

	var Scope = Container ? document.getElementById(Container) : document;

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
}

/**
 * Placeholder Labels
 *
 * Display labels within their assigned input. Requires Modernizr's 'Input Attributes' test.
 *
 * @return void
 */
function placeholder_labels()
{
	var Labels = getElementsByClassName('inline', 'label');

	for (var i = 0; i < Labels.length; i++)
	{
		var $_placeholder = Labels[i].firstChild.nodeValue,
			$_target = document.getElementById( Labels[i].getAttribute('for') || Labels[i].getAttribute('htmlFor') );

		if ($_target)
		{
			Labels[i].style.display = 'none';
			$_target.setAttribute('placeholder', $_placeholder);

			if (!Modernizr.input.placeholder)
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
						this.className = this.className + ' placeholder';
					}
				}
			}
		}
	}
}

// Attach method to body onload
window.onload = function () {
	placeholder_labels();
}