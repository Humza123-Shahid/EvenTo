import React,{ useEffect, useRef,useState } from 'react'
import { Link, useNavigate,useLocation } from "react-router-dom";
import imglogo from '../images/logo.png';

const AboutUs = () => {
    const [loading, setLoading] = useState(true);
          const location = useLocation();
        
          useEffect(() => {
            setLoading(true);
        
            // simulate loading time
            const timer = setTimeout(() => setLoading(false), 1500);
        
            return () => clearTimeout(timer);
          }, [location.pathname]);
        const handleLogout =()=>{
        localStorage.removeItem('token');
      }
  return (
    <div>
      {loading ? 
		<div className="page-loader" >
		<div className="item one"></div>
		</div>:<div className="page-loader" style={{  opacity:' 0',pointerEvents: 'none',transition: 'opacity 2.6s ease'}}>
		<div className="item one"></div>
		</div>
   }
   <header>
	<div class="container">
		<div class="logo"><a href="#" title=""><img src={imglogo} alt="" /></a></div>
		<nav>
			<ul>
				<li><a href="index.html" title=""><span><i class="fa fa-home"></i></span>Home</a>
					<ul>
						<li><a href="index8.html" title="">New Wedding Homepage</a></li>
						<li><a href="index7.html" title="">New Charity Homepage With Sticky Header</a></li>
						<li><a href="index.html" title="">Home Page 1</a></li>
						<li><a href="index2.html" title="">Home Page 2</a></li>
						<li><a href="index3.html" title="">Home Page 3</a></li>
						<li><a href="index4.html" title="">Home Page With Text Carousel</a></li>
						<li><a href="index5.html" title="">Home Page With Kenburns</a></li>
						<li><a href="index6.html" title="">Home Page With Video Slide</a></li>
					</ul>
				</li>
				<li><a href="snaps.html" title=""><span><i class="fa fa-picture-o"></i></span>Gallery</a>
					<ul>
						<li><a href="snaps1.html" title="">Gallery Style 1</a></li>
						<li><a href="snaps2.html" title="">Gallery Style 2</a></li>
						<li><a href="snaps3.html" title="">Gallery Style 3</a></li>
						<li><a href="snaps4.html" title="">Gallery Style 4</a></li>
						<li><a href="snaps5.html" title="">Gallery Style 5</a></li>
					</ul>
				</li>
				<li><a href="#" title=""><span><i class="fa fa-pagelines"></i></span>Pages</a>
					<ul>
						<li><a href="upcoming-event.html" title="">Events</a>
							<ul>
								<li><a href="upcoming-event.html" title="">Upcoming Events</a></li>
								<li><a href="event-detail.html" title="">Event Detail Page</a></li>
								<li><a href="event-detail-sidebar1.html" title="">Event Detail Left Sidebar</a></li>
								<li><a href="event-detail-sidebar2.html" title="">Event Detail Right Sidebar</a></li>
							</ul>
						</li>
						<li><a href="blog.html" title="">Blog</a>
							<ul>
								<li><a href="blog.html" title="">Blog Page</a></li>
								<li><a href="post-detail.html" title="">Blog Single Page</a></li>
								<li><a href="post-detail-sidebar1.html" title="">Blog Single Left Sidebar</a></li>
								<li><a href="post-detail-sidebar2.html" title="">Blog Single Right Sidebar</a></li>
							</ul>
						</li>
						<li><a href="speakers.html" title="">Event Speakers</a></li>
						<li><a href="404.html" title="">Error 404</a></li>
						<li><a href="comming-soon.html" title="">Comming soon Page</a></li>
					</ul>
				</li>
				<li><a href="schedule.html" title=""><span><i class="fa fa-joomla"></i></span>Schedule</a></li>
				<li><Link to="/packages"><span><i className="fa fa-google-wallet"></i></span>Packages</Link></li>
                <li><Link to="/aboutus"><span><i className="fa fa-edit"></i></span>About</Link></li>
                {!localStorage.getItem('token')?
                <li><Link to="/login"><span><i className="fa fa-sign-in"></i></span> Login</Link></li>
                :localStorage.getItem('utype')=="user"?<li><Link to="/login" onClick={handleLogout}><span><i className="fa fa-sign-out"></i></span>Logout</Link></li>
                :<li><Link to="/admin"><span><i className="fa fa-dashboard"></i></span>Dashboard</Link></li>}
			</ul>
		</nav>
	</div>
</header>


<div class="responsive-header">
	<div class="responsive-logo">
		<a href="#" title=""><img src={imglogo} alt="Logo" /></a>
	</div>
	<span><i class="fa fa-align-justify"></i></span>
	<ul>
		<li><a href="index.html" title="">Home</a>
			<ul>
				<li><a href="index8.html" title="">New Wedding Homepage</a></li>
				<li><a href="index7.html" title="">New Charity Homepage With Sticky Header</a></li>
				<li><a href="index.html" title="">Home Page 1</a></li>
				<li><a href="index2.html" title="">Home Page 2</a></li>
				<li><a href="index3.html" title="">Home Page 3</a></li>
				<li><a href="index4.html" title="">Home Page With Text Carousel</a></li>
				<li><a href="index5.html" title="">Home Page With Kenburns</a></li>
				<li><a href="index6.html" title="">Home Page With Video Slide</a></li>
			</ul>
		</li>
		<li><a href="snaps.html" title="">Gallery</a>
			<ul>
				<li><a href="snaps1.html" title="">Gallery Style 1</a></li>
				<li><a href="snaps2.html" title="">Gallery Style 2</a></li>
				<li><a href="snaps3.html" title="">Gallery Style 3</a></li>
				<li><a href="snaps4.html" title="">Gallery Style 4</a></li>
				<li><a href="snaps5.html" title="">Gallery Style 5</a></li>
			</ul>
		</li>
		<li><a href="#" title="">Pages</a>
			<ul>
				<li><a href="upcoming-event.html" title="">Events</a>
					<ul>
						<li><a href="upcoming-event.html" title="">Upcoming Events</a></li>
						<li><a href="event-detail.html" title="">Event Detail Page</a></li>
						<li><a href="event-detail-sidebar1.html" title="">Event Detail Left Sidebar</a></li>
						<li><a href="event-detail-sidebar2.html" title="">Event Detail Right Sidebar</a></li>
					</ul>
				</li>
				<li><a href="blog.html" title="">Blog</a>
					<ul>
						<li><a href="blog.html" title="">Blog Page</a></li>
						<li><a href="post-detail.html" title="">Blog Single Page</a></li>
						<li><a href="post-detail-sidebar1.html" title="">Blog Single Left Sidebar</a></li>
						<li><a href="post-detail-sidebar2.html" title="">Blog Single Right Sidebar</a></li>
					</ul>
				</li>
				<li><a href="schedule.html" title="">Event Schedule Page</a></li>
				<li><a href="speakers.html" title="">Event Speakers</a></li>
				<li><a href="404.html" title="">Error 404</a></li>
				<li><a href="comming-soon.html" title="">Comming soon Page</a></li>
			</ul>
		</li>
		<li><a href="Packages-2.html" title="">Packages</a></li>
		<li><a href="about.html" title="">About</a></li>
        {!localStorage.getItem('token')?
        <li><Link to="/login">Login</Link></li>
        :localStorage.getItem('utype')=="user"?<li><Link to="/login" onClick={handleLogout}>Logout</Link></li>
        :<li><Link to="/admin">Dashboard</Link></li>}
	</ul>
</div>



<section>
	<div class="block gray half-parallax blackish remove-bottom">
		<div style={{background:'url(images/parallax8.jpg)'}} class="parallax"></div>
		<div class="container">
			<div class="row">
				<div class="col-md-offset-2 col-md-8">
					<div class="page-title">
						<span>WE PROVIDE AWESOME DEALS</span>
						<h1>ABOUT <span>US</span></h1>
						<p>Aiusmod tempor incididunt ut labore et dolore magna aliqua consectetur.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section>
	<div class="block gray">
		<div class="container">
			<div class="row">
				<div class="col-md-12 column">
					<div class="remove-ext">
						<div class="about-video">
							<div class="about-detail">
								<h3>Creativity Based <span>on Knowledge</span></h3>
								<p>Integer sollicitudin ligula non enim sodales, non lacinia nunc ornare. Sed commodo temp ibus. Duis convallis turpis in tortor volutpat, eget rhoncus nisi fringilla. Phasellus ornareri euismod varius nullam feugiat ultrices. Sed condimentum est libero, aliquet.Integer sollicitudin ligula non enim sodales, non lacinia nunc ornare. Sed commodo temp ibus. Duis convallis turpis in tortor volutpat, eget rhoncus nisi fringilla. Sed condimentum est libero, aliquet.Integer sollicitudin ligula non enim sodales, non lacinia nunc ornare. Sed commodo temp ibus.</p>
							</div>
							<div class="about-img">
								<img src="images/resource/upcoming-event.jpg" alt="" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>


<section>
	<div class="block remove-gap gray">
		<div class="container">
			<div class="row">
				<div class="col-md-12 column">
					<div class="title">
						<span>WE PROVIDE AWESOME DEALS</span>
						<h2>EVENT <span>SPEAKERS</span></h2>
						<p>Aiusmod tempor incididunt ut labore magna aliqua.</p>
					</div>
					<div class="remove-ext">
						<div class="row">
							<div class="col-md-4">
								<div class="speaker">
									<div class="speaker-img">
										<div><img src="images/resource/speaker1.jpg" alt="" />
										<p>A wonderful sereny has taken possession of my entire soul, like these sweet morningsof spring. Morbi  tincidunt congue venenatis. Fusce at vestibulum nisl, et congue nisi. Vestibulum sollicitudin tellus.</p>
										</div>
									</div>
									<h3>NORMAN WOLF</h3>
									<span>web developer evangelist</span>
								</div>
							</div>
							<div class="col-md-4">
								<div class="speaker">
									<div class="speaker-img">
										<div><img src="images/resource/speaker2.jpg" alt="" />
										<p>A wonderful sereny has taken possession of my entire soul, like these sweet morningsof spring. Morbi  tincidunt congue venenatis. Fusce at vestibulum nisl, et congue nisi. Vestibulum sollicitudin tellus.</p>
										</div>
									</div>
									<h3>RUSSELL MACINERNEY</h3>
									<span>web developer and designer</span>
								</div>
							</div>
							<div class="col-md-4">
								<div class="speaker">
									<div class="speaker-img">
										<div><img src="images/resource/speaker3.jpg" alt="" />
										<p>A wonderful sereny has taken possession of my entire soul, like these sweet morningsof spring. Morbi  tincidunt congue venenatis. Fusce at vestibulum nisl, et congue nisi. Vestibulum sollicitudin tellus.</p>
										</div>
									</div>
									<h3>TED MIDGLEY</h3>
									<span>ceo & founder</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>



<section>
	<div class="block remove-gap gray">
		<div class="container">
			<div class="row">
				<div class="col-md-offset-1 col-md-10 column">
					<div class="become-sponsor">
						<h3>BECOME A SPONSOR</h3>
						<p>Integer sollicitudin ligula non enim sodales, non lacinia nunc ornare. Sed commodo tempor dapibus tortor volutpat, eget rhoncus nisi fringilla. Phasellus ornare risus ineuismod varius.</p>
						<a class="button" href="#" title="">REQUEST NOW</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>


<section>
	<div class="block coloured-layer extra-gap">
	<div style={{background:'url(images/parallax2.jpg)'}} class="parallax"></div>
		<div class="container">
			<div class="row">
				<div class="col-md-12 column">
					<div class="fun-facts">
						<div class="row">
							<div class="col-md-3">
								<div class="counters">
									<img src="images/fun-fact1.png" alt="" />
									<h4>FUN PARTIES</h4>
									<span class="counter">280</span>
								</div>
							</div>
							<div class="col-md-3">
								<div class="counters">
									<img src="images/fun-fact2.png" alt="" />
									<h4>GAME PLAYED</h4>
									<span class="counter">319</span>
								</div>
							</div>
							<div class="col-md-3">
								<div class="counters">
									<img src="images/fun-fact3.png" alt="" />
									<h4>CUP OF COFFEE</h4>
									<span class="counter">640</span>
								</div>
							</div>
							<div class="col-md-3">
								<div class="counters">
									<img src="images/fun-fact4.png" alt="" />
									<h4>MOVIES WATCHED</h4>
									<span class="counter">124</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<footer>
	<div class="block">
		<div class="container">
			<div class="row">
				<div class="col-md-12 column">
					<div class="title">
						<span>WE PROVIDE AWESOME DEALS</span>
						<h2>LET'S SAY <span>HELLO</span></h2>
						<p>Aiusmod tempor incididunt ut labore magna aliqua.</p>
					</div>
					<div class="footer-widgets">
						<div class="row">
							<div class="col-md-4">
								<div class="widget">
									<div class="about">
										<p>Sed do eiusmod tempor incididunt ut labo areet magna aliqua. Ut enim ad minim veniamum doli consectetur adipisicing elit, sed do eiusmod teu aliquam libero quam, non accumsan.</p>
									</div>
									<ul class="contact-info">
										<li><span><i class="fa fa-phone"></i></span>1-223-000-2225</li>
										<li><span><i class="fa fa-envelope-o"></i></span>stillidea@gmail.com</li>
										<li><span><i class="fa fa-map-marker"></i></span>02 Collins Qd Melbourne, Vic 3001</li>
									</ul>
								</div>
							</div>
							<div class="col-md-4">
								<div class="widget">
									<div id="message"></div>
									<form  class="contact" method="post" action="https://templates.stillidea.net/crazyhour/contact.php" name="contactform" id="contactform">
										<input name="name" type="text" id="name" placeholder="Full Name" />
										<input  name="email" type="text" id="email"  placeholder="Email" />
										<textarea name="comments" id="comments"  placeholder="Details"></textarea>
										<button class="button" type="submit" id="submit">REQUEST NOW</button>
									</form>
								</div>
							</div>
							<div class="col-md-4">
								<div class="widget">
									<div class="map">
										<iframe src="https://www.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=uk&amp;aq=&amp;sll=18.312811,-4.306641&amp;sspn=46.292419,86.572266&amp;ie=UTF8&amp;hq=&amp;hnear=United+Kingdom&amp;ll=52.352119,-2.647705&amp;spn=0.685471,1.352692&amp;t=p&amp;z=10&amp;output=embed"></iframe>		
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</footer>
<div class="bottom-footer">
	<div class="container">
		<p>All rights reserved 2015-<a title="" href="#">Crazy Hour</a> By <a title="" href="http://themeforest.net/user/stillidea/portfolio?WT.ac=item_portfolio&amp;WT.z_author=stillidea">stillidea.com</a></p>
	</div>
</div>
    </div>
  )
}

export default AboutUs
