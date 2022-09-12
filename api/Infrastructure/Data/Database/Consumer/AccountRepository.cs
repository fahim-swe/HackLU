using api.Core.Entities.Consumer;
using api.Core.Interfaces.ConsumerDept;
using api.Core.Dtos;
using api.Core.Entities.TransportDept;
using api.Core.Interfaces.TransportDept;
using api.Database;
using AutoMapper;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using api.Helper;

namespace api.Infrastructure.Data.Database
{
    public class AccountRepository : IAccountRepository
    {
        private readonly IMongoCollection<Student> _students;
        private readonly IMongoCollection<Teacher> _teachers;
        private readonly IMongoCollection<Staff> _staff;
        private readonly IMapper _mapper;
        public AccountRepository(IOptions<ApiDataBaseSetttings> userNameStoreDatabaseSettings, IMapper mapper)
        {

            _mapper = mapper;
            var mongoClient = new MongoClient(
                userNameStoreDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                userNameStoreDatabaseSettings.Value.DatabaseName);

           
              
            _students = mongoDatabase.GetCollection<Student>
            (
                userNameStoreDatabaseSettings.Value.Student
            );

            _teachers = mongoDatabase.GetCollection<Teacher>
            (
                userNameStoreDatabaseSettings.Value.Teacher
            );

            _staff = mongoDatabase.GetCollection<Staff>
            (
                userNameStoreDatabaseSettings.Value.Staff
            );

        }

        public async Task AddStaff(Staff staff)
        {
            await _staff.InsertOneAsync(staff);
        }

        public async Task AddStudent(Student student)
        {
            await _students.InsertOneAsync(student);
        }

        public async Task AddTeacher(Teacher teacher)
        {
            await _teachers.InsertOneAsync(teacher);
        }


        public async Task<bool> IsUserNameExits(string userName)
        {
            return await _students.Find(x => x.userName == userName).AnyAsync() || 
                await _teachers.Find(x => x.userName == userName).AnyAsync() || 
                await _staff.Find(x => x.userName == userName).AnyAsync();
        }


         public async Task<bool> CheckedPassword(string password)
         {
             return await _students.Find(x => x.password == password).AnyAsync() || 
                await _teachers.Find(x => x.password == password).AnyAsync() || 
                await _staff.Find(x => x.password == password).AnyAsync();
        }

        public async Task UpdateStudentProfile(StudentUpdateDto student)
        {
            var _data = await _students.Find( x => x.userName == student.userName).FirstOrDefaultAsync();
            _data.fullName = student.fullName;
            _data.batchNumber = student.batchNumber;
            _data.section = student.section;

            
            await _students.ReplaceOneAsync(x => x.userName == student.userName, _data);
        }
    }
}