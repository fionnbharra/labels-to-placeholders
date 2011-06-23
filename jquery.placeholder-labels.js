/*
 * Created by:  Matt Hinchliffe <http://www.maketea.co.uk>
 * Date:        25/02/2011
 * Modified:    23/06/2011
 * Version:     1.0.1
 */

(function($)
{
	$.fn.InlineLabels = function()
	{
		return $(this).each(function()
		{
			var $_input = $(this)
				.css('display', 'none')
				.next('input, textarea')
				.attr('placeholder', $(this).text());

			// If HTML5 attributes are not available then contrive support
			if ((window.Modernizr && !Modernizr.input.placeholder) || !('placeholder' in document.createElement('input')))
			{
				$_input
					.val($_input.attr('placeholder'))
					.focus(function()
					{
						if ($_input.val() == $_input.attr('placeholder'))
						{
							$_input
								.val('')
								.toggleClass('placeholder');
						}
					})
					.blur(function()
					{
						if (!$_input.val() || $_input.val() === '')
						{
							$_input
								.val($_input.attr('placeholder'))
								.toggleClass('placeholder');
						}
					});
			}
		});
	}
});
