package com.inn.cafe.POJO;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import lombok.Data;


@NamedQuery(name = "Product.getAllProduct",query ="select new com.inn.cafe.wrapper.ProductWrapper(p.id,p.name,p.decsription,p.price,p.status,p.category.id,p.category.name) from Product p")

@NamedQuery(name ="Product.updateProductStatus",query ="update Product p set p.status=:status where p.id=:id")

@NamedQuery(name ="Product.getProductByCatgory",query ="select new com.inn.cafe.wrapper.ProductWrapper(p.id,p.name) from Product p where p.category.id=:id and p.status='true'")


@NamedQuery(name ="Product.getProductById",query ="select new com.inn.cafe.wrapper.ProductWrapper(p.id,p.name,p.decsription,p.price) from Product p where p.id=:id")

@Data
@Entity
@DynamicUpdate
@DynamicInsert
@Table(name = "product")
public class Product implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;

	@Column(name = "name")
	private String name;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category_fk", nullable = false)
	private Category category;
	
	@Column(name = "decsription")
	private String decsription;
	
	@Column(name = "price")
	private Integer price;
	
	@Column(name = "status")
	private String status;

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

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
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
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
	
	
	

}
