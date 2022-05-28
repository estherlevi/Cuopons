package app.core;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;

import app.core.filters.DelayFilter;
import app.core.filters.LoginFilter;
import app.core.services.JwtUtil;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
public class SpringForAngularProductsApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringForAngularProductsApplication.class, args);
	}

	@Bean
	public FilterRegistrationBean<DelayFilter> delayFilter(@Value("${my.filters.delay.milis: 100}") long delayMilis) {
		FilterRegistrationBean<DelayFilter> registrationBean = new FilterRegistrationBean<>();
		registrationBean.setFilter(new DelayFilter(delayMilis));
		registrationBean.setOrder(1);
		return registrationBean;
	}

	@Bean
	public FilterRegistrationBean<LoginFilter> loginFilter(JwtUtil jwtUtil) {
		FilterRegistrationBean<LoginFilter> registrationBean = new FilterRegistrationBean<>();
		registrationBean.setFilter(new LoginFilter(jwtUtil));
		registrationBean.addUrlPatterns("/api/*");
		registrationBean.setOrder(2);
		return registrationBean;
	}

}
