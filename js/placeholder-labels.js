/*!
 * Placeholder labels
 * @author Matt Hinchliffe <http://www.maketea.co.uk>
 * @description This small JavaScript function transforms labels into
 * placeholder attributes for their related form input or select box with
 * JavaScript fallback for browsers that do not support HTML5 spec forms.
 * @see <https://github.com/i-like-robots/Placeholder-Labels>
 * @version 1.3.3
 * @param className
 * @param targetElement
 */
function PlaceholderLabels(className, targetElement)
{
	className = className || 'inline';
	targetElement = targetElement || document;

	if ( ! targetElement || targetElement.nodeName === undefined )
	{
		throw new TypeError();
	}

	/**
	 * Bind
	 * @description Binds a method to an event
	 * @param bindTo Element object
	 * @param event Event name
	 * @param handler Object to receive event
	 */
	function bind(bindTo, event, handler)
	{
		if (bindTo.addEventListener)
		{
			bindTo.addEventListener(event, handler, false);
		}
		else
		{
			bindTo.attachEvent('on' + event, handler);
		}
	}

	/**
	 * Trim
	 * @description Trim whitespace at star and end of a string
	 * @param str
	 */
	function trim(str)
	{
		return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	}

	/**
	 * Contrive
	 * @description Mimics placeholder attribute behaviour
	 * @param targetInput
	 */
	function contrive(targetInput)
	{
		// Set initial value (IE doesn't re-populate input until window.onload event)
		var populate = function()
		{
			var value = trim(targetInput.value);

			if ( ! value || value === targetInput.getAttribute('placeholder') )
			{
				targetInput.value = targetInput.getAttribute('placeholder');
				targetInput.className = targetInput.className + ' placeholder';
			}
		};

		if (document.readyState === 'complete')
		{
			populate();
		}
		else
		{
			bind(window, 'load', populate);
		}

		// Clear placeholder on parent form submit
		if (targetInput.form)
		{
			bind(targetInput.form, 'submit', function()
			{
				if ( targetInput.value === targetInput.getAttribute('placeholder') )
				{
					targetInput.value = '';
				}
			});
		}

		// Ensure caret is at the start of text field on focus
		bind(targetInput, 'focus', function()
		{
			if ( targetInput.value === targetInput.getAttribute('placeholder') )
			{
				if ( targetInput.setSelectionRange )
				{
					targetInput.setSelectionRange(0, 0);
				}
				else if ( targetInput.createTextRange ) // Genius. <http://msdn.microsoft.com/en-us/library/ie/ms536401(v=vs.85).aspx>
				{
					var textRange = targetInput.createTextRange();
					textRange.collapse(true);
					textRange.select();
				}
			}
		});

		// Don't clear the field until a key is pressed
		bind(targetInput, 'keydown', function()
		{
			if ( targetInput.value === targetInput.getAttribute('placeholder') )
			{
				targetInput.value = '';
				targetInput.className = targetInput.className.replace(/\bplaceholder\b/, '');
			}
		});

		// Blur
		bind(targetInput, 'blur', function()
		{
			if ( trim(targetInput.value) === '' )
			{
				targetInput.value = targetInput.getAttribute('placeholder');

				if ( ! targetInput.className.match(/\bplaceholder\b/) )
				{
					targetInput.className = targetInput.className + ' placeholder';
				}
			}
		});
	}

	var labels = function()
	{
		var elementList = [];

		if (document.querySelectorAll) // Try native selector API
		{
			elementList = targetElement.querySelectorAll('label.' + className);
		}
		else // Filter tags the old way
		{
			var labelElements = targetElement.getElementsByTagName('label');
			var i = labelElements.length;

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
	}();

	var nativeSupport = 'placeholder' in document.createElement('input');
	var i = labels.length;

	// Loop through nodes because we can't use array methods without polyfills
	while (i--)
	{
		// Get label text and for attribute value
		var placeholderText = labels[i].firstChild.nodeValue; // Because you can't guarantee 'innerText' value
		var labelTarget = document.getElementById( labels[i].getAttribute('for') || labels[i].getAttribute('htmlFor') );

		if (labelTarget)
		{
			// Visually hide label (placeholders do not replace labels)
			labels[i].style.position = 'absolute';
			labels[i].style.left = '-9999px';
			labels[i].style.width = '1px';
			labels[i].style.height = '1px';

			// Insert label text into a blank option
			if ( labelTarget.nodeName.toLowerCase() === 'select' )
			{
				var option = labelTarget.options[0];
				var optionSelected = labelTarget.selectedIndex ? true : false;

				// First option must have a blank value
				if ( ! option.value)
				{
					option.text = placeholderText;
					option.value = '';

					if ( ! optionSelected)
					{
						option.selected = true;
					}
				}
			}
			else if ( labelTarget.nodeName.toLowerCase() === 'textarea' || /text|email|tel|url|number/i.test(labelTarget.type) )
			{
				labelTarget.setAttribute('placeholder', placeholderText);

				// Provide JavaScript fallback
				if ( ! nativeSupport)
				{
					contrive(labelTarget);
				}
			}
		}
	}

	return labels;
}