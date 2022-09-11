using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Core.Dtos;
using api.Core.Entities.TransportDept;
using AutoMapper;

namespace api.Helper
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles(){
            CreateMap<TAppUser, TUserDto>();
            CreateMap<BusInventoryDto, TBusInventory>();
            CreateMap<TCreateRouteDto, TBusRoute>();
        }
    }
}