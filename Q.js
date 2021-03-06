var load = function()
{
	$.ajax(
		{
			url: 'https://www.reddit.com/r/EarthPorn.json',
			dataType: 'json',
			success: function(data)
			{
				var post = null;
				while(post == null || post.data.title.match(/earthporn?/i) || post.data.title.match(/poll/i))
				{
					post = data.data.children[Math.floor(Math.random() * data.data.children.length)];
				}
        if(post.data.url.includes("jpg") || post.data.url.includes("png"))
        {
          $('body').css('background-image', 'url(' + post.data.url+ ')');
					pic_url = $('#reddit_pic_url').attr("href", post.data.url)
				}
			}
		});

		$.ajax(
			{
				url: 'https://www.reddit.com/r/quotes.json',
				dataType: 'json',
				success: function(data)
				{
					var post = null,
					title = $('h1');
					while(post == null || post.data.title.match(/quotes?/i))
					{
						post = data.data.children[Math.floor(Math.random() * data.data.children.length)];
					}
					//changing URL here
					url = $('#reddit_url').attr("href", post.data.url)
					title.text(post.data.title.trim().replace(/\.$/, ''))
					$(window).trigger('resize');
				}
			});
		};

			$(function()
			{
				load();
				$('body').on('click', load);
				$(window).on('resize scroll', function()
				{
					var title = $('h1');
					var contents = $('#Qcontents')
					title.css(
						{
							'margin': '-' + (title.height() / 2) + 'px 0 0'
						});
					});
				});
