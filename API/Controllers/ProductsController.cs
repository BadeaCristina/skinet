using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Infrastructure.Data;
using Core.Entities;
using Core.Interfaces;
using Microsoft.Extensions.Logging.Configuration;
using Core.Specifications;
using API.Dtos;
using API.Helpers;
using AutoMapper;
using API.Errors;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
       
        private readonly IGenericRepository<ProductType> _typeRepo;
        private readonly IGenericRepository<ProductBrand> _brandRepo;

        private readonly IGenericRepository<Product> _productRepo;
        private readonly IMapper _mapper;

        public ProductsController(IGenericRepository<Product> productRepo,
                                  IGenericRepository<ProductBrand> brandRepo,
                                  IGenericRepository<ProductType> typeRepo, IMapper mapper)
        {
            _mapper = mapper;
            _brandRepo = brandRepo;
            _typeRepo = typeRepo;
            _productRepo = productRepo;
            
        }

       [HttpGet]
       public async Task<ActionResult<IReadOnlyList<ProductToReturnDto>>> GetProducts(){
         var spec = new ProductsWithTypesAndBrandsSpecification();
         var products= await _productRepo.ListAsync(spec);
        //  return products.Select(product => new ProductToReturnDto{
        //           Id = product.Id,
        //           Name= product.Name,
        //           Description = product.Description,
        //           PictureUrl = product.PictureUrl,
        //           Price =  product.Price,
        //           ProductBrand = product.ProductBrand.Name,
        //           ProductType = product.ProductType.Name
        //    }).ToList();
        return Ok(_mapper.Map<IReadOnlyList< Product>, IReadOnlyList<ProductToReturnDto>>(products));
       }

       [HttpGet("{id}")]
       [ProducesResponseType(StatusCodes.Status200OK)]
       [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]

       public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id){
           var spec = new ProductsWithTypesAndBrandsSpecification(id);
           var product =  await _productRepo.GetEntityWithSpec(spec);
           if(product == null ) return NotFound(new ApiResponse(404));
        //    return new ProductToReturnDto{
        //           Id = product.Id,
        //           Name= product.Name,
        //           Description = product.Description,
        //           PictureUrl = product.PictureUrl,
        //           Price =  product.Price,
        //           ProductBrand = product.ProductBrand.Name,
        //           ProductType = product.ProductType.Name
        //    };
         return _mapper.Map<Product, ProductToReturnDto>(product);
       }

       [HttpGet("brands")]
       public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetBrands(){
        return Ok(await _brandRepo.ListAllAsync());
       }
       [HttpGet("types")]
       public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetTypes(){
        return Ok(await _typeRepo.ListAllAsync());
       }


    }
}