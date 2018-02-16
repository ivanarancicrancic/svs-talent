package com.controller;

import com.model.Account;
import com.service.AccountService;
import com.service.RoleService;
import com.settings.errors.InvalidRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.security.Principal;

/**
 * This controller is responsible to manage the authentication
 * system. Login - Register - Forgot password - Account Confirmation
 */
@RestController
public class AuthenticationController extends BaseController{

    @Autowired
    protected AuthenticationManager authenticationManager;

    @Autowired
    private AccountService accountService;

    @RequestMapping(value="/api/sample", method= RequestMethod.GET, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Account> sampleGet(HttpServletResponse response){
        return new ResponseEntity<Account>(accountService.findByUsername("cc"), HttpStatus.CREATED);
    }

    @RequestMapping(value="/api/sample", method= RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Account> sample(HttpServletResponse response){
        return new ResponseEntity<Account>(accountService.findByUsername("papidakos"), HttpStatus.CREATED);
    }

    /**
     * Create a new user account
     * @param account user account
     * @return created account as json
     */
    @RequestMapping(value="/register", method= RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Account> register(@Valid @RequestBody Account account, BindingResult errors){

        // Check if account is unique
        if(errors.hasErrors()){
            throw new InvalidRequestException("Username already exists", errors);
        }

        Account createdAccount = accountService.createNewAccount(account);
        return new ResponseEntity<Account>(createdAccount, HttpStatus.CREATED);
    }


}
