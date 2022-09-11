using api.Core.Entities.TransportDept;
using api.Core.Interfaces.TransportDept;
using api.Helper;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
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

            await _updateBusInventory.AddBusInvertory(_mapper.Map<TBusInventory>(busInventoryDto));

            return Ok(new Response<string>("New Bus inventory added"));
        }


        [HttpPost("create-bus-route")]
        public async Task<IActionResult> CreateBusRoute()
        {

            
            return Ok("");
        }

    }
}