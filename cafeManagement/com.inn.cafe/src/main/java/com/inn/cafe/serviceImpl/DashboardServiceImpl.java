package com.inn.cafe.serviceImpl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.inn.cafe.doa.BillDao;
import com.inn.cafe.doa.CategoryDao;
import com.inn.cafe.doa.ProductDao;
import com.inn.cafe.service.DashboardService;

@Service
public class DashboardServiceImpl implements DashboardService {

	@Autowired
	CategoryDao categoryDao;

	@Autowired
	ProductDao productDao;

	@Autowired
	BillDao billDao;

	@Override
	public ResponseEntity<Map<String, Object>> getcount() {

		Map<String, Object> map = new HashMap();
		map.put("Category", categoryDao.count());
		map.put("Product", productDao.count());
		map.put("Bill", billDao.count());

		return new ResponseEntity<>(map, HttpStatus.OK);
	}

}
