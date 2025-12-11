import React,{ useEffect, useRef,useState,useContext } from 'react'
import { Link, useNavigate,useLocation } from "react-router-dom";
 import packageContext from '../context/packageContext'
 import CustomScripts from "./CustomScripts";

import imglogo from '../images/logo.png';
import imgparallax8 from '../images/parallax8.jpg';
import imgpackage1 from '../images/resource/package1.jpg';
import imgpackage2 from '../images/resource/package2.jpg';
import imgpackage3 from '../images/resource/package3.jpg';
import imgpackage4 from '../images/resource/package4.jpg';

const Packages = () => {
	const images = {
  1: imgpackage1,
  2: imgpackage2,
  3: imgpackage3,
  4: imgpackage4
};
	const [loading, setLoading] = useState(true);
	  const location = useLocation();
	const context=useContext(packageContext);
  const {packages,getPackages}=context;
	  useEffect(() => {
		setLoading(true);
	
		// simulate loading time
		const timer = setTimeout(() => setLoading(false), 1500);
	
		return () => clearTimeout(timer);
	  }, [location.pathname]);
    const handleLogout =()=>{
    localStorage.removeItem('token');
  }
   useEffect(() => {
            const fetchData = async () => {
            const result = await getPackages();
           
		};
      
          fetchData();
          }, []); 
  return (
    <>
	<CustomScripts/>
   {loading ? 
		<div className="page-loader" >
		<div className="item one"></div>
		</div>:<div className="page-loader" style={{  opacity:' 0',pointerEvents: 'none',transition: 'opacity 2.6s ease'}}>
		<div className="item one"></div>
		</div>
   }

    
    <header>
        <div className="container">
            <div className="logo"><a href="#" title=""><img src={imglogo} alt="" /></a></div>
            <nav>
                <ul>
                    <li><a href="index.html" title=""><span><i className="fa fa-home"></i></span>Home</a>
                       
                    </li>                     
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



<section>
	<div className="block gray half-parallax blackish remove-bottom">
		<div style={{backgroundImage: `url(${imgparallax8})`}} className="parallax"></div>
		<div className="container">
			<div className="row">
				<div className="col-md-offset-2 col-md-8">
					<div className="page-title">
						<span>WE PROVIDE AWESOME DEALS</span>
						<h1>EVENT <span>PACKAGES</span></h1>
						<p>Aiusmod tempor incididunt ut labore et dolore magna aliqua consectetur.</p>
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
					<div className="remove-ext">
						<div className="row">
							{Array.isArray(packages) &&packages.map((row,index) => {
							const imagename="imgpackage"+(index+1);
							console.log(imagename)
               				return (row.AvailabilityStatus==true) ?<><div className="col-md-6">
								<div className="package">
									<div className="row">
										<div className="col-md-8">
											<div className="package-img"><img src={images[index+1]} alt="" /></div>
										</div>
										<div className="col-md-4">
											<strong><i>$</i>{row.Price}<span>/Per Set</span></strong>
											<span className="shortline"><i>{((index+1)*100)+50}</i> Sets With Refreshmenta</span>
											{/* <a href="#" title="">BOOK NOW</a> */}
											<div className="package-info">
												<h3><a href="#" title="">{row.PackageName} – {row.PackageType}</a></h3>
												<span>{row.Description}</span>
											</div>
										</div>
									</div>
								</div>
							</div></>:<></>
							})}
							{/* <div className="col-md-6">
								<div className="package">
									<div className="row">
										<div className="col-md-8">
											<div className="package-img"><img src={imgpackage1} alt="" /></div>
										</div>
										<div className="col-md-4">
											<strong><i>$</i>354<span>/Per Set</span></strong>
											<span className="shortline"><i>209</i> Sets With Refreshmenta</span>
											<a href="#" title="">BOOK NOW</a>
											<div className="package-info">
												<h3><a href="#" title="">Sed Porttitor Ferment – Ipsum</a></h3>
												<span>By; Jackson thoms</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-6">
								<div className="package">
									<div className="row">
										<div className="col-md-8">
											<div className="package-img"><img src={imgpackage2} alt="" /></div>
										</div>
										<div className="col-md-4">
											<strong><i>$</i>126<span>/Per Set</span></strong>
											<span className="shortline"><i>250</i> Sets With Refreshmenta</span>
											<a href="#" title="">BOOK NOW</a>
											<div className="package-info">
												<h3><a href="#" title="">Experience More - Hotel Credit</a></h3>
												<span>By; Jackson thoms</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-6">
								<div className="package">
									<div className="row">
										<div className="col-md-8">
											<div className="package-img"><img src={imgpackage3} alt="" /></div>
										</div>
										<div className="col-md-4">
											<strong><i>$</i>396<span>/Per Set</span></strong>
											<span className="shortline"><i>209</i> Sets With Refreshmenta</span>
											<a href="#" title="">BOOK NOW</a>
											<div className="package-info">
												<h3><a href="#" title="">Nullam dolor ultricies vehicula</a></h3>
												<span>By; Jackson thoms</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-6">
								<div className="package">
									<div className="row">
										<div className="col-md-8">
											<div className="package-img"><img src={imgpackage4} alt="" /></div>
										</div>
										<div className="col-md-4">
											<strong><i>$</i>209<span>/Per Set</span></strong>
											<span className="shortline"><i>250</i> Sets With Refreshmenta</span>
											<a href="#" title="">BOOK NOW</a>
											<div className="package-info">
												<h3><a href="#" title="">Nulla vitae elit libero</a></h3>
												<span>By; Jackson thoms</span>
											</div>
										</div>
									</div>
								</div>
							</div> */}
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</section>



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

export default Packages
