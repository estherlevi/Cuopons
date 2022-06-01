package app.core.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import app.core.entities.Coupon;
import app.core.entities.Coupon.Category;
import app.core.entities.Customer;
import app.core.exceptions.CouponSystemException;

@Service
@Transactional(rollbackFor = CouponSystemException.class)
@Scope("prototype")
public class CustomerService extends ClientService{
	
private  int customerId;	
	
	//use with refresh. when using a List
	//@Autowired
	//private EntityManager em;

	@Override
	public boolean login(String email, String password) throws CouponSystemException {
		Optional<Customer> login = customerRepo.findByEmailAndPassword(email, password);
		
		if(login.isPresent()){
			System.out.println("succesfuly logged into customer with email: "+email+" and password: "+password);
			customerId = login.get().getId();
			return true;
		}
		else {
			throw new CouponSystemException("wrong password or email enetered for customer");
			
		}
		}
	
	

		public void addCouponPurchase(int couponId) throws CouponSystemException  {
		
				try {
					
				
				Coupon coupon = couponRepo.findById(couponId).get();			
				Customer customer = getCustomerInfo();
				if(customerRepo.existsByIdAndCouponsId(customerId, couponId)) {
				
					throw new CouponSystemException("can't purcahse coupon more then once");
				}else if (coupon.getAmount()==0) {
						
						throw new CouponSystemException("no more coupon left to purchase");
						
				}else if(coupon.getEndDate().isBefore(LocalDate.now())) {
					throw new CouponSystemException("can't purchase this coupon : date expired");
				}else {
					
					customer.getCoupons().add(coupon);
					coupon.setAmount(coupon.getAmount()-1);
				}
				 
				} catch (Exception e) {
					throw new CouponSystemException("couldn't purchase coupon: "+couponId+" for customer: "+customerId+" cause: "+e.getMessage());
				}
			}	 
				

		
		public List <Coupon> getAllCouponsOfCustomer() throws CouponSystemException{
			try {
				
			List<Coupon> allCoupons = this.couponRepo.findByCustomersId(customerId);
			System.out.println(allCoupons);
			return allCoupons;
			
			} catch (Exception e) {
				throw new CouponSystemException("no coupons found",e);
			}
		}
			
			
	public List<Coupon> getCouponByCategory(Category categoryName) throws CouponSystemException {
		
			Optional<List<Coupon>> opt = Optional.of(this.couponRepo.findByCategoryAndCustomersId(categoryName,customerId));
			if (opt.isPresent()) {
				System.out.println(opt);
				return opt.get();
			} else {
				throw new CouponSystemException("getCoupon failed - category " + categoryName + " not found");
			}
		}	
	
	public List <Coupon>GetAllCouponByMaxPrice(double maxPrice) throws CouponSystemException{
		if (maxPrice>-1) {
		List<Coupon> allCouponsByMaxPrice = this.couponRepo.findByCustomersIdAndPriceLessThanEqual(customerId,maxPrice);
		System.out.println(allCouponsByMaxPrice);
		return allCouponsByMaxPrice;
		}
		throw new CouponSystemException("max price is equals or is less then o ");
		
	}
	
	public Customer getCustomerInfo() throws CouponSystemException{
		Optional<Customer> customer = customerRepo.findById(customerId);
		
		if(customer.isPresent()) {
			System.out.println(customer);
			return customer.get();
		}
		
		throw new CouponSystemException("customer not found");
	}

	
}