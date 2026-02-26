import React,{ useEffect, useRef }from 'react'
import { Link, useNavigate } from "react-router-dom";

 import CustomScripts from "./CustomScripts";

//   import "../js/jquery2.1.1.js";
//  import "../js/script.js";
import $ from 'jquery';
// import 'owl.carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
// import useLoadScript from "./useLoadScript";
// import { myGlobalFunction } from "../js/script";
import imgparallax1 from '../images/parallax1.jpg';
import imgparallax2 from '../images/parallax2.jpg';
import imgserviceitem from '../images/resource/services-item1.jpg';
import imgserviceitem2 from '../images/resource/services-item2.jpg';
import imgserviceitem3 from '../images/resource/services-item3.jpg';
import imgservice3 from '../images/resource/service3.png'
import imgservice4 from '../images/resource/service4.png'
import imgservice5 from '../images/resource/service5.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import '../styles/swiperPagination.css';
import { Box, Typography, styled } from '@mui/material';
import imgparallax9 from '../images/parallax9.jpg';
import imglogo from '../images/logo.png';

const Home = () => {
// const carouselRef = useRef(null);
//   useEffect(() => {
//     window.$(".service-carousel").owlCarousel({
// 		loop: true,
// 		smartSpeed : 1000,
// 		autoplay: true,
// 		autoplayTimeout: 3000,
// 		dots: true,
// 		mouseDrag: false,
// 		items:1,
// 		margin: 0,
// 		singleItem: true,
// 		autoplayHoverPause: true,
// 		animateOut: 'fadeOut',
// 		animateIn: 'fadeIn'
// 	});
//   }, []);
const handleLogout =()=>{
    localStorage.removeItem('token');
  }
  useEffect(() => {
	// $( function() { $( 'audio' ).audioPlayer(); } );
   window.jQuery('.tp-banner').revolution({
      delay:9000,
			startwidth:1170,
			startheight:768,
			hideThumbs:10,
			fullWidth:"on",
			forceFullWidth:"off"
   });
}, []);
  return (

   <>
      

   <CustomScripts/>
   

{/* <div className="page-loader">
  <div className="item one"></div>
</div>  */}

<header>
	<div className="container">
		<div className="logo"><a href="#" title=""><img src={imglogo} alt="" /></a></div>
		<nav>
			<ul>
				<li><a href="index.html" title=""><span><i className="fa fa-home"></i></span>Home</a>
				</li>
				<li><Link to="packages"><span><i className="fa fa-google-wallet"></i></span>Packages</Link></li>
				<li><Link to="/aboutus"><span><i className="fa fa-edit"></i></span>About</Link></li>
				 {!localStorage.getItem('token')?
                <li><Link to="/login"><span><i className="fa fa-sign-in"></i></span> Login</Link></li>
                :localStorage.getItem('utype')=="user"?<li><Link to="/login" onClick={handleLogout}><span><i className="fa fa-sign-out"></i></span>Logout</Link></li>
                :<li><Link to="/admin"><span><i className="fa fa-dashboard"></i></span>Dashboard</Link></li>}
			</ul>
		</nav>
	</div>
</header>

<div className="responsive-header">
	<div className="responsive-logo">
		<a href="#" title=""><img src={imglogo} alt="Logo" /></a>
	</div>
	<span><i className="fa fa-align-justify"></i></span>
	<ul>
		<li><a href="index.html" title="">Home</a>
		</li>
	
		
		<li><Link to="packages">Packages</Link></li>
		<li><Link to="/aboutus">About</Link></li>
		 {!localStorage.getItem('token')?
			<li><Link to="/login">Login</Link></li>
			:localStorage.getItem('utype')=="user"?<li><Link to="/login" onClick={handleLogout}>Logout</Link></li>
			:<li><Link to="/admin">Dashboard</Link></li>}
		
	</ul>
</div>


<div className="slider">
	<div className="tp-banner-container">
		<div className="tp-banner">
			<ul>	
				<li data-transition="fadetotopfadefrombottom" data-slotamount="10" data-masterspeed="1000" >
					<img src="images/resource/slider.jpg"  alt="slidebg3"  data-bgfit="cover" data-bgposition="left top" data-bgrepeat="no-repeat"/>
					<div className="tp-caption sfb box-rotated" data-x="center" data-y="220" data-speed="500" data-start="1000" data-easing="Back.easeOut" data-captionhidden="on" style={{width:'250px',height:'250px'}}></div>
					<div className="tp-caption lft slider-icon" data-x="center" data-y="220" data-speed="2000" data-start="2000" data-easing="Back.easeOut" data-captionhidden="on" style={{}}><img src="images/slide-icon.png" alt="" /></div>
					<div className="tp-caption sfb white-text" data-x="center" data-y="260" data-speed="500" data-start="2500" data-easing="Back.easeOut" data-captionhidden="on" style={{fontSize:'13px'}}>November</div>
					<div className="tp-caption sfb coloured-text" data-x="center" data-y="290" data-speed="500" data-start="3000" data-easing="Back.easeOut" data-captionhidden="on" style={{fontSize:'20px'}}>Monday</div>
					<div className="tp-caption sft white-text-big" data-x="center" data-y="360" data-speed="500" data-start="3500" data-easing="Back.easeOut" data-captionhidden="on" style={{fontSize:'105px'}}>08</div>
					<div className="tp-caption sfb slide-title" data-x="center" data-y="450" data-speed="500" data-start="4000" data-easing="Back.easeOut" data-captionhidden="on" style={{fontSize:'40px',padding:'30px 70px'}}>ENJOY <strong>THE WHOLE</strong> NIGHT</div>
					<div className="tp-caption sfb slide-text" data-x="center" data-y="580" data-speed="500" data-start="4500" data-easing="Back.easeOut" data-captionhidden="on" style={{fontSize:'15px'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, accusamus, sed, nec essita tibus <br/> ea nemo hic molestias amet tempora fuga pariatur officia itaque eum quis rerum </div>
				</li>

 				<li data-transition="zoomout" data-slotamount="10" data-masterspeed="1000" >
					<img src="images/resource/slider2.jpg"  alt="slidebg3"  data-bgfit="cover" data-bgposition="left top" data-bgrepeat="no-repeat"/>
					<div className="tp-caption lft slider-icon" data-x="center" data-y="300" data-speed="2000" data-start="2000" data-easing="Back.easeOut" data-captionhidden="on" style={{}}><img src="images/crazy-icon.png" alt="" /></div>
					<div className="tp-caption sfb slide-title2" data-x="center" data-y="440" data-speed="500" data-start="4000" data-easing="Back.easeOut" data-captionhidden="on" style={{fontSize:'55px'}}>ENJOY <strong>THE WHOLE</strong> NIGHT</div>
					<div className="tp-caption sfb slide-text" data-x="center" data-y="500" data-speed="500" data-start="4500" data-easing="Back.easeOut" data-captionhidden="on" style={{fontSize:'15px'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, accusamus, sed, nec essita tibus<br/> ea nemo hic molestias amet tempora fuga pariatur officia itaque eum.</div>
				</li>
 
			</ul>
		</div>	
	</div>	
</div>
<div className="slider-bar">
	<div className="container">
		<div className="bottom-bar">
			<div className="row">
				<div className="col-md-6 column">
					<div className="search-event">
						<h4>Want The Latest Event News</h4>
						<span>Subscribe To Our News Letter And Don’t Forget To Miss Event</span>
						<form>
							<input type="text" placeholder="Enter Your E-mail Address" />
							<input type="submit" value="Submit Now" />
						</form>
					</div>
				</div>
				<div className="col-md-6 column">
					<div className="audio-box">
						<h4>Give Your Life Some New Energy</h4>
						<strong>Unknown Artist</strong>
						<audio preload="auto" controls>
							<source src="BlueDucks_FourFlossFiveSix.mp3"/>
							<source src="BlueDucks_FourFlossFiveSix.ogg"/>
							<source src="BlueDucks_FourFlossFiveSix.wav"/>
						</audio>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div className="app-container">
<section>
	<div className="block gray remove-gap">
		<div className="container">
			<div className="row">
				<div className="col-md-3 column">
					<div className="service-box">
						<span><img src="images/resource/service1.png" alt="" /></span>
						<h3>Award Shows</h3>
						<strong>Awesome Seals</strong>
					</div>
				</div>
				<div className="col-md-6 column">
					{/* <div className="service-carousel"> */}
					<Swiper  loop={true}  autoplay={{
							delay: 3000,
							disableOnInteraction: false,
						}}
						modules={[Autoplay, Pagination]}
						pagination={{ clickable: true }}
						>
						<SwiperSlide>
						<div className="service-item">
							<img src={imgserviceitem} alt="" />
							<div className="service-detail">
								<span><img src={imgservice3} alt="" /></span>
								<h3>Official Meetings</h3>
								<strong>Professinalism</strong>
								<p>Aliquam lorem ante, dapibus in, viquis, feugiat a, tellus. Phasellus is viverra nulla ut metus varius laoreet are quisque rutrum.</p>
							</div>
						</div>
						</SwiperSlide>
						<SwiperSlide>
						<div className="service-item">
							<img src={imgserviceitem2} alt="" />
							<div className="service-detail">
								<span><img src={imgservice4} alt="" /></span>
								<h3>Musical Night</h3>
								<strong>Jump To Music</strong>
								<p>Aliquam lorem ante, dapibus in, viquis, feugiat a, tellus. Phasellus is viverra nulla ut metus varius laoreet are quisque rutrum.</p>
							</div>
						</div>
						</SwiperSlide>
						<SwiperSlide>
						<div className="service-item">
							<img src={imgserviceitem3} alt="" />
							<div className="service-detail">
								<span><img src={imgservice5} alt="" /></span>
								<h3>School Functions</h3>
								<strong>Discount Offer</strong>
								<p>Aliquam lorem ante, dapibus in, viquis, feugiat a, tellus. Phasellus is viverra nulla ut metus varius laoreet are quisque rutrum.</p>
							</div>
						</div>
						</SwiperSlide>
					</Swiper>
				</div>
				<div className="col-md-3 column">
					<div className="service-box">
						<span><img src="images/resource/service2.png" alt="" /></span>
						<h3>Birthday Parties</h3>
						<strong>Sweet Dishes</strong>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section>
	<div className="block remove-gap gray">
		<div className="container">
			<div className="row">
				<div className="col-md-12 column">
					<div className="title">
						<span>WE PROVIDE AWESOME DEALS</span>
						<h2>EVENT <span>SPEAKERS</span></h2>
						<p>Aiusmod tempor incididunt ut labore magna aliqua.</p>
					</div>
					<div className="remove-ext">
						<div className="row">
							<div className="col-md-4">
								<div className="speaker">
									<div className="speaker-img">
										<div><img src="images/resource/speaker1.jpg" alt="" />
										<p>A wonderful sereny has taken possession of my entire soul, like these sweet morningsof spring. Morbi  tincidunt congue venenatis. Fusce at vestibulum nisl, et congue nisi. Vestibulum sollicitudin tellus.</p>
										</div>
									</div>
									<h3>NORMAN WOLF</h3>
									<span>web developer evangelist</span>
								</div>
							</div>
							<div className="col-md-4">
								<div className="speaker">
									<div className="speaker-img">
										<div><img src="images/resource/speaker2.jpg" alt="" />
										<p>A wonderful sereny has taken possession of my entire soul, like these sweet morningsof spring. Morbi  tincidunt congue venenatis. Fusce at vestibulum nisl, et congue nisi. Vestibulum sollicitudin tellus.</p>
										</div>
									</div>
									<h3>RUSSELL MACINERNEY</h3>
									<span>web developer and designer</span>
								</div>
							</div>
							<div className="col-md-4">
								<div className="speaker">
									<div className="speaker-img">
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
	<div className="block gray half-parallax blackish">
		<div style={{backgroundImage: `url(${imgparallax1})`}} className="parallax"></div>
		<div className="container">
			<div className="row">
				<div className="col-md-12">
					<div className="parallax-title">
						<h2>Only <span>240 Days & 5 Hours</span></h2>	
						<h5>Buy The Tickets And Enjoy!</h5>
						<p>Integer sollicitudin ligula non enim sodales, non lacinia nunc ornare. Sed commodo tempor dapibus tortor volutpat, eget rhoncus nisi fringilla. Phasellus ornare risus ineuismod varius.</p>
					</div>

					<div className="remove-ext offers">
						<div className="row">
							<div className="col-md-4">
								<div className="offer">
									<div className="offer-img"><img src="images/resource/offer1.jpg" alt="" /></div>
									<div className="offer-desc">
										<div className="offer-inner">
											<h3>BUY THE TICKETS</h3>
											<h5>94.85$ <span>/PER HEAD</span></h5>
											<p>View or purchase discounted 2014 tickets for The Show and enjoy event.</p>
											<a href="#" title="">BUY NOW</a>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-4">
								<div className="offer">
									<div className="offer-img"><img src="images/resource/offer2.jpg" alt="" /></div>
									<div className="offer-desc">
										<div className="offer-inner">
											<h3>BOOK YOUR EVENT</h3>
											<h5>15.75$ <span>/PER HEAD</span></h5>
											<p>Use our beautiful itinerary planner to get the most out of your day.</p>
											<a href="#" title="">BOOK NOW</a>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-4">
								<div className="offer">
									<div className="offer-img"><img src="images/resource/offer3.jpg" alt="" /></div>
									<div className="offer-desc">
										<div className="offer-inner">
											<h3>EXPLORE THE SHOW</h3>
											<h5>55.85$ <span>/PER HEAD</span></h5>
											<p>From Spitfire fly-overs to artisan crafts, find out what makes the Show so special.</p>
											<a href="#" title="">EXPLORE NOW</a>
										</div>
									</div>
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
	<div className="block remove-gap gray">
		<div className="container">
			<div className="row">
				<div className="col-md-12 column">
					<div className="title">
						<span>WE PROVIDE AWESOME DEALS</span>
						<h2>UPCOMING <span>EVENT</span></h2>
						<p>Aiusmod tempor incididunt ut labore magna aliqua.</p>
					</div>

					<div className="remove-ext">
						<div className="upcoming-event">
							<div className="event-detail">
								<h3>Creativity Based on Knowledge</h3>
								<span><img src="images/event-icon.png" alt="" /> London Thames Valley Golf Club (11256)</span>
								<p>Integer sollicitudin ligula non enim sodales, non lacinia nunc ornare. Sed commodo temp ibus. Duis convallis turpis in tortor volutpat, eget rhoncus nisi fringilla. Phasellus ornareri euismod varius nullam feugiat ultrices. Sed condimentum est libero, aliquet.</p>
								<ul className="countdown">
									<li> 
										<div className="time-box">
											<span className="days">00</span><p className="days_ref">DAYS</p>
										</div>
									</li>
									<li> 
										<div className="time-box">
											<span className="hours">00</span><p className="hours_ref">HOURS</p>
										</div>
									</li>
									<li> 
										<div className="time-box">
											<span className="minutes">00</span><p className="minutes_ref">MINTS</p>
										</div>
									</li>
									<li> 
										<div className="time-box">
											<span className="seconds">00</span><p className="seconds_ref">SECS</p>
										</div>
									</li>
								</ul>							
								<span className="event-date"><strong>24</strong><i>September</i><i>2014</i></span>
							</div>
							<div className="event-img">
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
	<div className="block remove-gap gray">
		<div className="container">
			<div className="row">
				<div className="col-md-12 column">
					<div className="title">
						<span>WE PROVIDE AWESOME DEALS</span>
						<h2>SHOW <span>SNAPS</span></h2>
						<p>Aiusmod tempor incididunt ut labore magna aliqua.</p>
					</div>
					<div className="snaps-gallery">
						<div className="col-md-6">
							<div className="snap style1">
								<div className="gallery-img">
									<img src="images/resource/snap1.jpg" alt="" />
									<a data-rel="prettyPhoto" href="http://placehold.it/1000x800" title=""><i className="fa fa-search"></i></a>
								</div>
								<div className="snap-detail">
									<h4>RICK STAIN CLIMBING</h4>
									<p>Integer sollicitudin ligula non enim dales, non lacinoia nunc ornareed commodo tempior dapibus.<a href="#" title="">Read More <i className="fa fa-angle-double-right"></i></a> </p>
								</div>
							</div>
							<div className="snap style2">
								<div className="gallery-img">
									<img src="images/resource/snap2.jpg" alt="" />
									<a data-rel="prettyPhoto" href="http://placehold.it/1000x800" title=""><i className="fa fa-search"></i></a>
								</div>
								<div className="snap-detail">
									<h4>Muzic Artists & Bands</h4>
									<p>Integer sollicitudin ligula non enim dales, non lacinoia nunc ornareed commodo tempior dapibus.<a href="#" title="">Read More <i className="fa fa-angle-double-right"></i></a> </p>
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="snap style1">
								<div className="snap-detail">
									<h4>Inspir & Education</h4>
									<p>Integer sollicitudin ligula non enim dales, non lacinoia nunc ornareed commodo tempior dapibus.<a href="#" title="">Read More <i className="fa fa-angle-double-right"></i></a> </p>
								</div>
								<div className="gallery-img">
									<img src="images/resource/snap3.jpg" alt="" />
									<a data-rel="prettyPhoto" href="http://placehold.it/1000x800" title=""><i className="fa fa-search"></i></a>
								</div>
							</div>
							<div className="snap style2">
								<div className="snap-detail">
									<h4>Second Day Event</h4>
									<p>Integer sollicitudin ligula non enim dales, non lacinoia nunc ornareed commodo tempior dapibus.<a href="#" title="">Read More <i className="fa fa-angle-double-right"></i></a> </p>
								</div>
								<div className="gallery-img">
									<img src="images/resource/snap4.jpg" alt="" />
									<a data-rel="prettyPhoto" href="http://placehold.it/1000x800" title=""><i className="fa fa-search"></i></a>
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
	<div className="block blackish">
		<div style={{backgroundImage: `url(${imgparallax9})`}} className="parallax"></div>
		<div className="container">
			<div className="row">
				<div className="col-md-12 column">
					<div className="video-parallax">
						<h3>100% <span>ULTRA RESPONSIVE</span></h3>
						<span>& Video Ready </span>
						<p>Integer sollicitudin ligula non enim sodales, non lacinia nunc ornare. Sed commodo tempor dapibus tortor volutpat, eget rhoncus nisi fringilla. Phasellus ornare risus ineuismod varius.</p>
						<a href="http://vimeo.com/44867610"  data-rel="prettyPhoto" title=""><i className="fa fa-play"></i></a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>


<section>
	<div className="block gray">
		<div className="container">
			<div className="row">
				<div className="col-md-12 column">
					<div className="title">
						<span>WE PROVIDE AWESOME DEALS</span>
						<h2>EVENT <span>PACKAGES</span></h2>
						<p>Aiusmod tempor incididunt ut labore magna aliqua.</p>
					</div>

					<div className="remove-ext">
						<div className="row">
							<div className="col-md-6">
								<div className="package">
									<div className="row">
										<div className="col-md-8">
											<div className="package-img"><img src="images/resource/package1.jpg" alt="" /></div>
										</div>
										<div className="col-md-4">
											<strong><i>$</i>354<span>/Per Set</span></strong>
											<span className="shortline"><i>209</i> Sets With Refreshmenta</span>
											<div className="package-info">
												<h3><a href="event-detail.html" title="">Sed Porttitor Ferment – Ipsum</a></h3>
												<span>By; Jackson thoms</span>
											</div>
											<a href="#" title="">BOOK NOW</a>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-6">
								<div className="package">
									<div className="row">
										<div className="col-md-8">
											<div className="package-img"><img src="images/resource/package2.jpg" alt="" /></div>
										</div>
										<div className="col-md-4">
											<strong><i>$</i>126<span>/Per Set</span></strong>
											<span className="shortline"><i>250</i> Sets With Refreshmenta</span>
											<div className="package-info">
												<h3><a href="event-detail.html" title="">Sed Porttitor Ferment – Ipsum</a></h3>
												<span>By; Jackson thoms</span>
											</div>
											<a href="#" title="">BOOK NOW</a>
										</div>
									</div>
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
	<div className="block remove-gap gray">
		<div className="container">
			<div className="row">
				<div className="col-md-12 column">
					<div className="title">
						<span>WE PROVIDE AWESOME DEALS</span>
						<h2>EVENT <span>SPONSORS</span></h2>
						<p>Aiusmod tempor incididunt ut labore magna aliqua.</p>
					</div>
					<div className="event-sponsors remove-ext">
						<div className="row">
							<div className="col-md-3">
								<div className="sponsor"><img src="images/resource/sponsor1.png" alt="" /></div>
							</div>
							<div className="col-md-3">
								<div className="sponsor"><img src="images/resource/sponsor2.png" alt="" /></div>
							</div>
							<div className="col-md-3">
								<div className="sponsor"><img src="images/resource/sponsor3.png" alt="" /></div>
							</div>
							<div className="col-md-3">
								<div className="sponsor"><img src="images/resource/sponsor4.png" alt="" /></div>
							</div>
							<div className="col-md-3">
								<div className="sponsor"><img src="images/resource/sponsor5.png" alt="" /></div>
							</div>
							<div className="col-md-3">
								<div className="sponsor"><img src="images/resource/sponsor6.png" alt="" /></div>
							</div>
							<div className="col-md-3">
								<div className="sponsor"><img src="images/resource/sponsor7.png" alt="" /></div>
							</div>
							<div className="col-md-3">
								<div className="sponsor"><img src="images/resource/sponsor8.png" alt="" /></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section>
	<div className="block remove-gap gray">
		<div className="container">
			<div className="row">
				<div className="col-md-offset-1 col-md-10 column">
					<div className="become-sponsor">
						<h3>BECOME A SPONSOR</h3>
						<p>Integer sollicitudin ligula non enim sodales, non lacinia nunc ornare. Sed commodo tempor dapibus tortor volutpat, eget rhoncus nisi fringilla. Phasellus ornare risus ineuismod varius.</p>
						<a className="button" href="#" title="">REQUEST NOW</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>


<section>
	<div className="block coloured-layer extra-gap">
	<div style={{backgroundImage: `url(${imgparallax2})`}} className="parallax"></div>
		<div className="container">
			<div className="row">
				<div className="col-md-12 column">
					<div className="fun-facts">
						<div className="row">
							<div className="col-md-3">
								<div className="counters">
									<img src="images/fun-fact1.png" alt="" />
									<h4>FUN PARTIES</h4>
									<span className="counter">280</span>
								</div>
							</div>
							<div className="col-md-3">
								<div className="counters">
									<img src="images/fun-fact2.png" alt="" />
									<h4>GAME PLAYED</h4>
									<span className="counter">319</span>
								</div>
							</div>
							<div className="col-md-3">
								<div className="counters">
									<img src="images/fun-fact3.png" alt="" />
									<h4>CUP OF COFFEE</h4>
									<span className="counter">640</span>
								</div>
							</div>
							<div className="col-md-3">
								<div className="counters">
									<img src="images/fun-fact4.png" alt="" />
									<h4>MOVIES WATCHED</h4>
									<span className="counter">124</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

</div>
<footer>
	<div className="block">
		<div className="container">
			<div className="row">
				<div className="col-md-12 column">
					<div className="title">
						<span>WE PROVIDE AWESOME DEALS</span>
						<h2>LET'S SAY <span>HELLO</span></h2>
						<p>Aiusmod tempor incididunt ut labore magna aliqua.</p>
					</div>
					<div className="footer-widgets">
						<div className="row">
							<div className="col-md-4">
								<div className="widget">
									<div className="about">
										<p>Sed do eiusmod tempor incididunt ut labo areet magna aliqua. Ut enim ad minim veniamum doli consectetur adipisicing elit, sed do eiusmod teu aliquam libero quam, non accumsan.</p>
									</div>
									<ul className="contact-info">
										<li><span><i className="fa fa-phone"></i></span>1-223-000-2225</li>
										<li><span><i className="fa fa-envelope-o"></i></span>stillidea@gmail.com</li>
										<li><span><i className="fa fa-map-marker"></i></span>02 Collins Qd Melbourne, Vic 3001</li>
									</ul>
								</div>
							</div>
							<div className="col-md-4">
								<div className="widget">
									<div id="message"></div>
									<form  className="contact" method="post" action="https://templates.stillidea.net/crazyhour/contact.php" name="contactform" id="contactform">
										<input name="name" type="text" id="name" placeholder="Full Name" />
										<input  name="email" type="text" id="email"  placeholder="Email" />
										<textarea name="comments" id="comments"  placeholder="Details"></textarea>
										<button className="button" type="submit" id="submit">REQUEST NOW</button>
									</form>
								</div>
							</div>
							<div className="col-md-4">
								<div className="widget">
									<div className="map">
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

<div className="bottom-footer">
	<div className="container">
		<p>All rights reserved 2015-<a title="" href="#">Crazy Hour</a> By <a title="" href="http://themeforest.net/user/stillidea/portfolio?WT.ac=item_portfolio&amp;WT.z_author=stillidea">stillidea.com</a></p>
	</div>
</div>

 </>
    
  )
}

export default Home
