import React from 'react';
import { Navbar, Button } from "react-bootstrap"
import "./navbar.css"
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'


const navbar = (props) => {
	return (
		<>
			<Navbar variant="dark" className="navbar-bg"  >
				<Navbar.Brand href="#home">
					<img
						alt=""
						src="https://ik.imagekit.io/nwiq66cx3pvsy/baseline_fitness_center_black_18dp.png"
						width="30"
						height="30"
						className="d-inline-block align-top"
					/>{' '}
				MeetXercise
				</Navbar.Brand>
				<Navbar.Collapse className="justify-content-end">
					<Button className="mr-3" onClick={() => {

						Swal.fire({
							position: 'bottom-start',
							icon: 'success',
							title: "Room ID : " + localStorage.getItem("room"),
							showConfirmButton: false,
							timer: 2500
						})
					}} variant="secondary" >Setting</Button>
					<Link to="/" className="btn btn-danger">Exit</Link>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
};

export default navbar;