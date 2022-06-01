package app.core.services;

import java.util.List;
import java.util.Optional;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import app.core.entities.Company;
import app.core.entities.Coupon;
import app.core.entities.Coupon.Category;
import app.core.exceptions.CouponSystemException;

@Service
@Transactional(rollbackFor = CouponSystemException.class)
@Scope("prototype")
public class CompanyService extends ClientService{
	
	private int companyId;	


	@Override
	public boolean login(String email, String password) throws CouponSystemException {
		Optional<Company> login = companyRepo.findByEmailAndPassword(email, password);
		
		if(login.isPresent()){
			System.out.println("succesfuly logged into company with email: "+email+" and password: "+password);
			companyId = login.get().getId();
			return true;
		}
		else {
			throw new CouponSystemException("wrong password or email enetered");
			
		}
		}
	
	

	public Coupon getCoupon(int couponId) throws CouponSystemException {
		Optional<Coupon> opt = this.couponRepo.findById(couponId);
		if (opt.isPresent()) {
			return opt.get();
		} else {
			throw new CouponSystemException("coupon with id " + couponId + " not found");
		}

	}
		public void addCoupon(Coupon coupon) throws CouponSystemException {
			try {
				
				Company company = getCompanyInfo();
				if(couponRepo.existsByDescriptionAndCompanyId(coupon.getDescription(), companyId)) {
					throw new CouponSystemException("can't add coupon with same description as exsisting coupon for this company: "+companyId);
				}
				
				company.add(coupon);
				coupon = this.couponRepo.save(coupon);
				
			} catch (CouponSystemException e) {
			
				throw new CouponSystemException("failed to add coupon to company"+e.getMessage());
			}					
	}

		public void updateCoupon(Coupon coupon) throws CouponSystemException {
			try {
				Coupon couponFromDb = getCoupon(coupon.getId());
			
						couponFromDb.setAmount(coupon.getAmount());
			couponFromDb.setDescription(coupon.getDescription());
			couponFromDb.setStartDate(coupon.getStartDate());
			couponFromDb.setEndDate(coupon.getEndDate());
			couponFromDb.setPrice(coupon.getPrice());
			couponFromDb.setCategory(coupon.getCategory());
			couponFromDb.setImage(coupon.getImage());
			couponFromDb.setTitle(coupon.getTitle());
			
		} catch (Exception e) {throw new CouponSystemException("update coupon failed"+e.getMessage());
		}
		
		}
			
			
		public void deleteCoupon(int couponId) {
			this.couponRepo.deleteById(couponId);
		}


		
	public List<Coupon> GetCouponByCategory(Category categoryName) throws CouponSystemException {
		
			Optional<List<Coupon>> opt = Optional.of(this.couponRepo.findByCategory(categoryName));
			if (opt.isPresent()) {
				System.out.println(opt);
				return opt.get();
			} else {
				throw new CouponSystemException("getCoupon failed - category " + categoryName + " not found");
			}
		}	
	public List <Coupon>GetAllCoupons() throws CouponSystemException{
		try {
			
		List<Coupon> allCoupons = this.couponRepo.findAllByCompanyId(companyId);
		System.out.println(allCoupons);
		return allCoupons;
		
		} catch (Exception e) {
			throw new CouponSystemException("no coupons found",e);
		}
}
	public List <Coupon>GetAllCouponByMaxPrice(double maxPrice) throws CouponSystemException{
		if (maxPrice>-1) {
		List<Coupon> allCouponsByMaxPrice = this.couponRepo.findByCompanyIdAndPriceLessThanEqual(companyId,maxPrice);
		System.out.println(allCouponsByMaxPrice);
		return allCouponsByMaxPrice;
		}
		throw new CouponSystemException("max price is equals or is less then o ");
		
	}
	
	public Company getCompanyInfo() throws CouponSystemException{
		Optional<Company> company = companyRepo.findById(companyId);
		
		if(company.isPresent()) {
			System.out.println(company);
			return company.get();
		}
		
		throw new CouponSystemException("company not found");
	}
}