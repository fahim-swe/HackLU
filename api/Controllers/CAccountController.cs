using api.Core.Dtos;
using api.Core.Entities.Consumer;
using api.Core.Entities.TransportDept;
using api.Core.Interfaces;
using api.Core.Interfaces.ConsumerDept;
using api.Helper;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    public class CAccountController : BaseApiController
    {
        private readonly IAccountRepository _accuont;
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService;
        public CAccountController(IAccountRepository account, IMapper mapper, ITokenService tokenService)
        {
            _accuont = account;
            _mapper = mapper;
            _tokenService = tokenService;
        }


        
        [HttpPost("student")]
        public async Task<IActionResult> CreateStudentAccount(Student student)
        {
            
            await _accuont.AddStudent(student);
            
            var user = _mapper.Map<TAppUser>(student);
            
            var _user = _mapper.Map<TUserDto>(user);
            _user.Token = _tokenService.CreateToken(user);

            return Ok(new Response<TUserDto>(_user));
        }

    }
}