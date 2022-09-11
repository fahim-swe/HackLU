using System.Security.Cryptography;
using System.Text;
using api.Core.Dtos;
using api.Core.Entities.TransportDept;
using api.Core.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
            
        private readonly TIAccountRepository _taccount;  
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        public AccountController(TIAccountRepository tIAccountRepository, ITokenService tokenService, IMapper mapper)
        {
            _taccount = tIAccountRepository;
            _tokenService = tokenService;
            _mapper = mapper;
        } 


        
        [HttpPost("register")]
        public async Task<IActionResult> CreateAccount(TCreateDto registerDTO)
        {
                
                if(!ModelState.IsValid){
                    return BadRequest("Enter Wrong Data Format");
                }

              

                if(await _taccount.IsUsernameExits(registerDTO.UserName)) 
                    return BadRequest("Username already exits");
                    
                using var hmac = new HMACSHA512();
                var user = new TAppUser{
                    UserName = registerDTO.UserName,
                    FullName = registerDTO.FullName, 
                    ContractNumber = registerDTO.ContractNumber,
                    PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(registerDTO.Password)),
                    PasswordSalt = hmac.Key
                };


                await _taccount.AddUser(user);

                var _user = _mapper.Map<TUserDto>(user);
                _user.Token = _tokenService.CreateToken(user);

             return Ok(_user);
        }
    


        [HttpPost]
        [Route("login")]
         public async Task<ActionResult> LoginUser(LoginDto loginDto )
        {
            
            if(!ModelState.IsValid){
                    return BadRequest("Enter wrong input Formate");
            }

            var user = await _taccount.GetByUsername(loginDto.UserName);
            if(user == null) return BadRequest ("Invalid username");


            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for(int i = 0; i < computedHash.Length; i++){
                if(computedHash[i] != user.PasswordHash[i]){
                        return BadRequest("Wrong Password");
                }
            }

            var _user = _mapper.Map<TUserDto>(user);
                _user.Token = _tokenService.CreateToken(user);

            return Ok(_user);
        }
    }
}