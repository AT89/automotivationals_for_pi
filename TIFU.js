var load = function()
{
	$.ajax(
		{
			url: 'https://www.reddit.com/r/roadporn.json',
			dataType: 'json',
			success: function(data)
			{
				var post = null;
				while(post == null || post.data.title.match(/wallpaper?/i) || post.data.title.match(/poll/i))
				{
          post = data.data.children[Math.floor(Math.random() * data.data.children.length)];
        }
        if(post.data.url.includes("jpg") || post.data.url.includes("png"))
				{
					$('body').css('background-image', 'url(' + post.data.url+')');
					pic_url = $('#reddit_pic_url').attr("href", post.data.url)
				}
			}
		});

		$.ajax(
			{
				url: 'https://www.reddit.com/r/tifu.json',
				dataType: 'json',
				success: function(data)
				{
					var post = null,
					title = $('h1'),
					contents = $('p')
					//add URL link
					while((post == null || post.data.title.match(/today ? I ? fucked ? up/i))&& post == null || post.data.selftext.match(/today ? I ? fucked ? up/i) ) //not working :(
						{
							post = data.data.children[Math.floor(Math.random() * data.data.children.length)];
							//SLICE(0,4) WHY U NOT WORK
							//changing URL here
							url = $('#reddit_url').attr("href", post.data.url)
							contents = $('p').text(post.data.selftext)
						}
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
					var contents = $('p')
					title.css(
						{
							'margin': '-' + (title.height() / 2) + 'px 0 0'
						});
					});
				});
