/**
 * Placeholder labels
 *
 * @author Matt Hinchliffe <http://www.maketea.co.uk>
 * @description This small Javascript function transforms labels into 
 * placeholder attributes for their related form input or select box with 
 * Javascript fallback for browsers that do not support HTML5 spec forms.
 * @see <https://github.com/i-like-robots/labels-to-placeholders>
 * @version 1.2.3
 * @param className
 * @param targetElement
 */
function PlaceholderLabels(className, targetElement)
{
	"use strict";

	className = className || 'inline';
	targetElement = targetElement || document;

	if ( ! targetElement || targetElement.nodeName === undefined )
	{
		throw new TypeError();
	}

	/**
	 * Bind
	 *
	 * @description Binds a method to an event
	 * @param bindTo Element object
	 * @param event
	 * @param handler
	 */
	var bind = function(bindTo, event, handler)
	{
		if (bindTo.addEventListener)
		{
			bindTo.addEventListener(event, handler, false);
		}
		else
		{
			bindTo.attachEvent('on' + event, handler);
		}
	};

	/**
	 * Contrive
	 *
	 * @description Mimics placeholder attribute behaviour
	 * @param textInput
	 */
	var contrive = function(textInput)
	{
		// Set initial value (IE doesn't re-populate input until window.onload event)
		bind(window, 'load', function()
		{
			var value = textInput.value.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

			if ( ! value || value === textInput.getAttribute('placeholder') )
			{
				textInput.value = textInput.getAttribute('placeholder');
				textInput.className = textInput.className + ' placeholder';
			}
		});

		// Clear placeholder on parent form submit
		if (textInput.form)
		{
			bind(textInput.form, 'submit', function()
			{
				if ( textInput.value === textInput.getAttribute('placeholder') )
				{
					textInput.value = '';
				}
			});
		}

		// Focus
		bind(textInput, 'focus', function()
		{
			if ( textInput.value === textInput.getAttribute('placeholder') )
			{
				textInput.value = '';
				textInput.className = textInput.className.replace(/\bplaceholder\b/, '');
			}
		});

		// Blur
		bind(textInput, 'blur', function()
		{
			if ( textInput.value.replace(/^\s\s*/, '').replace(/\s\s*$/, '') === '' )
			{
				textInput.value = textInput.getAttribute('placeholder');

				if ( ! textInput.className.match(/\bplaceholder\b/) )
				{
					textInput.className = textInput.className + ' placeholder';
				}
			}
		});
	};

	var labels = (function()
	{
		var elementList = [];

		if (document.querySelectorAll) // Try native selector API
		{
			elementList = targetElement.querySelectorAll('label.' + className);
		}
		else // Filter tags the old way
		{
			var labelElements = targetElement.getElementsByTagName('label'),
			    i = labelElements.length;

			while (i--)
			{
				var classAttr = labelElements[i].getAttribute('class') || labelElements[i].getAttribute('className');

				if ( classAttr && classAttr.indexOf(className) > -1 )
				{
					elementList.push( labelElements[i] );
				}
			}
		}

		return elementList;
	})();

	var nativeSupport = 'placeholder' in document.createElement('input'),
	    i = labels.length;

	// Loop through nodes because we can't use array methods without polyfills
	while (i--)
	{
		// Get label text and for attribute value
		var placeholderText = labels[i].firstChild.nodeValue, // Because you can't guarantee 'innerText' value
		    labelTarget = document.getElementById( labels[i].getAttribute('for') || labels[i].getAttribute('htmlFor') );

		if (labelTarget)
		{
			// Hide label
			labels[i].style.display = 'none';

			if ( labelTarget.nodeName.toLowerCase() === 'select' )
			{
				var option = labelTarget.options[0],
				    optionSelected = labelTarget.selectedIndex ? true : false;

				// First option must have a blank value
				if ( ! option.value)
				{
					option.text = placeholderText;
					option.value = '';

					if (!optionSelected)
					{
						option.selected = true;
					}
				}
			}
			else if ( labelTarget.nodeName.toLowerCase() === 'textarea' || labelTarget.type.toLowerCase() === 'text' )
			{
				labelTarget.setAttribute('placeholder', placeholderText);

				// Provide Javascript fallback
				if ( ! nativeSupport)
				{
					contrive(labelTarget);
				}
			}
		}
	}

	return labels;
}