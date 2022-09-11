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


        
        [HttpPost("create-account")]
        public async Task<IActionResult> CreateStudentAccount(CAppUserDto cAppUserDto)
        {
            if(await _accuont.IsUserNameExits(cAppUserDto.userName))
            {
                return BadRequest(new Response<String>("Username Alread Exits"));
            }


            if(cAppUserDto.role == "student"){
                var student = _mapper.Map<Student>(cAppUserDto);
                await _accuont.AddStudent(student); 
            }
            else if(cAppUserDto.role == "teacher")
            {
                var teacher = _mapper.Map<Teacher>(cAppUserDto);
                await _accuont.AddTeacher(teacher);
            }
            else{
                var staff = _mapper.Map<Staff>(cAppUserDto);
                await _accuont.AddStaff(staff);
            }


            var user = new TAppUser 
            {
                id = cAppUserDto.idNumber,
                UserName = cAppUserDto.userName,
                FullName = cAppUserDto.fullName,
                ContractNumber = cAppUserDto.phone
            };
            var _user = _mapper.Map<TUserDto>(user);
            _user.Token = _tokenService.CreateToken(user);

            return Ok(new Response<TUserDto>(_user));
            
        }



        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            
            if(!await _accuont.IsUserNameExits(loginDto.UserName))
            {
                return BadRequest(new Response<string>("username not found"));
            }

            if(!await _accuont.CheckedPassword(loginDto.Password))
            {
                return BadRequest(new Response<string>("Wrong password"));
            }
            
             var user = new TAppUser 
            {
                UserName = loginDto.UserName
            };
            var _user = _mapper.Map<TUserDto>(user);
            _user.Token = _tokenService.CreateToken(user);

            return Ok(new Response<TUserDto>(_user));
        }
    }
}