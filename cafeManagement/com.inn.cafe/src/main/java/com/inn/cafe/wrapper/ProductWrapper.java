package com.inn.cafe.wrapper;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProductWrapper {

	Integer id;

	String name;

	String decsription;

	Integer price;

	String Status;

	Integer categoryId;

	String categoryName;

	public ProductWrapper() {

	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDecsription() {
		return decsription;
	}

	public void setDecsription(String decsription) {
		this.decsription = decsription;
	}

	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}

	public String getStatus() {
		return Status;
	}

	public void setStatus(String status) {
		Status = status;
	}

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public ProductWrapper(Integer id, String name, String decsription, Integer price, String status, Integer categoryId,
			String categoryName) {
		super();
		this.id = id;
		this.name = name;
		this.decsription = decsription;
		this.price = price;
		this.Status = status;
		this.categoryId = categoryId;
		this.categoryName = categoryName;
	}

	public ProductWrapper(Integer id, String name) {
		this.id = id;
		this.name = name;
	}

	public ProductWrapper(Integer id, String name, String decsription, Integer price) {
		this.id = id;
		this.name = name;
		this.decsription = decsription;
		this.price = price;
	}

}
