using api.Core.Dtos;
using api.Core.Entities.TransportDept;
using api.Core.Interfaces.TransportDept;
using api.Helper;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
   
   [Authorize]
   
    public class TBusController : BaseApiController
    {
        
        private readonly IUpdateBusInventory _updateBusInventory;
        private readonly IMapper _mapper;
        public TBusController(IUpdateBusInventory updateBusInventory, IMapper mapper)
        {
            _updateBusInventory = updateBusInventory;
            _mapper = mapper;
        }


        [HttpPost]
        public async Task<IActionResult> AddBusInventory(BusInventoryDto busInventoryDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(new Response<string>("Invaid input"));
            }

            var _busInvertory = _mapper.Map<TBusInventory>(busInventoryDto);
            await _updateBusInventory.AddBusInvertory(_busInvertory);

            return Ok(new Response<string>("New Bus inventory added"));
        }


        [HttpPost("create-bus-route")]
        public async Task<IActionResult> CreateBusRoute(TCreateRouteDto createRouteDto)
        {
            var busRoute = _mapper.Map<TBusRoute>(createRouteDto);
            await _updateBusInventory.AddBusRoute(busRoute);

            return Ok(new Response<TBusRoute>(busRoute));
        }


        [HttpGet("bus-routes")]
        public async Task<IActionResult> GetBusRoute()
        {
            var busRoutes = await _updateBusInventory.GetBusRoutes();
            return Ok(busRoutes);
        }

        [HttpGet]
        public async Task<IActionResult> GetAvaiableBus()
        {
            return Ok(await _updateBusInventory.GetAvailableBus());
        }



        

    }
}