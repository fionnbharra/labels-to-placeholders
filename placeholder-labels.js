/**
 * @author Matt Hinchliffe <http://www.maketea.co.uk>
 * @created 02/02/2011
 * @modified 11/10/2011
 * @see <https://github.com/i-like-robots/Placeholder-Labels>
 */

/**
 * Inline labels
 *
 * @description This small Javascript method turns labels with a specified class into placeholder attributes for their related form input with Javascript
 * fallback for browsers that do not support HTML5 recommended attributes.
 * @version 1.1.0
 * @param className {string}
 * @param $target {object}
 */
function InlineLabels(className, $target)
{
	className = !className ? 'inline' : className;
	$target = $target || document;

	/**
	 * Test
	 *
	 * @description Checks if native placeholder attribute behaviour is supported
	 */
	this.test = function()
	{
		var $temp = document.createElement('input'),
		    support = ('placeholder' in $temp);

		$temp = null; // Clear memory

		return support;
	};

	/**
	 * Get
	 *
	 * @description Get an element by tag and class name. Uses querySelectorAll() or backup.
	 * @param className {string}
	 * @param tagName {string}
	 * @param $scope {object}
	 */
	this.get = function(className, tagName, $scope)
	{
		if (!$scope || typeof $scope !== 'object')
		{
			return;
		}

		var $elements = [];

		if (document.querySelectorAll)
		{
			$elements = $scope.querySelectorAll(tagName + '.' + className);
		}
		else
		{
			var $tags = $scope.getElementsByTagName(tagName),
			    i = $tags.length;

			while (i--)
			{
				var classAttr = $tags[i].getAttribute('class') || $tags[i].getAttribute('className');

				if (classAttr && classAttr.indexOf(className) > -1)
				{
					$elements.push($tags[i]);
				}
			}
		}

		return $elements;
	};

	/**
	 * Bind
	 *
	 * @description Binds a method to an event
	 * @param $target {object}
	 * @param event {string}
	 * @param handler {function}
	 */
	this.bind = function($target, event, handler)
	{
		if ($target.addEventListener)
		{
			$target.addEventListener(event, handler, false);
		}
		else
		{
			$target.attachEvent('on' + event, handler);
		}
	};

	/**
	 * Contrive
	 *
	 * @description Mimics placeholder attribute behaviour
	 * @param $target {object}
	 */
	this.contrive = function($target)
	{
		// Set initial value
		if ($target.value === '')
		{
			$target.value = $target.getAttribute('placeholder');
			$target.className = $target.className + ' placeholder';
		}

		// Focus
		this.bind($target, 'focus', function()
		{
			if ($target.value === $target.getAttribute('placeholder'))
			{
				$target.value = '';
				$target.className = $target.className.replace(/\bplaceholder\b/, '');
			}
		});

		// Blur
		this.bind($target, 'blur', function()
		{
			if (!$target.value || $target.value === '')
			{
				$target.value = $target.getAttribute('placeholder');

				if ($target.className.indexOf('placeholder' > -1))
				{
					$target.className = $target.className + ' placeholder';
				}
			}
		});

		// Clear value on form submit
		if ($target.form)
		{
			this.bind($target.form, 'submit', function()
			{
				if ($target.value === $target.getAttribute('placeholder'))
				{
					$target.value = '';
				}
			});
		}
	};

	this.$labels = this.get(className, 'label', $target) || [];
	this.nativeSupport = this.test();

	var i = this.$labels.length;

	// Loop through nodes
	while (i--)
	{
		// Get label text and for attribute value
		var placeholderText = this.$labels[i].firstChild.nodeValue, // Because you can't guarantee 'innerText' value
		    $input = document.getElementById( this.$labels[i].getAttribute('for') || this.$labels[i].getAttribute('htmlFor') );

		if ($input)
		{
			// Hide label
			this.$labels[i].style.display = 'none';

			if ($input.nodeName.toLowerCase() === 'select') // Select boxes
			{
				var $option = $input.options[0],
					optionSelected = $input.selectedIndex ? true : false;

				// First option must have a blank value
				if (!$option.value)
				{
					$option.text = placeholderText;
					$option.value = '';

					if (!optionSelected)
					{
						$option.selected = true;
					}
				}
			}
			else if ($input.nodeName.toLowerCase() === 'textarea' || $input.type.toLowerCase() === 'text') // Textareas and text inputs
			{
				$input.setAttribute('placeholder', placeholderText);

				// Provide Javascript fallback
				if (!this.nativeSupport)
				{
					this.contrive($input);
				}
			}
		}
	}

}