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


            if(cAppUserDto.role == "staff"){
               

                 var staff = _mapper.Map<Staff>(cAppUserDto);
                await _accuont.AddStaff(staff);
            }
            else if(cAppUserDto.role == "teacher")
            {
                var teacher = _mapper.Map<Teacher>(cAppUserDto);
                await _accuont.AddTeacher(teacher);
            }
            else{
                var student = _mapper.Map<Student>(cAppUserDto);
                await _accuont.AddStudent(student); 
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
    
    
        [HttpPost("update-student")]
        public async Task<IActionResult> UpdateStudent(StudentUpdateDto studentUpdate)
        {
            await _accuont.UpdateStudentProfile(studentUpdate);
            return Ok(new Response<string>("Update Student Profile"));
        }


        [HttpPost("get-student")]
        public async Task<IActionResult> GetStudent([FromBody]string userName)
        {
            return Ok(await _accuont.GetStudent(userName));
        }


    }


    
}