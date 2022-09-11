using api.Core.Entities.Consumer;
using api.Core.Interfaces.ConsumerDept;
using api.Core.Dtos;
using api.Core.Entities.TransportDept;
using api.Core.Interfaces.TransportDept;
using api.Database;
using AutoMapper;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
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
    }
}