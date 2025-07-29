require("./header.css");
require("../lib/swiper.min.css");
let Swiper = require("../lib/swiper.min.js");
let jsonp = require("../util/jsonp.js");

import React from "react";

let Header = React.createClass({
	getInitialState: function () {
		return {
			imgUrls: [],
			loading: true,
		};
	},

	componentDidMount: function () {
		jsonp(this.props.source, "", "callback", (data) => {
			if (data.status) {
				if (this.isMounted()) {
					this.setState({
						imgUrls: data.data,
						loading: false,
					});
					new Swiper("#header .swiper-container", {
						loop: true,
						pagination: ".swiper-pagination",
						paginationClickable: true,
						autoplay: 3000,
						autoplayDisableOnInteraction: false,
					});
				}
			} else {
				alert(data.msg);
			}
		});
	},

	render: function () {
		let countId = 0;
		return (
			<div id="header">
				{this.state.loading ? (
					<div className="loader">Loading banners...</div>
				) : (
					<div className="swiper-container">
						<div className="swiper-wrapper">
							{this.state.imgUrls.map((url) => {
								return (
									<div className="swiper-slide" key={"header" + countId++}>
										<div className="image-wrapper">
											<img className="img" src={url} alt="Banner" />
											<div className="overlay"></div>
										</div>
									</div>
								);
							})}
						</div>
						<div className="swiper-pagination"></div>
					</div>
				)}
			</div>
		);
	},
});

module.exports = Header;
