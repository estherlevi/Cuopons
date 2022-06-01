package app.core.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import app.core.exceptions.CouponSystemException;
import app.core.login.ClientType;
import app.core.login.LoginManager;

@CrossOrigin
@RestController
public class LoginController {
	
	@Autowired
	private LoginManager loginManager;

	@PostMapping("/login")
	public String login(@RequestParam String email, @RequestParam String password,@RequestParam ClientType clientType) {
		try {
			loginManager.login(email, password, clientType);
		} catch (CouponSystemException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
		System.out.println("login works");
		return "login works! "+ email + " " +password;
	}
	
}