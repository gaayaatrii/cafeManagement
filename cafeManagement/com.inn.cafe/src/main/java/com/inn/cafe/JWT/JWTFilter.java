package com.inn.cafe.JWT;

import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JWTFilter extends OncePerRequestFilter {


    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomerUsersDetailsService service;

    Claims claims = null;
    private String userName = null;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        if (request.getServletPath().matches("/user/login|/user/signUp|/user/forgotPassword")) {
            filterChain.doFilter(request, response);
        } else {
            String authorizationHeader = request.getHeader("Authorization");
            String token = null;

            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                token = authorizationHeader.substring(7);
                userName = jwtUtil.extractUsername(token);
                claims = jwtUtil.extractAllClaims(token);
                System.out.println("claims :-"+claims);

            }

            if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = service.loadUserByUsername(userName);

                if (jwtUtil.validateToken(token, userDetails)) {
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                    usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);

                }
            }


            filterChain.doFilter(request, response);
        }
    }

    public boolean isAdmin(){
        return "admin".equalsIgnoreCase((String)claims.get("role"));
    }

    public boolean isUser(){
        return "user".equalsIgnoreCase((String)claims.get("role"));
    }

    public String getCurrentUser(){
        return userName;
    }

//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        // Existing code remains the same
//        if (request.getServletPath().matches("/user/login|/user/signUp|/user/forgotPassword|/user/get|/user/update")) {
//            filterChain.doFilter(request, response);
//        } else {
//            String authorizationHeader = request.getHeader("Authorization");
//            String token = null;
//            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
//                token = authorizationHeader.substring(7);
//                userName = jwtUtil.extractUsername(token);
//                Claims claims = jwtUtil.extractAllClaims(token); // Extract claims here
//                System.out.println("claims: " + claims);
//
//                if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//                    UserDetails userDetails = service.loadUserByUsername(userName);
//
//                    if (jwtUtil.validToken(token, userDetails)) {
//                        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
//                                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
//
//                        usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//
//                        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
//                    }
//                }
//            }
//
//            filterChain.doFilter(request, response);
//        }
//    }
//
//    // Existing code remains the same except for the isAdmin and isUser methods
//
//    public boolean isAdmin(HttpServletRequest request){
//        Claims claims = extractClaimsFromToken(request);
//        return claims != null && "admin".equalsIgnoreCase((String)claims.get("role"));
//    }
//
//    public boolean isUser(HttpServletRequest request){
//        Claims claims = extractClaimsFromToken(request);
//        return claims != null && "user".equalsIgnoreCase((String)claims.get("role"));
//    }
//
//    private Claims extractClaimsFromToken(HttpServletRequest request) {
//        String authorizationHeader = request.getHeader("Authorization");
//        String token = null;
//
//        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
//            token = authorizationHeader.substring(7);
//            return jwtUtil.extractAllClaims(token);
//        }
//        return null;
//    }
//
//
//    public String getCurrentUser(){
//        return userName;
//    }


}